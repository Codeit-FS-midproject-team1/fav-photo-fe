"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import logoImage from "@/assets/images/logo.svg";
import Button from "@/components/button/Button.jsx";
import PasswordField from "@/components/passwordField/PasswordField.jsx";
import TextField from "@/components/textField/TextField.jsx";
import * as styles from "./AuthForm.css.js";
import {
  validateLogin,
  validateNickname,
  validateSignup,
} from "./validation.js";
import Icon from "@/components/icon/Icon.jsx";

const formCopy = {
  login: {
    footer: "최애의 포토가 처음이신가요?",
    title: "로그인",
    linkText: "회원가입하기",
    href: "/signup",
  },
  signup: {
    footer: "이미 최애의포토 회원이신가요?",
    title: "가입하기",
    linkText: "로그인하기",
    href: "/login",
  },
};
const loginFields = ["email", "password"];
const signupFields = ["nickname", "email", "password", "passwordConfirm"];

export default function AuthForm({
  mode = "login",
  onSubmit,
  formError = "",
  fieldErrors = {},
  isSubmitting = false,
  onFieldChange,
  onGoogleLogin,
}) {
  const [values, setValues] = useState({
    nickname: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const isSignup = mode === "signup";
  const isGoogleSignup = mode === "googleSignup";
  const showNickname = isSignup || isGoogleSignup;
  const copy = showNickname ? formCopy.signup : formCopy.login;

  let fields = loginFields;
  let errors = validateLogin(values);

  if (isGoogleSignup) {
    fields = ["nickname"];
    errors = { nickname: validateNickname(values.nickname) };
  } else if (isSignup) {
    fields = signupFields;
    errors = validateSignup(values);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    onFieldChange?.(name);
  }

  function getError(field) {
    const clientError =
      submitted || touched[field] || values[field] ? errors[field] : "";

    return clientError || fieldErrors[field] || "";
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);

    if (Object.values(errors).some(Boolean)) return;

    onSubmit?.(Object.fromEntries(new FormData(event.currentTarget)));
  }

  return (
    <main className={styles.main}>
      <section className={styles.panel}>
        <Link href={"/"}>
          <Image className={styles.logo} src={logoImage} alt="최애의 포토" />
        </Link>

        <form
          className={styles.form}
          onSubmit={handleSubmit}
          onBlur={(event) => {
            const field = event.target.name;
            if (fields.includes(field)) {
              setTouched((current) => ({ ...current, [field]: true }));
            }
          }}
          noValidate
        >
          {showNickname && (
            <TextField
              label="닉네임"
              name="nickname"
              placeholder="닉네임을 입력해 주세요"
              value={values.nickname}
              onChange={handleChange}
              error={getError("nickname")}
              required
            />
          )}
          {!isGoogleSignup && (
            <>
              <TextField
                label="이메일"
                name="email"
                type="email"
                placeholder="이메일을 입력해 주세요"
                value={values.email}
                onChange={handleChange}
                error={getError("email")}
                required
              />
              <PasswordField
                label="비밀번호"
                name="password"
                value={values.password}
                onChange={handleChange}
                error={getError("password")}
                required
              />
            </>
          )}
          {isSignup && (
            <PasswordField
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호를 다시 입력해 주세요"
              value={values.passwordConfirm}
              onChange={handleChange}
              error={getError("passwordConfirm")}
              required
            />
          )}
          {formError && <p className={styles.formError}>{formError}</p>}
          <Button
            type="submit"
            thickness="thin"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "처리 중..." : copy.title}
          </Button>

          {onGoogleLogin && (
            <Button
              type="button"
              variant="secondary"
              thickness="thin"
              disabled={isSubmitting}
              onClick={onGoogleLogin}
              className={styles.googleButton}
            >
              <Icon name="loginGoogle" size={32} />
              Google로 시작하기
            </Button>
          )}
        </form>

        <p className={styles.footer}>
          {copy.footer}{" "}
          <Link className={styles.footerLink} href={copy.href}>
            {copy.linkText}
          </Link>
        </p>
      </section>
    </main>
  );
}
