"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { api, ApiError } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  // 기존 로그아웃 기능 유지
  async function logout() {
    await api.logout();
    setAccessToken(null);
    setUser(null);
  }

  // 구매 후 사용자 정보 및 포인트 갱신
  async function refreshUser() {
    if (!accessToken) return null;

    const userData = await api.getMe(accessToken);

    setUser(userData);

    return userData;
  }

  // 세션 복구
  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const { accessToken: newAccessToken } = await api.refresh();

        if (!cancelled) {
          setAccessToken((prev) => prev ?? newAccessToken);
        }
      } catch {
        // 기존 동작 유지
      } finally {
        if (!cancelled) {
          setIsAuthLoading(false);
        }
      }
    }

    restoreSession();

    return () => {
      cancelled = true;
    };
  }, []);

  // 로그인 사용자 정보 조회
  useEffect(() => {
    if (!accessToken) return;

    let cancelled = false;

    api
      .getMe(accessToken)
      .then((userData) => {
        if (!cancelled) {
          setUser(userData);
        }
      })
      .catch((err) => {
        if (cancelled) return;

        if (err instanceof ApiError && err.status === 401) {
          setAccessToken(null);
          setUser(null);
        }
      });

    return () => {
      cancelled = true;
    };
  }, [accessToken]);

  return (
    <AuthContext.Provider
      value={{
        accessToken,
        setAccessToken,
        user,
        isAuthenticated: Boolean(accessToken),
        isAuthLoading,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth는 AuthProvider 안에서 사용해야 합니다.");
  }

  return context;
}
