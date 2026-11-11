"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext.jsx";

// 마이갤러리 아래 모든 페이지는 로그인한 사용자만 볼 수 있다
export default function MyGalleryLayout({ children }) {
  const router = useRouter();
  const { isAuthenticated, isAuthLoading } = useAuth();

  useEffect(() => {
    if (!isAuthLoading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [isAuthLoading, isAuthenticated, router]);

  // 로그인 확인 중이거나 로그인 안 했으면 화면을 그리지 않는다
  if (isAuthLoading || !isAuthenticated) return null;

  return children;
}
