"use client";

import { createContext, useContext, useState } from "react";
import { useEffect } from "react";
import { api, ApiError } from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  async function logout() {
    try {
      await api.logout(accessToken);
    } catch (err) {
      if (!(err instanceof ApiError && err.status === 401)) throw err;
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  }

  useEffect(() => {
    let cancelled = false;

    async function restoreSession() {
      try {
        const { accessToken: newAccessToken } = await api.refresh();
        if (!cancelled) setAccessToken((prev) => prev ?? newAccessToken);
      } catch {
      } finally {
        if (!cancelled) setIsAuthLoading(false);
      }
    }

    restoreSession();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    let cancelled = false;

    api
      .getMe(accessToken)
      .then((userData) => {
        if (!cancelled) setUser(userData);
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
