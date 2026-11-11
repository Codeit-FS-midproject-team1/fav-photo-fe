"use client";

import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import * as styles from "./ExchangeOfferActionModal.css.js";

const ACTION_CONFIG = {
  cancel: {
    title: "교환 제안을 취소하시겠어요?",
    message: "취소한 교환 제안은 다시 복구할 수 없습니다.",
    confirmText: "제안 취소",
  },
  reject: {
    title: "교환 제안을 거절하시겠어요?",
    message: "거절한 교환 제안은 다시 승인할 수 없습니다.",
    confirmText: "제안 거절",
  },
  accept: {
    title: "교환 제안을 승인하시겠어요?",
    message: "승인하면 포토카드 소유권이 교환됩니다.",
    confirmText: "제안 승인",
  },
};

export default function ExchangeOfferActionModal({
  open,
  action = "cancel",
  onClose,
  onConfirm,
  submitting = false,
  error = "",
}) {
  const config = ACTION_CONFIG[action] ?? ACTION_CONFIG.cancel;

  const handleClose = () => {
    if (submitting) return;
    onClose?.();
  };

  const handleConfirm = () => {
    if (submitting) return;
    onConfirm?.();
  };

  return (
    <Modal open={open} onClose={handleClose} size="lg" mobileType="sheet">
      <div className={styles.content}>
        <h2 className={styles.title}>{config.title}</h2>

        <p className={styles.message}>{config.message}</p>

        {error && (
          <p className={styles.error} role="alert">
            {error}
          </p>
        )}

        <div className={styles.actions}>
          <Button
            type="button"
            variant="secondary"
            className={styles.button}
            onClick={handleClose}
            disabled={submitting}
          >
            아니요
          </Button>

          <Button
            type="button"
            variant="primary"
            className={styles.button}
            onClick={handleConfirm}
            disabled={submitting}
          >
            {submitting ? "처리 중..." : config.confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
}
