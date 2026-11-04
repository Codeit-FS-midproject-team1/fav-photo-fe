'use client';

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import * as styles from './Modal.css';

/**
 * @param {boolean} open - 열림 여부
 * @param {() => void} onClose - 닫기 핸들러 (X, Esc, 바깥 클릭)
 * @param {'sm'|'md'|'lg'} size - PC 가로 크기 (기본 md)
 * @param {'sheet'|'full'} mobileType - 모바일 형태: 바텀시트 | 전체 화면 (기본 sheet)
 */

export default function Modal({
  open,
  onClose,
  size = 'md',
  mobileType = 'sheet',
  children,
}) {
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={panelRef}
        tabIndex={-1}
        className={`${styles.panel} ${styles.size[size]} ${styles.mobileType[mobileType]}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
        >
          × 
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}