"use client";

import { useState } from 'react';
import ListingDetailLayout from '../common/ListingDetailLayout/ListingDetailLayout';
import ListingFormModal from '../common/ListingFormModal/ListingFormModal';
import QuantityStepper from '../common/QuantityStepper/QuantityStepper';
import { cancelSaleListing, purchaseSaleListing, updateSaleListing } from '../../lib/api/saleListings';
import styles from './SaleDetailPanel.module.css';

/**
 * 판매 상세 조회 결과를 화면에 연결하는 공통 패널.
 * 실제 사용자 ID/보유카드 수/잔액과 API 조회 결과는 부모가 전달합니다.
 * - 판매자: 수정/판매 취소
 * - 구매자: 수량 선택/포인트 부족 안내/구매
 * - 교환 UI: exchangeContent slot으로 팀원 기능 전달
 * - 수정/취소/구매 후 부모 onRefresh()에서 GET 상세 재조회
 */
export default function SaleDetailPanel({
  listing,
  currentUserId = null,
  points = null,
  extraHeldQuantity = 0,
  exchangeContent = null,
  onRefresh,
  onCanceled,
  onPurchased,
}) {
  const [editing, setEditing] = useState(false);
  const [buyQuantity, setBuyQuantity] = useState(1);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  if (!listing) return null;

  const sellerId = listing.seller?.id ?? listing.sellerId;
  const isOwner = currentUserId != null && Number(currentUserId) === Number(sellerId);
  const onSale = listing.status === 'ON_SALE';
  const remaining = Number(listing.remainingQuantity ?? 0);
  const maxQuantity = Math.max(0, remaining);
  const safeBuyQuantity = maxQuantity > 0
    ? Math.max(1, Math.min(maxQuantity, buyQuantity))
    : 0;
  const cost = Number(listing.price) * safeBuyQuantity;
  const insufficientPoints = points != null && Number(points) < cost;

  /** 본인의 판매글을 수정합니다. */
  async function saveEdit(data) {
    setError('');
    const changed = await updateSaleListing(listing.id, data);
    setEditing(false);
    setNotice('판매 정보가 수정되었습니다.');
    await onRefresh?.(changed);
  }

  /** 남은 카드 및 교환 제안 복구는 백엔드 트랜잭션에서 처리합니다. */
  async function cancelSale() {
    if (!window.confirm('판매를 취소하고 남은 카드를 보유 상태로 돌릴까요?')) return;
    setBusy(true);
    setError('');
    try {
      const changed = await cancelSaleListing(listing.id);
      setNotice('판매가 취소되었습니다.');
      await onCanceled?.(changed);
      await onRefresh?.(changed);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  /** 구매 포인트/소유권/판매 수량 처리는 서버에서 확인합니다. */
  async function buy() {
    if (!currentUserId) {
      setError('로그인이 필요합니다.');
      return;
    }
    if (safeBuyQuantity < 1 || insufficientPoints) return;
    setBusy(true);
    setError('');
    try {
      const trade = await purchaseSaleListing(listing.id, safeBuyQuantity);
      setNotice(`${trade.quantity}장 구매가 완료되었습니다.`);
      await onPurchased?.(trade);
      await onRefresh?.(trade);
    } catch (e) {
      setError(e.message);
    } finally {
      setBusy(false);
    }
  }

  const actions = isOwner ? (
    <div className={styles.actions}>
      <button type="button" className={styles.primary} disabled={!onSale || busy} onClick={() => setEditing(true)}>
        판매정보 수정
      </button>
      <button type="button" className={styles.secondary} disabled={!onSale || busy} onClick={cancelSale}>
        판매 취소 (내리기)
      </button>
    </div>
  ) : (
    <div className={styles.purchase}>
      <p>구매 수량</p>
      <QuantityStepper value={safeBuyQuantity} min={1} max={maxQuantity} onChange={setBuyQuantity} disabled={busy || !onSale} label="구매 수량" />
      <p>총 구매 포인트: {cost.toLocaleString('ko-KR')}P</p>
      {insufficientPoints && <p className={styles.error}>포인트가 부족합니다.</p>}
      <button type="button" className={styles.primary} disabled={busy || !onSale || !safeBuyQuantity || insufficientPoints} onClick={buy}>
        {busy ? '처리 중…' : '구매하기'}
      </button>
    </div>
  );

  return (
    <>
      <ListingDetailLayout listing={listing} actions={actions} exchangeContent={exchangeContent} />
      {(error || notice) && (
        <p className={error ? styles.error : styles.notice} role={error ? 'alert' : 'status'}>
          {error || notice}
        </p>
      )}
      {editing && (
        <ListingFormModal
          key={`edit-${listing.id}`}
          listing={listing}
          card={listing.photoCard}
          maxQuantity={Math.max(0, remaining + Number(extraHeldQuantity || 0))}
          isSubmitting={busy}
          onClose={() => setEditing(false)}
          onSubmit={saveEdit}
        />
      )}
    </>
  );
}
