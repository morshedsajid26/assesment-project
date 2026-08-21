import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format message timestamp (e.g., 10:42 AM)
export function formatTime(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
  } catch {
    return "";
  }
}

// Format conversation list timestamp (e.g., Today, Yesterday, 21 Aug)
export function formatConversationTime(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true });
    }

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) {
      return "Yesterday";
    }

    // Within current year
    if (date.getFullYear() === now.getFullYear()) {
      return date.toLocaleDateString([], { month: "short", day: "numeric" });
    }

    return date.toLocaleDateString([], { month: "numeric", day: "numeric", year: "2-digit" });
  } catch {
    return "";
  }
}

// Format date header for message stream (e.g. Today, Yesterday, August 21, 2026)
export function formatDateDivider(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "";

    const now = new Date();
    const isToday =
      date.getDate() === now.getDate() &&
      date.getMonth() === now.getMonth() &&
      date.getFullYear() === now.getFullYear();

    if (isToday) return "Today";

    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const isYesterday =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isYesterday) return "Yesterday";

    return date.toLocaleDateString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  } catch {
    return "";
  }
}

// Get initials from user name
export function getInitials(name?: string): string {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Deterministic vibrant gradient color palette for user avatars based on name/id
const AVATAR_COLORS = [
  "bg-gradient-to-tr from-blue-600 to-cyan-400 text-white shadow-sm shadow-blue-500/20",
  "bg-gradient-to-tr from-emerald-600 to-teal-400 text-white shadow-sm shadow-emerald-500/20",
  "bg-gradient-to-tr from-indigo-600 to-blue-400 text-white shadow-sm shadow-indigo-500/20",
  "bg-gradient-to-tr from-purple-600 to-pink-400 text-white shadow-sm shadow-purple-500/20",
  "bg-gradient-to-tr from-rose-600 to-orange-400 text-white shadow-sm shadow-rose-500/20",
  "bg-gradient-to-tr from-amber-600 to-yellow-400 text-white shadow-sm shadow-amber-500/20",
  "bg-gradient-to-tr from-teal-600 to-emerald-400 text-white shadow-sm shadow-teal-500/20",
  "bg-gradient-to-tr from-cyan-600 to-blue-400 text-white shadow-sm shadow-cyan-500/20",
  "bg-gradient-to-tr from-violet-600 to-indigo-400 text-white shadow-sm shadow-violet-500/20",
  "bg-gradient-to-tr from-fuchsia-600 to-rose-400 text-white shadow-sm shadow-fuchsia-500/20",
];

export function getAvatarColor(seed?: string): string {
  if (!seed) return AVATAR_COLORS[0];
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = seed.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}
