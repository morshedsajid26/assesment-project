"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { User, AuthResponse } from "@/src/types";
import {
  getTokenCookie,
  getUserCookie,
  setTokenCookie,
  setUserCookie,
  setUserIdCookie,
  removeTokenCookie,
} from "@/src/lib/cookies";
import { apiClient } from "@/src/hooks/useAxios";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (phone: string, name: string) => Promise<AuthResponse>;
  logout: () => void;
  refreshUser: () => Promise<User | null>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const queryClient = useQueryClient();

  const refreshUser = useCallback(async (): Promise<User | null> => {
    const currentToken = getTokenCookie();
    if (!currentToken) {
      setUser(null);
      setToken(null);
      setLoading(false);
      return null;
    }

    try {
      const res = await apiClient.get<User>("/auth/me");
      if (res.data) {
        setUser(res.data);
        setUserCookie(res.data);
        if (res.data._id) {
          setUserIdCookie(res.data._id);
        }
        return res.data;
      }
    } catch (err: any) {
      console.warn("Could not fetch auth/me:", err);
      if (err.response?.status === 401) {
        removeTokenCookie();
        setUser(null);
        setToken(null);
      }
    } finally {
      setLoading(false);
    }
    return null;
  }, []);

  useEffect(() => {
    const cachedToken = getTokenCookie();
    const cachedUser = getUserCookie();

    if (cachedToken) {
      setToken(cachedToken);
      if (cachedUser) setUser(cachedUser);
      refreshUser();
    } else {
      setLoading(false);
    }
  }, [refreshUser]);

  const login = async (phone: string, name: string): Promise<AuthResponse> => {
    setLoading(true);
    try {
      const res = await apiClient.post<AuthResponse>("/auth/login", {
        phone: phone.trim(),
        name: name.trim(),
      });

      const { token: receivedToken, user: receivedUser } = res.data;
      setTokenCookie(receivedToken);
      setUserCookie(receivedUser);
      if (receivedUser._id) {
        setUserIdCookie(receivedUser._id);
      }
      setToken(receivedToken);
      setUser(receivedUser);

      // Invalidate queries for fresh data
      queryClient.invalidateQueries({ queryKey: ["conversations"] });

      toast.success(`Welcome, ${receivedUser.name}!`);
      return res.data;
    } catch (err: any) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        "Failed to sign in. Please try again.";
      toast.error(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    removeTokenCookie();
    setUser(null);
    setToken(null);
    queryClient.clear();
    toast.info("Logged out successfully");
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        refreshUser,
        isAuthenticated: !!token && !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};
