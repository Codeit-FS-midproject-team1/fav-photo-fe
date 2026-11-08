"use client";

import Header from "@/components/header/Header";
import { useAuth } from "@/contexts/AuthContext.jsx";

export default function MainLayout({ children }) {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header
        isLoggedIn={isAuthenticated}
        points={1540}
        username="유디"
        unreadCount={1}
      />
      {children}
    </>
  );
}
