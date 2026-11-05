"use client";

import { useId, useState } from "react";
import * as styles from "./TextArea.css.js";
import Field from "@/components/field/Field";

export default function TextArea({
  label,
  error,
  id,
  maxLength = 200,
  placeholder,
  value,
  defaultValue = "",
  onChange,
  ...textAreaProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [internalValue, setInternalValue] = useState(defaultValue ?? "");
  const currentValue = value !== undefined ? (value ?? "") : internalValue;
  const displayError = error;

  return (
    <Field label={label} htmlFor={inputId}>
      <textarea
        {...textAreaProps}
        id={inputId}
        maxLength={maxLength}
        value={currentValue}
        onChange={(event) => {
          if (value === undefined) setInternalValue(event.target.value);
          onChange?.(event);
        }}
        placeholder={placeholder}
        className={displayError ? styles.textareaError : styles.textarea}
      />

      <div className={styles.metaRow}>
        {displayError && <p className={styles.errorMessage}>{displayError}</p>}
        <p className={styles.counter}>
          {currentValue.length}/{maxLength}
        </p>
      </div>
    </Field>
  );
}
