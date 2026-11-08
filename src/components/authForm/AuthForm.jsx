"use client";

import Image from "next/image";
import Link from "next/link";
import logoImage from "@/assets/images/logo.svg";
import Button from "@/components/button/Button.jsx";
import PasswordField from "@/components/passwordField/PasswordField.jsx";
import TextField from "@/components/textField/TextField.jsx";
import * as styles from "./AuthForm.css.js";

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

export default function AuthForm({ mode = "login", onSubmit }) {
  const isSignup = mode === "signup";
  const copy = formCopy[isSignup ? "signup" : "login"];

  function handleSubmit(event) {
    if (!onSubmit) return;
    event.preventDefault();
    onSubmit(Object.fromEntries(new FormData(event.currentTarget)));
  }

  return (
    <main className={styles.main}>
      <section className={styles.panel}>
        <Image className={styles.logo} src={logoImage} alt="최애의 포토" />

        <form className={styles.form} onSubmit={handleSubmit}>
          {isSignup && (
            <TextField
              label="이름"
              name="name"
              placeholder="이름을 입력해 주세요"
              required
            />
          )}
          <TextField
            label="이메일"
            name="email"
            type="email"
            placeholder="이메일을 입력해 주세요"
            required
          />
          <PasswordField label="비밀번호" name="password" required />
          {isSignup && (
            <PasswordField
              label="비밀번호 확인"
              name="passwordConfirm"
              placeholder="비밀번호를 다시 입력해 주세요"
              required
            />
          )}
          <Button
            type="submit"
            thickness="thin"
            className={styles.submitButton}
          >
            {copy.title}
          </Button>
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
