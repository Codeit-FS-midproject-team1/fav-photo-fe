"use client";

import { useEffect, useId, useRef, useState } from "react";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import styles from "./ListingFormModal.module.css.js";

const METHOD_OPTIONS = [
  { value: "PHOTO", label: "사진" },
  { value: "CRAFT", label: "수공예" },
  { value: "AI", label: "AI" },
  { value: "ETC", label: "기타" },
];

const GENRE_OPTIONS = [
  { value: "LANDSCAPE", label: "풍경" },
  { value: "PORTRAIT", label: "인물" },
  { value: "ANIMAL", label: "동물" },
  { value: "PLANT", label: "식물" },
  { value: "OBJECT", label: "사물" },
  { value: "ETC", label: "기타" },
];

/**
 * 판매 수량을 1장부터 최대 판매 가능 수량 사이로 보정합니다.
 * 판매 가능 수량이 없으면 0을 반환합니다.
 *
 * @param {number|string} value - 보정할 수량
 * @param {number} max - 최대 판매 가능 수량
 * @returns {number} 보정된 판매 수량
 */
function clampQuantity(value, max) {
  if (!Number.isInteger(max) || max < 1) {
    return 0;
  }

  const number = Number(value);

  const normalized = Number.isFinite(number) ? Math.floor(number) : 1;

  return Math.min(max, Math.max(1, normalized));
}

/**
 * 판매 등록 및 판매정보 수정을 위한 공통 모달입니다.
 *
 * 등록: maxQuantity = HELD 보유 수량
 * 수정: maxQuantity = 기존 남은 수량 + 추가 HELD 보유 수량
 *
 * 제출 quantity는 변경 후 남은 판매 수량입니다.
 * API 요청은 부모 컴포넌트의 onSubmit에서 처리합니다.
 *
 * card 또는 listing이 변경되면 부모에서 key를 변경하여
 * 새 모달로 마운트해야 입력 상태가 초기화됩니다.
 */
