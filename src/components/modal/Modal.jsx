"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

import * as styles from "./Modal.css.js";

// 서버와 클라이언트의 렌더링 차이를 안전하게 처리합니다.
const subscribeNoop = () => () => {};
const getClientSnapshot = () => true;
const getServerSnapshot = () => false;

export default function Modal({
  open,
  onClose,
  size = "md",
  mobileType = "sheet",
  labelledBy,
  label,
  children,
}) {
  const panelRef = useRef(null);

  const mounted = useSyncExternalStore(
    subscribeNoop,
    getClientSnapshot,
    getServerSnapshot,
  );

  useEffect(() => {
    if (!mounted || !open) return;

    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    const panel = panelRef.current;

    // 모달이 열려 있는 동안 배경 스크롤을 방지합니다.
    document.body.style.overflow = "hidden";

    // 다이얼로그 역할이 지정된 패널에 포커스를 이동합니다.
    panel?.focus();

    const getFocusable = () =>
      Array.from(
        panel?.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    const handleKeyDown = (event) => {
      // ESC로 모달을 닫습니다.
      if (event.key === "Escape") {
        onClose?.();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();

      // 포커스 가능한 요소가 없다면 패널에 포커스를 유지합니다.
      if (focusable.length === 0) {
        event.preventDefault();
        panel?.focus();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // Shift + Tab: 처음에서 마지막 요소로 이동
      if (
        event.shiftKey &&
        (document.activeElement === first || document.activeElement === panel)
      ) {
        event.preventDefault();
        last.focus();
      }

      // Tab: 마지막에서 처음 요소로 이동
      else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.body.style.overflow = previousOverflow;

      // 모달이 닫히면 이전에 포커스된 요소로 돌아갑니다.
      if (previousFocus?.isConnected) {
        previousFocus.focus?.();
      }
    };
  }, [mounted, open, onClose]);

  if (!mounted || !open) return null;

  const handleOverlayMouseDown = (event) => {
    if (event.target === event.currentTarget) {
      onClose?.();
    }
  };

  return createPortal(
    <div className={styles.overlay} onMouseDown={handleOverlayMouseDown}>
      <div
        ref={panelRef}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        aria-label={labelledBy ? undefined : label || "대화상자"}
        className={`${styles.panel} ${styles.size[size]} ${styles.mobileType[mobileType]}`}
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="닫기"
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
