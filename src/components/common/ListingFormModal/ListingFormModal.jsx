"use client";

import { useId, useState } from "react";

import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import QuantityStepper from "../QuantityStepper/QuantityStepper";

import * as styles from "./ListingFormModal.css.js";

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

function clampQuantity(value, max) {
  if (max < 1) return 0;

  const number = Number(value);
  const normalized = Number.isFinite(number) ? Math.floor(number) : 1;

  return Math.min(max, Math.max(1, normalized));
}

/**
 * 판매 등록 및 판매글 수정 공통 모달
 *
 * 등록: maxQuantity = 보유 중인 판매 가능 수량
 * 수정: maxQuantity = 기존 남은 수량 + 추가 보유 수량
 *
 * quantity는 변경 후 남은 판매 수량을 의미합니다.
 * API 호출은 부모의 onSubmit에서 처리합니다.
 *
 * card/listing이 바뀌면 부모에서 key를 변경해
 * 입력 상태를 초기화해야 합니다.
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
  const titleId = useId();
  const editMode = Boolean(listing);

  const maxNumber = Number(maxQuantity);
  const limit = Number.isInteger(maxNumber) && maxNumber > 0 ? maxNumber : 0;

  const initialQuantity = editMode
    ? (listing.remainingQuantity ?? listing.remaining_quantity ?? 1)
    : 1;

  const [quantity, setQuantity] = useState(() =>
    clampQuantity(initialQuantity, limit),
  );

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
  const safeQuantity = clampQuantity(quantity, limit);
  const available = limit > 0;

  const handleClose = () => {
    if (!busy) {
      onClose?.();
    }
  };

  async function handleSubmit(event) {
    event.preventDefault();

    if (busy) return;

    setError("");

    // 1. 판매 가능 수량 확인
    if (!available) {
      setError("판매할 수 있는 카드가 없습니다.");
      return;
    }

    // 2. 판매 수량 검증
    if (
      !Number.isInteger(safeQuantity) ||
      safeQuantity < 1 ||
      safeQuantity > limit
    ) {
      setError(`수량을 1~${limit}장 사이로 선택해 주세요.`);
      return;
    }

    // 3. 판매 가격 검증
    const priceNumber = Number(price);

    if (
      !Number.isInteger(priceNumber) ||
      priceNumber < 1 ||
      priceNumber > 1000
    ) {
      setError("가격은 1~1,000P 사이의 정수여야 합니다.");
      return;
    }

    // 4. 교환 희망 제작 방식과 장르 검증
    const validMethod = METHOD_OPTIONS.some(
      (option) => option.value === exchangeMethod,
    );

    const validGenre = GENRE_OPTIONS.some(
      (option) => option.value === exchangeGenre,
    );

    if (!validMethod || !validGenre) {
      setError("교환 희망 제작 방식과 장르를 선택해 주세요.");
      return;
    }

    // 5. 교환 설명 길이 검증
    if (exchangeDescription.length > 200) {
      setError("교환 설명은 200자 이하여야 합니다.");
      return;
    }

    // 6. 저장 함수 확인
    if (typeof onSubmit !== "function") {
      setError("저장 기능이 연결되지 않았습니다.");
      return;
    }

    setLocalSubmitting(true);

    try {
      await onSubmit({
        quantity: safeQuantity,
        price: priceNumber,
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

  return (
    <Modal open={isOpen} onClose={handleClose} size="xl" mobileType="sheet">
      <section
        className={styles.content}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {editMode ? "판매글 수정" : "포토카드 판매 등록"}
          </h2>

          <p className={styles.subtitle}>
            {card?.name ?? card?.photoCard?.name ?? "선택한 포토카드"}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* 판매 수량과 판매 가격을 가로 배치 */}
          <div className={styles.topFields}>
            {/* 판매 수량 */}
            <fieldset className={styles.fieldset} disabled={busy}>
              <legend className={styles.label}>판매 수량</legend>

              <QuantityStepper
                value={safeQuantity}
                min={1}
                max={limit}
                onChange={setQuantity}
                disabled={busy}
                label="판매 수량"
              />

              <p className={styles.help}>
                {editMode ? "수정 후 남은 판매 수량" : "판매 등록 수량"}
                {" · 최대 "}
                {limit}장
              </p>
            </fieldset>

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
          </div>

          {/* 교환 희망 제작 방식과 장르 */}
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
                required
              >
                <option value="">선택해 주세요</option>

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
                required
              >
                <option value="">선택해 주세요</option>

                {GENRE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 교환 희망 내용 */}
          <div className={styles.field}>
            <label className={styles.label} htmlFor={`${titleId}-description`}>
              교환 희망 내용
            </label>

            <textarea
              id={`${titleId}-description`}
              className={styles.textarea}
              rows={3}
              maxLength={200}
              placeholder="원하는 교환 조건을 입력해 주세요."
              value={exchangeDescription}
              onChange={(event) => setExchangeDescription(event.target.value)}
              disabled={busy}
            />

            <p className={styles.count}>{exchangeDescription.length}/200</p>
          </div>

          {/* 오류 메시지 */}
          {error && (
            <p className={styles.error} role="alert">
              {error}
            </p>
          )}

          {/* 하단 버튼 */}
          <div className={styles.footer}>
            <Button
              type="button"
              variant="secondary"
              size="responsive"
              thickness="thin"
              className={styles.actionButton}
              onClick={handleClose}
              disabled={busy}
            >
              취소
            </Button>

            <Button
              type="submit"
              variant="primary"
              size="responsive"
              thickness="thin"
              className={styles.actionButton}
              disabled={busy || !available}
            >
              {busy ? "저장 중…" : editMode ? "수정하기" : "판매 등록하기"}
            </Button>
          </div>
        </form>
      </section>
    </Modal>
  );
}
