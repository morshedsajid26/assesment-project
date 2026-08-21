"use client";

import { useState } from "react";
import { useAuthContext } from "@/src/context/AuthContext";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const auth = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (phone: string, name: string) => {
    setError(null);
    try {
      const data = await auth.login(phone, name);
      router.push("/chat");
      return data;
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        err.message ||
        "Failed to sign in. Please check your credentials.";
      setError(message);
      throw new Error(message);
    }
  };

  const handleLogout = () => {
    auth.logout();
  };

  return {
    user: auth.user,
    token: auth.token,
    loading: auth.loading,
    error,
    login: handleLogin,
    logout: handleLogout,
    refreshUser: auth.refreshUser,
    isAuthenticated: auth.isAuthenticated,
    clearError: () => setError(null),
  };
};
