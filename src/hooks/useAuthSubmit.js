"use client";

import { useState, useRef } from "react";
import { ApiError } from "@/lib/api";

export default function useAuthSubmit() {
  const submittingRef = useRef(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  async function submit(request) {
    if (submittingRef.current) return { ok: false };

    submittingRef.current = true;
    setIsSubmitting(true);
    setFormError("");
    setFieldErrors({});

    try {
      const data = await request();
      return { ok: true, data };
    } catch (error) {
      if (error instanceof ApiError) {
        const fields = error.fields ?? {};
        setFieldErrors(fields);

        if (Object.keys(fields).length === 0) {
          setFormError(error.message);
        }
      } else {
        setFormError("요청 중 오류가 발생했습니다.");
      }

      return { ok: false };
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }

  function clearFieldError(field) {
    setFieldErrors((current) => {
      const next = { ...current };
      delete next[field];
      return next;
    });
    setFormError("");
  }

  function clearErrors() {
    setFormError("");
    setFieldErrors({});
  }

  return {
    submit,
    isSubmitting,
    formError,
    fieldErrors,
    clearFieldError,
    clearErrors,
    setFormError,
  };
}
