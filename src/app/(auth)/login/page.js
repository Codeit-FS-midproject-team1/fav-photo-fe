"use client";

import { useState } from "react";
import AuthForm from "@/components/authForm/AuthForm.jsx";
import ConfirmModal from "@/components/confirmModal/ConfirmModal.jsx";
import { api, GOOGLE_LOGIN_URL } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useAuthSubmit from "@/hooks/useAuthSubmit";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken } = useAuth();
  const [showSignupReward, setShowSignupReward] = useState(false);
  const {
    submit,
    isSubmitting,
    formError,
    fieldErrors,
    clearFieldError,
    setFormError,
  } = useAuthSubmit();

  async function handleLogin(credentials) {
    if (showSignupReward) return;

    const result = await submit(() => api.login(credentials));

    if (!result.ok) return;

    const accessToken = result.data?.accessToken;
    if (!accessToken) {
      setFormError("로그인 응답에 액세스 토큰이 없습니다.");
      return;
    }

    setAccessToken(accessToken);
    if (
      sessionStorage.getItem("signupRewardEmail") ===
      credentials.email.trim().toLowerCase()
    ) {
      sessionStorage.removeItem("signupRewardEmail");
      setShowSignupReward(true);
      return;
    }

    router.replace("/");
  }

  function handleGoogleLogin() {
    window.location.assign(GOOGLE_LOGIN_URL);
  }

  return (
    <>
      <AuthForm
        mode="login"
        onSubmit={handleLogin}
        isSubmitting={isSubmitting || showSignupReward}
        formError={formError}
        fieldErrors={fieldErrors}
        onFieldChange={clearFieldError}
        onGoogleLogin={handleGoogleLogin}
      />
      <ConfirmModal
        open={showSignupReward}
        title="회원가입을 축하합니다!"
        message="10포인트가 지급되었습니다"
        onConfirm={() => router.replace("/")}
        onClose={() => router.replace("/")}
      />
    </>
  );
}
