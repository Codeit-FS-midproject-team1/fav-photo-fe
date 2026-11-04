"use client";

import Modal from "@/components/modal/Modal";
import * as styles from "./ConfirmModal.css";

/**
 * @param {boolean} open
 * @param {string} title
 * @param {string} message
 * @param {string} confirmText - 기본 "확인"
 * @param {() => void} onConfirm
 * @param {() => void} onClose
 */

export default function ConfirmModal({
  open,
  title,
  message,
  confirmText = "확인",
  onConfirm,
  onClose,
}) {
  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className={styles.content}>
        <h2 className={styles.title}>{title}</h2>
        {message && <p className={styles.message}>{message}</p>}
        <button type="button" className={styles.confirmButton} onClick={onConfirm}>
          {confirmText}
        </button>
      </div>
    </Modal>
  );
}
