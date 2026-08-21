import axios, { AxiosInstance } from "axios";
import { getTokenCookie, removeTokenCookie } from "@/src/lib/cookies";
import { useRouter } from "next/navigation";
import { useMemo } from "react";

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

// Direct standalone axios client
export const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = getTokenCookie();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      removeTokenCookie();
      if (typeof window !== "undefined" && !window.location.pathname.startsWith("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// React Hook returning the configured Axios instance
export const useAxios = (): AxiosInstance => {
  const router = useRouter();

  const instance = useMemo(() => {
    const customInstance = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    customInstance.interceptors.request.use(
      (config) => {
        const token = getTokenCookie();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    customInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          removeTokenCookie();
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return customInstance;
  }, [router]);

  return instance;
};
