"use client";

import { useId, useRef, useState } from "react";

import Button from "@/components/button/Button";
import Modal from "@/components/modal/Modal";
import QuantityStepper from "@/components/common/QuantityStepper/QuantityStepper.jsx";
import { purchaseSaleListing } from "@/lib/api/saleListings.js";
import {
  PRICE_MIN,
  PRICE_MAX,
  PURCHASE_QUANTITY_MIN,
} from "@/lib/constants.js";

import * as styles from "./PurchasePanel.css.js";

export default function PurchasePanel({
  listingId,
  price,
  remainingQuantity,
  accessToken,
  onPurchased,
  onRefreshListing,
}) {
  const titleId = useId();
  const [quantity, setQuantity] = useState(PURCHASE_QUANTITY_MIN);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [isResultUncertain, setIsResultUncertain] = useState(false);
  const [needsListingRefresh, setNeedsListingRefresh] = useState(false);
  const pendingRequestRef = useRef(null);
  const submittingRef = useRef(false);

  const stock = Number(remainingQuantity);
  const unitPrice = Number(price);
  const isValidStock =
    Number.isSafeInteger(stock) && stock >= PURCHASE_QUANTITY_MIN;
  const isValidPrice =
    Number.isSafeInteger(unitPrice) &&
    unitPrice >= PRICE_MIN &&
    unitPrice <= PRICE_MAX;
  const selectedQuantity = isValidStock
    ? Math.max(PURCHASE_QUANTITY_MIN, Math.min(quantity, stock))
    : PURCHASE_QUANTITY_MIN;
  const totalPrice = unitPrice * selectedQuantity;
  const canBuy =
    isValidStock && isValidPrice && Number.isSafeInteger(totalPrice);

  const handleQuantityChange = (nextQuantity) => {
    if (isSubmitting || isResultUncertain) return;
    setQuantity(nextQuantity);
    setError("");
    setIsResultUncertain(false);
    setNeedsListingRefresh(false);
    pendingRequestRef.current = null;
  };

  const handleOpenConfirm = () => {
    if (!canBuy) return;
    setError("");
    // 앞선 요청의 결과를 모르면 같은 식별자로 재시도한다는 사실을 안내합니다.
    setIsResultUncertain(Boolean(pendingRequestRef.current));
    setNeedsListingRefresh(false);
    setIsConfirmOpen(true);
  };

  const handleCloseConfirm = () => {
    if (isSubmitting) return;
    setIsConfirmOpen(false);
    setError("");
    setNeedsListingRefresh(false);
    // 결과가 불확실한 요청의 식별자는 유지해 중복 구매를 방지합니다.
  };

  const handleRefreshListing = () => {
    if (isSubmitting) return;
    setIsConfirmOpen(false);
    setNeedsListingRefresh(false);
    onRefreshListing?.();
  };

  const handlePurchase = async () => {
    if (!canBuy || isSubmitting || submittingRef.current) return;
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

    submittingRef.current = true;
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
      setIsResultUncertain(false);
      setNeedsListingRefresh(false);
      setIsConfirmOpen(false);
      onPurchased?.({ quantity: selectedQuantity });
    } catch (purchaseError) {
      const status = purchaseError?.status;
      const isUncertain =
        status === 0 || (typeof status === "number" && status >= 500);

      // 결과를 확신할 수 없는 경우만 동일한 요청 키를 재사용합니다.
      if (!isUncertain) pendingRequestRef.current = null;
      setIsResultUncertain(isUncertain);
      setNeedsListingRefresh(
        status === 400 || status === 404 || status === 409,
      );
      setError(purchaseError?.message || "구매에 실패했습니다.");
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  };

  if (!canBuy) {
    return (
      <p className={styles.message}>
        현재 구매 가능한 수량이나 가격을 확인할 수 없습니다.
      </p>
    );
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
          disabled={isSubmitting || isResultUncertain}
          label="구매 수량"
        />
      </div>

      <div className={styles.priceRow}>
        <span>총 구매 가격</span>
        <strong className={styles.total}>
          {totalPrice.toLocaleString("ko-KR")}P
        </strong>
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

      <Modal
        open={isConfirmOpen}
        onClose={handleCloseConfirm}
        size="md"
        labelledBy={titleId}
      >
        <div className={styles.confirmBody}>
          <h2 id={titleId} className={styles.confirmTitle}>
            포토카드를 구매하시겠습니까?
          </h2>
          <p className={styles.confirmText}>
            {selectedQuantity}장 · {totalPrice.toLocaleString("ko-KR")}P
          </p>
          <p className={styles.help}>
            구매를 확정하면 서버에서 포인트 잔액과 남은 수량을 다시 확인합니다.
          </p>
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}
          {isResultUncertain && (
            <p className={styles.help} role="status">
              구매 결과를 확인하지 못했습니다. 다시 구매를 누르면 동일한 요청
              식별자로 재시도합니다. 먼저 구매 내역을 확인하는 것도 좋습니다.
            </p>
          )}
          <div className={styles.confirmActions}>
            {needsListingRefresh && (
              <Button
                type="button"
                variant="secondary"
                size="responsive"
                thickness="thin"
                onClick={handleRefreshListing}
                disabled={isSubmitting}
              >
                판매글 다시 조회
              </Button>
            )}
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
