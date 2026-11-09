"use client";

import * as styles from "./QuantityStepper.css.js";

/**
 * 수량 증가·감소 공통 컴포넌트
 *
 * value: 현재 수량
 * min: 최소 수량 (기본 1)
 * max: 최대 수량
 * onChange: 수량 변경 함수
 * disabled: 전체 비활성화 여부
 * label: 접근성 안내 문구
 *
 * 실제 수량 상태는 부모 컴포넌트에서 관리합니다.
 */
export default function QuantityStepper({
  value,
  min = 1,
  max = Infinity,
  onChange,
  disabled = false,
  label = "수량",
}) {
  const minNumber = Number(min);
  const maxNumber = Number(max);
  const valueNumber = Number(value);

  const minValue = Number.isFinite(minNumber)
    ? Math.max(0, Math.floor(minNumber))
    : 1;

  const maxValue = Number.isFinite(maxNumber)
    ? Math.max(0, Math.floor(maxNumber))
    : Infinity;

  // 최대 수량이 최소 수량보다 작으면 선택 불가
  const unavailable = maxValue < minValue;

  // 화면에 표시할 수량을 허용 범위로 제한
  const safeValue = unavailable
    ? 0
    : Math.min(
        maxValue,
        Math.max(
          minValue,
          Number.isFinite(valueNumber) ? Math.floor(valueNumber) : minValue,
        ),
      );

  const isDisabled = disabled || unavailable || typeof onChange !== "function";

  const canDecrease = !isDisabled && safeValue > minValue;
  const canIncrease = !isDisabled && safeValue < maxValue;

  const handleChange = (amount) => {
    if (isDisabled) return;

    const nextValue = Math.min(
      maxValue,
      Math.max(minValue, safeValue + amount),
    );

    if (nextValue !== safeValue) {
      onChange(nextValue);
    }
  };

  return (
    <div className={styles.root} role="group" aria-label={label}>
      <button
        type="button"
        className={styles.button}
        aria-label={`${label} 감소`}
        disabled={!canDecrease}
        onClick={() => handleChange(-1)}
      >
        −
      </button>

      <output className={styles.value} aria-live="polite" aria-atomic="true">
        {safeValue}
      </output>

      <button
        type="button"
        className={styles.button}
        aria-label={`${label} 증가`}
        disabled={!canIncrease}
        onClick={() => handleChange(1)}
      >
        +
      </button>
    </div>
  );
}
