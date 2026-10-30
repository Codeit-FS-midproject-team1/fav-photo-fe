"use client";

import { useState } from "react";
import * as styles from "./TextArea.css.js";
import Field from "@/components/field/Field";

export default function TextArea({
  label,
  error,
  id,
  maxLength = 200,
  placeholder,
  ...textAreaProps
}) {
  const [currentValue, setCurrentValue] = useState("");
  const isAtLimit = currentValue.length >= maxLength;
  const displayError =
    error ||
    (isAtLimit ? `최대 ${maxLength}자까지 입력할 수 있습니다.` : undefined);

  return (
    <Field label={label} htmlFor={id}>
      <textarea
        {...textAreaProps}
        id={id}
        maxLength={maxLength}
        value={currentValue}
        onChange={(event) => setCurrentValue(event.target.value)}
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
