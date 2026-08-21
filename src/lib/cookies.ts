import Cookies from "js-cookie";
import { User } from "@/src/types";

const TOKEN_KEY = "chat_token";
const USER_KEY = "chat_user";
const USER_ID_KEY = "chat_user_id";

export const setTokenCookie = (token: string, days = 7): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: days,
    path: "/",
    sameSite: "lax",
  });
};

export const getTokenCookie = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const setUserIdCookie = (userId: string, days = 7): void => {
  Cookies.set(USER_ID_KEY, userId, {
    expires: days,
    path: "/",
    sameSite: "lax",
  });
};

export const getUserIdCookie = (): string | null => {
  return Cookies.get(USER_ID_KEY) || null;
};

export const removeUserIdCookie = (): void => {
  Cookies.remove(USER_ID_KEY, { path: "/" });
};

export const setUserCookie = (user: User, days = 7): void => {
  try {
    Cookies.set(USER_KEY, JSON.stringify(user), {
      expires: days,
      path: "/",
      sameSite: "lax",
    });
    if (user._id) {
      setUserIdCookie(user._id, days);
    }
  } catch (e) {
    console.error("Failed to set user cookie:", e);
  }
};

export const getUserCookie = (): User | null => {
  const value = Cookies.get(USER_KEY);
  if (!value) return null;
  try {
    return JSON.parse(value);
  } catch {
    return null;
  }
};

export const removeUserCookie = (): void => {
  Cookies.remove(USER_KEY, { path: "/" });
  removeUserIdCookie();
};

export const removeTokenCookie = (): void => {
  Cookies.remove(TOKEN_KEY, { path: "/" });
  removeUserCookie();
  removeUserIdCookie();
};
