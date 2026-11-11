"use client";

import { useId, useRef, useState } from "react";

import Modal from "@/components/modal/Modal";
import Button from "@/components/button/Button";
import QuantityStepper from "@/components/common/QuantityStepper/QuantityStepper";

import {
  PRICE_MIN,
  PRICE_MAX,
  EXCHANGE_DESCRIPTION_MAX,
} from "@/lib/constants.js";

import * as styles from "./ListingFormModal.css.js";

const METHOD_OPTIONS = [
  { value: "PHOTO", label: "촬영" },
  { value: "CRAFT", label: "제작" },
  { value: "AI", label: "AI생성" },
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
 * quantity는 변경 후 남은 판매 수량입니다.
 * 실제 API 호출은 부모의 onSubmit에서 처리합니다.
 *
 * card/listing이 변경되면 부모에서 key를 변경해
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
    String(listing?.price ?? card?.price ?? PRICE_MIN),
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
  const submitLockRef = useRef(false);

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

    if (busy || submitLockRef.current) return;

    setError("");

    // 판매할 카드가 없으면 등록할 수 없습니다.
    if (!available) {
      setError("판매할 수 있는 카드가 없습니다.");
      return;
    }

    // 수량은 판매 가능한 범위 내에서만 선택합니다.
    if (
      !Number.isInteger(safeQuantity) ||
      safeQuantity < 1 ||
      safeQuantity > limit
    ) {
      setError(`수량을 1~${limit}장 사이로 선택해 주세요.`);
      return;
    }

    const priceNumber = Number(price);

    // 가격 정책은 공통 상수를 사용합니다.
    if (
      !Number.isInteger(priceNumber) ||
      priceNumber < PRICE_MIN ||
      priceNumber > PRICE_MAX
    ) {
      setError(
        `가격은 ${PRICE_MIN}~${PRICE_MAX.toLocaleString("ko-KR")}P 사이의 정수여야 합니다.`,
      );
      return;
    }

    const validMethod = METHOD_OPTIONS.some(
      (option) => option.value === exchangeMethod,
    );

    const validGenre = GENRE_OPTIONS.some(
      (option) => option.value === exchangeGenre,
    );

    // 현재 폼은 교환 희망 방식과 장르를 필수로 처리합니다.
    if (!validMethod || !validGenre) {
      setError("교환 희망 제작 방식과 장르를 선택해 주세요.");
      return;
    }

    if (exchangeDescription.length > EXCHANGE_DESCRIPTION_MAX) {
      setError(`교환 설명은 ${EXCHANGE_DESCRIPTION_MAX}자 이하여야 합니다.`);
      return;
    }

    if (typeof onSubmit !== "function") {
      setError("저장 기능이 연결되지 않았습니다.");
      return;
    }

    submitLockRef.current = true;
    setLocalSubmitting(true);

    try {
      // 데이터 저장 및 API 요청은 부모가 담당합니다.
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
      submitLockRef.current = false;
      setLocalSubmitting(false);
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      size="xl"
      mobileType="sheet"
      labelledBy={titleId}
    >
      <section className={styles.content}>
        <header className={styles.header}>
          <h2 id={titleId} className={styles.title}>
            {editMode ? "판매글 수정" : "포토카드 판매 등록"}
          </h2>

          <p className={styles.subtitle}>
            {card?.name ?? card?.photoCard?.name ?? "선택한 포토카드"}
          </p>
        </header>

        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          {/* 판매 수량과 가격 */}
          <div className={styles.topFields}>
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

            <div className={styles.field}>
              <label className={styles.label} htmlFor={`${titleId}-price`}>
                판매 가격 (P)
              </label>

              <input
                id={`${titleId}-price`}
                className={styles.input}
                type="number"
                inputMode="numeric"
                min={PRICE_MIN}
                max={PRICE_MAX}
                step="1"
                value={price}
                onChange={(event) => setPrice(event.target.value)}
                disabled={busy}
                required
              />
            </div>
          </div>

          {/* 교환 희망 조건 */}
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
              maxLength={EXCHANGE_DESCRIPTION_MAX}
              placeholder="원하는 교환 조건을 입력해 주세요."
              value={exchangeDescription}
              onChange={(event) => setExchangeDescription(event.target.value)}
              disabled={busy}
            />

            <p className={styles.count}>
              {exchangeDescription.length}/{EXCHANGE_DESCRIPTION_MAX}
            </p>
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
