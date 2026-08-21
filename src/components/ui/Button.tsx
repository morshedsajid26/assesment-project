"use client";

import React, { forwardRef, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variantStyles = {
      primary:
        "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 active:scale-[0.98] text-white shadow-md shadow-blue-500/25 font-semibold",
      secondary:
        "bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200/80 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs active:scale-[0.98]",
      outline:
        "border border-slate-300 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 active:scale-[0.98]",
      danger:
        "bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 active:scale-[0.98] text-white shadow-md shadow-rose-500/25 font-semibold",
      ghost:
        "hover:bg-slate-100 dark:hover:bg-zinc-800/70 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 active:scale-[0.98]",
    };

    const sizeStyles = {
      sm: "h-8 px-3 text-xs rounded-lg gap-1.5",
      md: "h-10 px-4 text-sm rounded-xl gap-2",
      lg: "h-12 px-6 text-base rounded-xl gap-2.5",
      icon: "h-10 w-10 p-0 rounded-xl justify-center items-center",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500/30",
          variantStyles[variant],
          sizeStyles[size],
          (disabled || isLoading) &&
            "opacity-60 cursor-not-allowed pointer-events-none",
          className,
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          <>
            {leftIcon && (
              <span className="inline-flex shrink-0">{leftIcon}</span>
            )}
            {children}
            {rightIcon && (
              <span className="inline-flex shrink-0">{rightIcon}</span>
            )}
          </>
        )}
      </button>
    );
  },
);

Button.displayName = "Button";
