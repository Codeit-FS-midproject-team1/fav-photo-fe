"use client";

import { useEffect, useId, useRef, useState } from "react";
import QuantityStepper from "../QuantityStepper/QuantityStepper";
import styles from "./ListingFormModal.module.css";

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
 * 등록/수정 공통 UI. API 호출은 상위 컴포넌트의 onSubmit에서 처리합니다.
 * 등록: maxQuantity=HELD 보유 장수.
 * 수정: maxQuantity=기존 remainingQuantity + 추가 HELD 보유 장수.
 * onSubmit의 quantity는 반드시 '변경 후 남은 판매 수량'입니다.
 * 부모가 카드나 listing을 변경할 때는 key를 바꾸어 재마운트하세요.
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
  const closeRef = useRef(null);
  const initialQuantity = editMode
    ? (listing?.remainingQuantity ?? listing?.remaining_quantity ?? 1)
    : 1;
  const [quantity, setQuantity] = useState(Number(initialQuantity));
  const [price, setPrice] = useState(String(listing?.price ?? card?.price ?? 1));
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
  const limit = Number(maxQuantity);
  const available = Number.isInteger(limit) && limit >= 1;

  useEffect(() => {
    if (!isOpen) return;
    closeRef.current?.focus();
    function handleKeyDown(event) {
      if (event.key === "Escape" && !busy) onClose?.();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, busy, onClose]);

  if (!isOpen) return null;

  async function handleSubmit(event) {
    event.preventDefault();
    if (busy) return;
    setError("");

    const priceNumber = Number(price);
    if (!available) {
      setError("판매할 수 있는 카드가 없습니다. 보유 수량을 확인해 주세요.");
      return;
    }
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > limit) {
      setError(`수량을 1장부터 ${limit}장 사이로 선택해 주세요.`);
      return;
    }
    if (!Number.isInteger(priceNumber) || priceNumber < 1 || priceNumber > 1000) {
      setError("가격은 1P부터 1,000P까지 정수로 입력해 주세요.");
      return;
    }
    if (exchangeDescription.length > 200) {
      setError("교환 설명은 200자 이하여야 합니다.");
      return;
    }

    setLocalSubmitting(true);
    try {
      await onSubmit?.({
        quantity,
        price: priceNumber,
        exchangeMethod, // 빈 문자열을 null/생략할지는 API 명세에 따라 부모에서 변환
        exchangeGenre,
        exchangeDescription: exchangeDescription.trim(),
      });
    } catch (submitError) {
      setError(submitError?.message || "저장에 실패했습니다. 다시 시도해 주세요.");
    } finally {
      setLocalSubmitting(false);
    }
  }

  return (
    <div className={styles.backdrop}>
      <section className={styles.modal} role="dialog" aria-modal="true" aria-labelledby={titleId}>
        <header className={styles.header}>
          <div>
            <h2 id={titleId} className={styles.title}>
              {editMode ? "판매글 수정" : "포토카드 판매 등록"}
            </h2>
            <p className={styles.subtitle}>{card?.name ?? card?.photoCard?.name ?? "선택한 포토카드"}</p>
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
          <div className={styles.field}>
            <label className={styles.label}>판매 수량</label>
            <QuantityStepper
              value={quantity}
              min={1}
              max={available ? limit : 0}
              onChange={setQuantity}
              disabled={busy}
              label="판매 수량"
            />
            <p className={styles.help}>
              {editMode ? "수정 후 남은 판매 수량" : "판매 등록 수량"} · 최대 {available ? limit : 0}장
            </p>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${titleId}-price`}>판매 가격 (P)</label>
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

          <div className={styles.columns}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${titleId}-method`}>희망 제작 방식</label>
              <select
                id={`${titleId}-method`}
                className={styles.input}
                value={exchangeMethod}
                onChange={(event) => setExchangeMethod(event.target.value)}
                disabled={busy}
              >
                <option value="">선택 안 함</option>
                {METHOD_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${titleId}-genre`}>희망 장르</label>
              <select
                id={`${titleId}-genre`}
                className={styles.input}
                value={exchangeGenre}
                onChange={(event) => setExchangeGenre(event.target.value)}
                disabled={busy}
              >
                <option value="">선택 안 함</option>
                {GENRE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${titleId}-description`}>교환 희망 내용</label>
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

          {error && <p className={styles.error} role="alert">{error}</p>}
          <div className={styles.footer}>
            <button type="button" className={styles.cancel} onClick={onClose} disabled={busy}>취소</button>
            <button type="submit" className={styles.submit} disabled={busy || !available}>
              {busy ? "저장 중…" : editMode ? "수정하기" : "판매 등록하기"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
