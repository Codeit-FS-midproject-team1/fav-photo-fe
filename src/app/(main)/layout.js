"use client";

import Header from "@/components/header/Header";
import { useAuth } from "@/contexts/AuthContext.jsx";
import { useRouter } from "next/navigation";

export default function MainLayout({ children }) {
  const { isAuthenticated, user, logout } = useAuth();
  const router = useRouter();

  async function handleLogout() {
    await logout();
    router.replace("/");
  }

  return (
    <>
      <Header
        isLoggedIn={isAuthenticated}
        points={user?.points ?? 0}
        username={user?.nickname ?? ""}
        unreadCount={0}
        onLogout={handleLogout}
      />
      {children}
    </>
  );
}
