"use client";

import AuthForm from "@/components/authForm/AuthForm.jsx";
import { api } from "@/lib/api";
import useAuthSubmit from "@/hooks/useAuthSubmit";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const { submit, isSubmitting, formError, fieldErrors, clearFieldError } =
    useAuthSubmit();

  async function handleSignup({ _passwordConfirm, ...credentials }) {
    const result = await submit(() => api.signup(credentials));

    if (result.ok) {
      router.replace("/login");
    }
  }

  return (
    <AuthForm
      mode="signup"
      onSubmit={handleSignup}
      isSubmitting={isSubmitting}
      formError={formError}
      fieldErrors={fieldErrors}
      onFieldChange={clearFieldError}
    />
  );
}
