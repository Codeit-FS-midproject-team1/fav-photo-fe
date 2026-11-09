"use client";

import { useEffect, useId, useRef, useState } from "react";
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
  const initialValue = defaultValue ?? "";
  const [internalLength, setInternalLength] = useState(initialValue.length);
  const controlled = value !== undefined;
  const textareaRef = useRef(null);
  const displayError = error;

  useEffect(() => {
    if (controlled || !textareaRef.current) return;

    setInternalLength(textareaRef.current.value.length);
  }, [controlled, initialValue]);

  useEffect(() => {
    const form = textareaRef.current?.form;
    if (!form || controlled) return;

    const handleReset = (event) => {
      window.requestAnimationFrame(() => {
        if (event.defaultPrevented || !textareaRef.current) return;
        textareaRef.current.value = initialValue;
        setInternalLength(initialValue.length);
      });
    };

    form.addEventListener("reset", handleReset);
    return () => form.removeEventListener("reset", handleReset);
  }, [controlled, initialValue]);

  return (
    <Field label={label} htmlFor={inputId}>
      <textarea
        {...textAreaProps}
        ref={textareaRef}
        id={inputId}
        maxLength={maxLength}
        value={controlled ? (value ?? "") : undefined}
        defaultValue={controlled ? undefined : initialValue}
        onChange={(event) => {
          if (!controlled) setInternalLength(event.target.value.length);
          onChange?.(event);
        }}
        placeholder={placeholder}
        className={displayError ? styles.textareaError : styles.textarea}
      />

      <div className={styles.metaRow}>
        {displayError && <p className={styles.errorMessage}>{displayError}</p>}
        <p className={styles.counter}>
          {controlled ? (value ?? "").length : internalLength}/{maxLength}
        </p>
      </div>
    </Field>
  );
}
