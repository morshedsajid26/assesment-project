"use client";

import React, { forwardRef, useState } from "react";
import { InputField, InputFieldProps } from "./InputField";
import { Eye, EyeOff, Lock } from "lucide-react";

export interface PasswordFieldProps extends Omit<InputFieldProps, "type" | "rightIcon"> {
  showToggle?: boolean;
}

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>(
  ({ showToggle = true, leftIcon = <Lock className="w-4 h-4" />, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
      <InputField
        ref={ref}
        type={showPassword ? "text" : "password"}
        leftIcon={leftIcon}
        rightIcon={
          showToggle ? (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors focus:outline-none"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  }
);

PasswordField.displayName = "PasswordField";
