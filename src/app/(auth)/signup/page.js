// signup/page.js
"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm.jsx";
import { useAuth } from "@/contexts/AuthContext.jsx";
import useAuthSubmit from "@/hooks/useAuthSubmit";
import { api } from "@/lib/api";

export default function SignupPage() {
  return (
    <Suspense fallback={null}>
      <SignupContent />
    </Suspense>
  );
}

function SignupContent() {
  const router = useRouter();
  const isGoogleSignup = useSearchParams().get("mode") === "google";
  const { setAccessToken } = useAuth();
  const {
    submit,
    isSubmitting,
    formError,
    fieldErrors,
    clearFieldError,
    setFormError,
  } = useAuthSubmit();

  async function handleSignup({ nickname, email, password }) {
    if (isGoogleSignup) {
      const result = await submit(() => api.googleSignup(nickname));
      if (!result.ok) return;

      const accessToken = result.data?.accessToken;
      if (!accessToken) {
        setFormError("가입 응답에 액세스 토큰이 없습니다.");
        return;
      }

      setAccessToken(accessToken);
      router.replace("/");
      return;
    }

    const result = await submit(() =>
      api.signup({ nickname, email, password }),
    );
    if (result.ok) router.replace("/login");
  }

  const mode = isGoogleSignup ? "googleSignup" : "signup";

  return (
    <AuthForm
      key={mode}
      mode={mode}
      onSubmit={handleSignup}
      isSubmitting={isSubmitting}
      formError={formError}
      fieldErrors={fieldErrors}
      onFieldChange={clearFieldError}
    />
  );
}
