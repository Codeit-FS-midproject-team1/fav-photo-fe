"use client";

import { useState } from "react";
import * as styles from "./TextArea.css.js";
import Field from "@/components/field/Field";

export default function TextArea({
  label,
  error,
  id,
  maxLength = 200,
  ...textAreaProps
}) {
  const displayError =
    error === true
      ? `최대 ${maxLength}자까지 입력할 수 있습니다.`
      : error || undefined;

  return (
    <Field label={label} error={displayError} htmlFor={id}>
      <textarea
        {...textAreaProps}
        id={id}
        maxLength={maxLength}
        className={displayError ? styles.textareaError : styles.textarea}
        aria-invalid={Boolean(displayError)}
      />
      <p className={styles.counter}>
        {currentValue.length}/{maxLength}
      </p>
    </Field>
  );
}
