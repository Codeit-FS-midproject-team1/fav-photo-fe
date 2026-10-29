"use client";
import { useState } from "react";
import * as styles from "./PasswordField.css.js";
import Field from "@/components/field/Field";
import Icon from "@/components/icon/Icon";

export default function PasswordField({
  label,
  error,
  id,
  placeholder = "비밀번호를 입력해 주세요",
  ...inputProps
}) {
  const [visible, setVisible] = useState(false);
  const displayError =
    error === true ? "비밀번호가 일치하지 않습니다." : error || undefined;

  return (
    <Field label={label} error={displayError} htmlFor={id}>
      <div className={styles.inputWrapper}>
        <input
          {...inputProps}
          id={id}
          type={visible ? "text" : "password"}
          placeholder={placeholder}
          className={displayError ? styles.inputError : styles.input}
        />

        <button
          type="button"
          className={styles.toggleButton}
          onClick={() => setVisible((current) => !current)}
        >
          <Icon name={visible ? "visible" : "invisible"} />
        </button>
      </div>
    </Field>
  );
}
