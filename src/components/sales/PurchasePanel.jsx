"use client";

import { useId, useRef, useState } from "react";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import QuantityStepper from "@/components/common/QuantityStepper/QuantityStepper.jsx";
import { purchaseSaleListing } from "@/lib/api/saleListings.js";
import { PRICE_MIN, PRICE_MAX, PURCHASE_QUANTITY_MIN } from "@/lib/constants.js";

import * as styles from "./PurchasePanel.css.js";

export default function PurchasePanel({
  listingId,
  price,
  remainingQuantity,
  accessToken,
  onPurchased,
}) {
  const titleId = useId();
  const [quantity, setQuantity] = useState(PURCHASE_QUANTITY_MIN);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const pendingRequestRef = useRef(null);

  const stock = Number(remainingQuantity);
  const unitPrice = Number(price);
  const isValidStock = Number.isSafeInteger(stock) && stock >= PURCHASE_QUANTITY_MIN;
  const isValidPrice =
    Number.isSafeInteger(unitPrice) && unitPrice >= PRICE_MIN && unitPrice <= PRICE_MAX;
  const selectedQuantity = isValidStock
    ? Math.max(PURCHASE_QUANTITY_MIN, Math.min(quantity, stock))
    : PURCHASE_QUANTITY_MIN;
  const totalPrice = unitPrice * selectedQuantity;
  const canBuy = isValidStock && isValidPrice && Number.isSafeInteger(totalPrice);

  const handleQuantityChange = (nextQuantity) => {
    if (isSubmitting) return;
    setQuantity(nextQuantity);
    setError("");
    pendingRequestRef.current = null;
  };

  const handleOpenConfirm = () => {
    if (!canBuy) return;
    setError("");
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    if (isSubmitting) return;
    setIsConfirmOpen(false);
    setError("");
    // 네트워크 오류 뒤 다시 여는 경우 동일한 구매 키로 재시도하도록 키는 유지합니다.
  };

  const handlePurchase = async () => {
    if (!canBuy || isSubmitting) return;
    if (!accessToken) {
      setError("로그인이 필요합니다.");
      return;
    }

    if (!globalThis.crypto?.randomUUID) {
      setError("구매 요청 식별자를 생성할 수 없습니다.");
      return;
    }

    if (!pendingRequestRef.current) {
      pendingRequestRef.current = globalThis.crypto.randomUUID();
    }

    setIsSubmitting(true);
    setError("");

    try {
      await purchaseSaleListing(
        listingId,
        selectedQuantity,
        accessToken,
        pendingRequestRef.current,
      );
      pendingRequestRef.current = null;
      setIsConfirmOpen(false);
      onPurchased?.();
    } catch (purchaseError) {
      setError(
        purchaseError?.status === 0
          ? "네트워크 오류로 구매 결과를 확인하지 못했습니다. 같은 수량으로 다시 시도하면 동일한 요청 식별자를 사용합니다."
          : purchaseError?.message || "구매에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!canBuy) {
    return <p className={styles.message}>현재 구매 가능한 수량이나 가격을 확인할 수 없습니다.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.quantityRow}>
        <span className={styles.label}>구매 수량</span>
        <QuantityStepper
          value={selectedQuantity}
          min={PURCHASE_QUANTITY_MIN}
          max={stock}
          onChange={handleQuantityChange}
          disabled={isSubmitting}
          label="구매 수량"
        />
      </div>

      <div className={styles.priceRow}>
        <span>총 구매 가격</span>
        <strong className={styles.total}>{totalPrice.toLocaleString("ko-KR")}P</strong>
      </div>

      <Button
        type="button"
        variant="primary"
        size="responsive"
        thickness="thin"
        onClick={handleOpenConfirm}
        disabled={isSubmitting}
      >
        구매하기
      </Button>

      <Modal open={isConfirmOpen} onClose={handleCloseConfirm} size="md" labelledBy={titleId}>
        <div className={styles.confirmBody}>
          <h2 id={titleId} className={styles.confirmTitle}>포토카드를 구매하시겠습니까?</h2>
          <p className={styles.confirmText}>
            {selectedQuantity}장 · {totalPrice.toLocaleString("ko-KR")}P
          </p>
          <p className={styles.help}>
            구매를 확정하면 서버에서 포인트 잔액과 남은 수량을 다시 확인합니다.
          </p>
          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.confirmActions}>
            <Button
              type="button"
              variant="secondary"
              size="responsive"
              thickness="thin"
              onClick={handleCloseConfirm}
              disabled={isSubmitting}
            >
              돌아가기
            </Button>
            <Button
              type="button"
              variant="primary"
              size="responsive"
              thickness="thin"
              onClick={handlePurchase}
              disabled={isSubmitting}
            >
              {isSubmitting ? "구매 처리 중..." : "구매 확정"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
