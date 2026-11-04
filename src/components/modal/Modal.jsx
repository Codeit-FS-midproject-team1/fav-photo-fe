"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import * as styles from "./Modal.css";

export default function Modal({
  open,
  onClose,
  size = "md",
  mobileType = "sheet",
  children,
}) {
  const panelRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !open) return;

    const previousFocus = document.activeElement;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";
    panel?.focus();

    const getFocusable = () =>
      panel?.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ) ?? [];

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose?.();
        return;
      }

      if (e.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) {
        e.preventDefault();
        panel?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (
        e.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus?.();
    };
  }, [mounted, open, onClose]);

  if (!mounted || !open) return null;

  const handleOverlayMouseDown = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        tabIndex={-1}
        className={`${styles.panel} ${styles.size[size]} ${styles.mobileType[mobileType]}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="모달 닫기"
        >
          ×
        </button>
        {children}
      </div>
    </div>,
    document.body,
  );
}
