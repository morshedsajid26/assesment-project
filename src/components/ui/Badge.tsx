"use client";

import React, { ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export interface BadgeProps {
  children: ReactNode;
  variant?:
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | "neutral";
  size?: "sm" | "md";
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "primary",
  size = "md",
  className,
}) => {
  const variantStyles = {
    primary:
      "bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20",
    secondary:
      "bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20",
    success:
      "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    warning:
      "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20",
    danger:
      "bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20",
    neutral:
      "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700",
  };

  const sizeStyles = {
    sm: "px-1.5 py-0.5 text-[10px] font-semibold rounded-md",
    md: "px-2 py-0.5 text-xs font-semibold rounded-lg",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium select-none shrink-0",
        variantStyles[variant],
        sizeStyles[size],
        className,
      )}
    >
      {children}
    </span>
  );
};
