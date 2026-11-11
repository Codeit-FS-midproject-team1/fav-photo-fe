"use client";

import Header from "@/components/header/Header";
import NotificationDropdown from "@/components/notificationDropdown/NotificationDropdown";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function MainLayout({ children }) {
  const { isAuthenticated, isAuthLoading, user, logout } = useAuth();
  const router = useRouter();
  const [logoutError, setLogoutError] = useState("");

  async function handleLogout() {
    setLogoutError("");

    try {
      await logout();
      router.replace("/");
    } catch {
      setLogoutError("로그아웃에 실패했습니다. 다시 시도해 주세요.");
    }
  }

  return (
    <>
      <Header
        isLoggedIn={isAuthenticated}
        isAuthLoading={isAuthLoading}
        points={user?.points ?? 0}
        username={user?.nickname ?? ""}
        unreadCount={0}
        notification={<NotificationDropdown />}
        onLogout={handleLogout}
      />
      {logoutError && (
        <div role="alert">
          <p>{logoutError}</p>
          <button type="button" onClick={handleLogout}>
            다시 시도
          </button>
        </div>
      )}
      {children}
    </>
  );
}
