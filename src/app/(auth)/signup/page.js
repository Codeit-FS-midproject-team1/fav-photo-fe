// signup/page.js
"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import AuthForm from "@/components/authForm/AuthForm.jsx";
import ConfirmModal from "@/components/confirmModal/ConfirmModal.jsx";
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
  const [successDestination, setSuccessDestination] = useState(null);
  const {
    submit,
    isSubmitting,
    formError,
    fieldErrors,
    clearFieldError,
    setFormError,
  } = useAuthSubmit();

  async function handleSignup({ nickname, email, password }) {
    if (successDestination) return;

    if (isGoogleSignup) {
      const result = await submit(() => api.googleSignup(nickname));
      if (!result.ok) return;

      const accessToken = result.data?.accessToken;
      if (!accessToken) {
        setFormError("가입 응답에 액세스 토큰이 없습니다.");
        return;
      }

      setAccessToken(accessToken);
      setSuccessDestination("/");
      return;
    }

    const result = await submit(() =>
      api.signup({ nickname, email, password }),
    );
    if (result.ok) setSuccessDestination("/login");
  }

  function finishSignup() {
    router.replace(successDestination);
  }

  const mode = isGoogleSignup ? "googleSignup" : "signup";

  return (
    <>
      <AuthForm
        key={mode}
        mode={mode}
        onSubmit={handleSignup}
        isSubmitting={isSubmitting || Boolean(successDestination)}
        formError={formError}
        fieldErrors={fieldErrors}
        onFieldChange={clearFieldError}
      />
      <ConfirmModal
        open={Boolean(successDestination)}
        title="회원가입을 축하합니다!"
        message="10포인트가 지급되었습니다"
        onConfirm={finishSignup}
        onClose={finishSignup}
      />
    </>
  );
}
