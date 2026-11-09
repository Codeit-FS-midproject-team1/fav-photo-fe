"use client";

import AuthForm from "@/components/authForm/AuthForm.jsx";
import { api } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useAuthSubmit from "@/hooks/useAuthSubmit";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const { setAccessToken } = useAuth();
  const {
    submit,
    isSubmitting,
    formError,
    fieldErrors,
    clearFieldError,
    setFormError,
  } = useAuthSubmit();

  async function handleLogin(credentials) {
    const result = await submit(() => api.login(credentials));

    if (!result.ok) return;

    const accessToken = result.data?.accessToken;
    if (!accessToken) {
      setFormError("로그인 응답에 액세스 토큰이 없습니다.");
      return;
    }

    setAccessToken(accessToken);
    router.replace("/");
  }

  return (
    <AuthForm
      mode="login"
      onSubmit={handleLogin}
      isSubmitting={isSubmitting}
      formError={formError}
      fieldErrors={fieldErrors}
      onFieldChange={clearFieldError}
    />
  );
}