export default function ListingFormModal({
  card,
  listing = null,
  maxQuantity,
  onSubmit,
  onClose,
  isOpen = true,
  isSubmitting = false,
}) {
  const editMode = Boolean(listing);
  const titleId = useId();

  const modalRef = useRef(null);
  const closeRef = useRef(null);

  // 최대 판매 가능 수량
  const limit = Number(maxQuantity);

  const available = Number.isInteger(limit) && limit >= 1;

  const normalizedLimit = available ? limit : 0;

  // 수정 모드라면 기존 남은 수량을 사용
  const initialQuantity = editMode
    ? (listing?.remainingQuantity ?? listing?.remaining_quantity ?? 1)
    : 1;

  /**
   * 수정 1: 최초 수량부터 유효 범위로 보정
   *
   * 예: remainingQuantity=0, maxQuantity=10
   * 결과: 최초 수량 1장
   */
  const [quantity, setQuantity] = useState(() =>
    clampQuantity(initialQuantity, normalizedLimit),
  );

  const [previousLimit, setPreviousLimit] = useState(normalizedLimit);

  const [price, setPrice] = useState(
    String(listing?.price ?? card?.price ?? 1),
  );

  const [exchangeMethod, setExchangeMethod] = useState(
    listing?.exchangeMethod ?? listing?.exchange_method ?? "",
  );

  const [exchangeGenre, setExchangeGenre] = useState(
    listing?.exchangeGenre ?? listing?.exchange_genre ?? "",
  );

  const [exchangeDescription, setExchangeDescription] = useState(
    listing?.exchangeDescription ?? listing?.exchange_description ?? "",
  );

  const [error, setError] = useState("");
  const [localSubmitting, setLocalSubmitting] = useState(false);

  const busy = isSubmitting || localSubmitting;

  /**
   * 수정 2: 최대 수량 변경 시 내부 상태 동기화
   *
   * 이전 limit과 현재 limit이 달라졌을 때만
   * 수량을 보정합니다.
   */
  if (previousLimit !== normalizedLimit) {
    setPreviousLimit(normalizedLimit);

    setQuantity((current) => clampQuantity(current, normalizedLimit));
  }

  // 화면과 제출에 동일하게 사용할 수량
  const safeQuantity = clampQuantity(quantity, normalizedLimit);

  /**
   * 사용자가 수량 버튼을 누르면
   * 유효한 범위로 보정하여 상태를 변경합니다.
   *
   * @param {number} next - 변경할 수량
   */
  function handleQuantityChange(next) {
    setQuantity(clampQuantity(next, normalizedLimit));
  }

  /**
   * 수정 3: 모달 열기 및 닫기 포커스 처리
   *
   * 모달 열기: 닫기 버튼에 포커스 이동
   * 모달 닫기: 원래 포커스 위치로 복원
   * 외부 요소에 포커스가 이동하면 모달 안으로 복귀
   */
  useEffect(() => {
    if (!isOpen) return;

    const previousFocus = document.activeElement;

    closeRef.current?.focus();

    function handleFocusIn(event) {
      const modal = modalRef.current;

      if (modal && !modal.contains(event.target)) {
        if (!closeRef.current?.disabled) {
          closeRef.current?.focus();
        } else {
          modal.focus();
        }
      }
    }

    document.addEventListener("focusin", handleFocusIn);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);

      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen]);

  /**
   * 수정 4: 키보드 포커스 트랩
   *
   * ESC: 모달 닫기
   * Tab: 다음 포커스 요소
   * Shift+Tab: 이전 포커스 요소
   */
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        if (!busy) {
          event.preventDefault();
          event.stopPropagation();
          onClose?.();
        }
        return;
      }

      if (event.key !== "Tab") return;

      const modal = modalRef.current;
      if (!modal) return;

      const elements = Array.from(
        modal.querySelectorAll(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getClientRects().length > 0);

      event.preventDefault();

      if (elements.length === 0) {
        modal.focus();
        return;
      }

      const currentIndex = elements.indexOf(document.activeElement);

      const nextIndex = event.shiftKey
        ? currentIndex === -1
          ? elements.length - 1
          : (currentIndex - 1 + elements.length) % elements.length
        : (currentIndex + 1) % elements.length;

      elements[nextIndex].focus();
    }

    document.addEventListener("keydown", handleKeyDown, true);

    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, busy, onClose]);

  /**
   * 판매 등록 및 수정 요청을 처리합니다.
   *
   * 수량, 가격, 교환 설명을 검증한 후
   * 부모 컴포넌트의 onSubmit을 호출합니다.
   *
   * @param {React.FormEvent<HTMLFormElement>} event
   * @returns {Promise<void>}
   */
  async function handleSubmit(event) {
    event.preventDefault();

    if (busy) return;

    setError("");

    const priceNumber = Number(price);

    // 판매 가능 수량 검증
    if (!available) {
      setError("판매할 수 있는 카드가 없습니다. 보유 수량을 확인해 주세요.");
      return;
    }

    // 화면 표시 수량과 동일한 값 검증
    if (
      !Number.isInteger(safeQuantity) ||
      safeQuantity < 1 ||
      safeQuantity > normalizedLimit
    ) {
      setError(`수량을 1장부터 ${normalizedLimit}장 사이로 선택해 주세요.`);
      return;
    }

    // 판매 가격 검증
    if (
      !Number.isInteger(priceNumber) ||
      priceNumber < 1 ||
      priceNumber > 1000
    ) {
      setError("가격은 1P부터 1,000P까지 정수로 입력해 주세요.");
      return;
    }

    // 교환 설명 검증
    if (exchangeDescription.length > 200) {
      setError("교환 설명은 200자 이하여야 합니다.");
      return;
    }

    setLocalSubmitting(true);

    try {
      await onSubmit?.({
        // 화면에 표시된 수량과 제출 수량 통일
        quantity: safeQuantity,
        price: priceNumber,

        // 빈 문자열의 null 변환은 부모/API 계층에서 처리
        exchangeMethod,
        exchangeGenre,
        exchangeDescription: exchangeDescription.trim(),
      });
    } catch (submitError) {
      setError(
        submitError?.message || "저장에 실패했습니다. 다시 시도해 주세요.",
      );
    } finally {
      setLocalSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className={styles.backdrop}>
      <section
        ref={modalRef}
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
      >
        <header className={styles.header}>
          <div>
            <h2 id={titleId} className={styles.title}>
              {editMode ? "판매글 수정" : "포토카드 판매 등록"}
            </h2>

            <p className={styles.subtitle}>
              {card?.name ?? card?.photoCard?.name ?? "선택한 포토카드"}
            </p>
          </div>

          <button
            ref={closeRef}
            type="button"
            className={styles.close}
            aria-label="닫기"
            onClick={onClose}
            disabled={busy}
          >
            ×
          </button>
        </header>

        <form onSubmit={handleSubmit} className={styles.form}>
          {/* 판매 수량 */}
          <div className={styles.field}>
            <span className={styles.label}>판매 수량</span>

            <QuantityStepper
              value={safeQuantity}
              min={1}
              max={normalizedLimit}
              onChange={handleQuantityChange}
              disabled={busy}
              label="판매 수량"
            />

            <p className={styles.help}>
              {editMode ? "수정 후 남은 판매 수량" : "판매 등록 수량"}
              {" · 최대 "}
              {normalizedLimit}장
            </p>
          </div>

          {/* 판매 가격 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${titleId}-price`}>
              판매 가격 (P)
            </label>

            <input
              id={`${titleId}-price`}
              className={styles.input}
              type="number"
              inputMode="numeric"
              min="1"
              max="1000"
              step="1"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              disabled={busy}
              required
            />
          </div>

          {/* 교환 희망 제작 방식 및 장르 */}
          <div className={styles.columns}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${titleId}-method`}>
                희망 제작 방식
              </label>

              <select
                id={`${titleId}-method`}
                className={styles.input}
                value={exchangeMethod}
                onChange={(event) => setExchangeMethod(event.target.value)}
                disabled={busy}
              >
                <option value="">선택 안 함</option>

                {METHOD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${titleId}-genre`}>
                희망 장르
              </label>

              <select
                id={`${titleId}-genre`}
                className={styles.input}
                value={exchangeGenre}
                onChange={(event) => setExchangeGenre(event.target.value)}
                disabled={busy}
              >
                <option value="">선택 안 함</option>

                {GENRE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 교환 희망 설명 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${titleId}-description`}>
              교환 희망 내용
            </label>

            <textarea
              id={`${titleId}-description`}
              className={styles.textarea}
              rows={4}
              maxLength={200}
              placeholder="원하는 교환 조건을 입력해 주세요."
              value={exchangeDescription}
              onChange={(event) => setExchangeDescription(event.target.value)}
              disabled={busy}
            />

            <p className={styles.count}>{exchangeDescription.length}/200</p>
          </div>

          {/* 입력 및 서버 오류 */}
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {/* 하단 버튼 */}
          <div className={styles.footer}>
            <button
              type="button"
              className={styles.cancel}
              onClick={onClose}
              disabled={busy}
            >
              취소
            </button>

            <button
              type="submit"
              className={styles.submit}
              disabled={busy || !available}
            >
              {busy ? "저장 중…" : editMode ? "수정하기" : "판매 등록하기"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
