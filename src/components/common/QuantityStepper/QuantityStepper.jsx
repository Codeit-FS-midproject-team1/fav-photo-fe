"use client";

import styles from "./QuantityStepper.module.css";

/**
 * 숫자만 관리하는 제어형 공통 컴포넌트.
 * max=0이면 품절 상태로 0을 보여주고 버튼을 비활성화합니다.
 */
export default function QuantityStepper({
  value,
  min = 1,
  max = Infinity,
  onChange,
  disabled = false,
  label = "수량",
}) {
  const minValue = Math.max(0, Math.floor(Number(min) || 0));
  const maxValue = Number.isFinite(Number(max))
    ? Math.max(0, Math.floor(Number(max)))
    : Infinity;
  const unavailable = maxValue < minValue;
  const valueNumber = Number(value);
  const safeValue = unavailable
    ? 0
    : Math.min(
        maxValue,
        Math.max(minValue, Number.isFinite(valueNumber) ? Math.floor(valueNumber) : minValue),
      );
  const isDisabled = disabled || unavailable;

  function changeBy(delta) {
    if (isDisabled || typeof onChange !== "function") return;
    const nextValue = Math.min(maxValue, Math.max(minValue, safeValue + delta));
    if (nextValue !== safeValue) onChange(nextValue);
  }

  return (
    <div className={styles.root} role="group" aria-label={label}>
      <button
        className={styles.button}
        type="button"
        aria-label={`${label} 감소`}
        disabled={isDisabled || safeValue <= minValue}
        onClick={() => changeBy(-1)}
      >
        −
      </button>
      <output className={styles.value} aria-live="polite" aria-atomic="true">
        {safeValue}
      </output>
      <button
        className={styles.button}
        type="button"
        aria-label={`${label} 증가`}
        disabled={isDisabled || safeValue >= maxValue}
        onClick={() => changeBy(1)}
      >
        +
      </button>
    </div>
  );
}
