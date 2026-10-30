import * as styles from "./TextField.css.js";
import Field from "@/components/field/Field";
import { useId } from "react";

const placeholders = {
  email: "이메일을 입력해 주세요",
  text: "포토카드 이름을 입력해 주세요",
};

const errorMessages = {
  email: "이메일 형식이 아닙니다.",
  text: "포토카드 이름은 최대 15자까지 입력 가능합니다.",
};

const defaultErrorMessage = "입력값을 확인해 주세요.";

export default function TextField({
  label,
  error,
  suffix,
  id,
  type = "text",
  placeholder,
  ...inputProps
}) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const displayError =
    error === true
      ? (errorMessages[type] ?? defaultErrorMessage)
      : error || undefined;

  return (
    <Field label={label} error={displayError} htmlFor={inputId}>
      <div className={styles.inputWrapper}>
        <input
          {...inputProps}
          id={inputId}
          type={type}
          placeholder={placeholder ?? placeholders[type]}
          className={displayError ? styles.inputError : styles.input}
        />
        {suffix && <span className={styles.suffix}>{suffix}</span>}
      </div>
    </Field>
  );
}
