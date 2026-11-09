// C:/Users/thcjf/Desktop/midproject-fe/src/app/(main)/my-info/page.js
"use client";

import { useState } from "react";
import Link from "next/link";
import PasswordField from "@/components/passwordField/PasswordField";
import TextField from "@/components/textField/TextField";
import { useAuth } from "@/contexts/AuthContext";
import { request } from "@/lib/api";
import * as styles from "./MyInfo.css";

export default function MyInfoPage() {
  const { accessToken, user, setUser, isAuthLoading } = useAuth();
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [savingNickname, setSavingNickname] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  function patchProfile(field, body) {
    return request(`/users/me/${field}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${accessToken}` },
      body,
    });
  }

  async function changeNickname(event) {
    event.preventDefault();
    const input = event.currentTarget.elements.nickname;
    const nickname = input.value.trim();

    if (nickname.length < 2 || nickname.length > 10) {
      setNicknameMessage("닉네임은 2~10자로 입력해 주세요.");
      return;
    }

    if (nickname === user.nickname) {
      setNicknameMessage("현재 사용 중인 닉네임이에요.");
      return;
    }

    setNicknameMessage("");
    setSavingNickname(true);

    try {
      await patchProfile("nickname", { nickname });
      input.value = nickname;
      setUser((current) =>
        current?.id === user.id ? { ...current, nickname } : current,
      );
      setNicknameMessage("닉네임을 변경했어요.");
    } catch (error) {
      setNicknameMessage(error.message);
    } finally {
      setSavingNickname(false);
    }
  }

  async function changePassword(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = new FormData(form);
    const currentPassword = fields.get("currentPassword");
    const newPassword = fields.get("newPassword");

    if (newPassword !== fields.get("confirmPassword")) {
      setPasswordMessage("새 비밀번호가 일치하지 않아요.");
      return;
    }

    setPasswordMessage("");
    setSavingPassword(true);

    try {
      await patchProfile("password", { currentPassword, newPassword });
      form.reset();
      setPasswordMessage("비밀번호를 변경했어요.");
    } catch (error) {
      setPasswordMessage(error.message);
    } finally {
      setSavingPassword(false);
    }
  }

  return (
    <main className={styles.page}>
      <h1 className={styles.title}>내 정보</h1>
      <p className={styles.hint}>계정 정보를 확인하고 수정할 수 있어요.</p>

      {isAuthLoading || (accessToken && !user) ? (
        <p role="status" className={styles.hint}>계정 정보를 불러오는 중이에요.</p>
      ) : !accessToken ? (
        <Link className={styles.hint} href="/login">로그인 후 이용해 주세요.</Link>
      ) : (
        <>
          <section className={styles.section}>
            <div className={`${styles.accountField} ${styles.emailField}`}>
              <TextField
                label="이메일"
                id="email"
                type="email"
                value={user.email}
                readOnly
                suffix={<span className={styles.badge}>변경 불가</span>}
              />
            </div>
            <p className={styles.hint}>가입한 이메일은 변경할 수 없어요.</p>
          </section>

          <form key={user.id} className={styles.section} onSubmit={changeNickname}>
            <div className={styles.accountField}>
              <TextField
                label="닉네임"
                id="nickname"
                name="nickname"
                defaultValue={user.nickname}
                placeholder="닉네임을 입력해 주세요"
                maxLength={10}
                disabled={savingNickname}
                required
                suffix={
                  <button
                    type="submit"
                    className={styles.button}
                    disabled={savingNickname}
                  >
                    {savingNickname ? "변경 중" : "변경"}
                  </button>
                }
              />
            </div>
            <p className={styles.hint} role="status">
              {nicknameMessage || "2~10자 · 변경 버튼을 누르면 중복 여부를 확인해요."}
            </p>
          </form>

          <section className={styles.section}>
            <h2 className={styles.heading}>비밀번호 변경</h2>
            {user.hasPassword ? (
              <form className={styles.passwordForm} onSubmit={changePassword}>
                <PasswordField
                  label="현재 비밀번호"
                  name="currentPassword"
                  autoComplete="current-password"
                  required
                />
                <PasswordField
                  label="새 비밀번호"
                  name="newPassword"
                  placeholder="8~16자로 입력해 주세요"
                  autoComplete="new-password"
                  minLength={8}
                  maxLength={16}
                  required
                />
                <PasswordField
                  label="새 비밀번호 확인"
                  name="confirmPassword"
                  placeholder="새 비밀번호를 한 번 더 입력해 주세요"
                  autoComplete="new-password"
                  required
                />
                <button className={styles.button} disabled={savingPassword}>
                  {savingPassword ? "변경 중" : "비밀번호 변경"}
                </button>
                {passwordMessage && <p className={styles.hint} role="status">{passwordMessage}</p>}
              </form>
            ) : (
              <p className={styles.hint}>비밀번호가 설정되지 않은 계정이에요.</p>
            )}
          </section>

          <section className={styles.section}>
            <h2 className={styles.dangerHeading}>위험 구역</h2>
            <div className={styles.dangerPanel}>
              <div>
                <strong>회원 탈퇴</strong>
                <p className={styles.hint}>회원 탈퇴 기능은 준비 중이에요.</p>
              </div>
              {/* 회원 탈퇴 API 연결 후 활성화합니다. */}
              <button className={styles.dangerButton} type="button" disabled>회원 탈퇴</button>
            </div>
          </section>
        </>
      )}
    </main>
  );
}
