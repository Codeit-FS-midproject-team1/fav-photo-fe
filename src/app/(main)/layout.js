"use client";

import Header from "@/components/header/Header";
import { useAuth } from "@/contexts/AuthContext.jsx";

export default function MainLayout({ children }) {
  const { isAuthenticated, user } = useAuth();

  return (
    <>
      <Header
        isLoggedIn={isAuthenticated}
        points={user?.points ?? 0}
        username={user?.nickname ?? ""}
        unreadCount={0}
      />
      {children}
    </>
  );
}
