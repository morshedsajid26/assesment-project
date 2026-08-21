"use client";

import React, { forwardRef, InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/src/lib/utils";

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      className,
      containerClassName,
      id,
      disabled,
      ...props
    },
    ref,
  ) => {
    const inputId =
      id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 tracking-wide"
          >
            {label}
          </label>
        )}

        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 text-zinc-400 dark:text-zinc-500 pointer-events-none flex items-center justify-center">
              {leftIcon}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            className={cn(
              "w-full rounded-xl bg-slate-50 dark:bg-zinc-900 border text-zinc-900 dark:text-zinc-100 px-3.5 py-2.5 text-sm transition-all duration-150 shadow-2xs",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-500",
              "focus:outline-none focus:bg-white dark:focus:bg-zinc-900 focus:ring-4 focus:ring-blue-500/15 focus:border-blue-500",
              leftIcon ? "pl-10" : "pl-3.5",
              rightIcon ? "pr-10" : "pr-3.5",
              error
                ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20 bg-rose-50/30 dark:bg-rose-950/20"
                : "border-slate-200 dark:border-zinc-800 hover:border-slate-300 dark:hover:border-zinc-700",
              disabled &&
                "opacity-60 cursor-not-allowed bg-slate-100 dark:bg-zinc-900",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <div className="absolute right-3.5 text-zinc-400 dark:text-zinc-500 flex items-center justify-center">
              {rightIcon}
            </div>
          )}
        </div>

        {error && <p className="text-xs text-rose-500 font-medium">{error}</p>}
        {!error && helperText && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

InputField.displayName = "InputField";
