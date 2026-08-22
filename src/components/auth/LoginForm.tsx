"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InputField } from "@/src/components/ui/InputField";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/hooks/useAuth";
import { BrandLogo } from "@/src/components/ui/BrandLogo";
import {
  Phone,
  User as UserIcon,
  Sparkles,
  AlertCircle,
  ArrowRight,
} from "lucide-react";

export const LoginForm: React.FC = () => {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const { login, loading, error, clearError } = useAuth();

  const validate = () => {
    let isValid = true;
    setPhoneError("");
    setNameError("");

    const trimmedPhone = phone.trim();
    const trimmedName = name.trim();

    if (!trimmedPhone) {
      setPhoneError("Phone number is required");
      isValid = false;
    } else if (trimmedPhone.length < 5) {
      setPhoneError("Please enter a valid phone number");
      isValid = false;
    }

    if (!trimmedName) {
      setNameError("Your name is required");
      isValid = false;
    } else if (trimmedName.length < 2) {
      setNameError("Name must be at least 2 characters");
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validate()) return;

    try {
      await login(phone.trim(), name.trim());
    } catch {
      // Error handled by useAuth state
    }
  };

  return (
    <div
      className="w-full max-w-md mx-auto p-8 sm:p-10 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/90 dark:border-zinc-800 shadow-2xl shadow-blue-500/10 transition-all"
      suppressHydrationWarning
    >
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <BrandLogo href="/" size="lg" className="mb-4" />
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome to ChatApp
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs leading-relaxed">
          Enter your phone number and name to sign in or instantly get started.
        </p>
      </div>

 

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <InputField
          label="Phone Number"
          placeholder="e.g. 01712345678 or +88017..."
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          leftIcon={<Phone className="w-4 h-4" />}
          disabled={loading}
          autoComplete="tel"
          autoFocus
        />

        <InputField
          label="Your Display Name"
          placeholder="e.g. Jane Doe"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          leftIcon={<UserIcon className="w-4 h-4" />}
          disabled={loading}
          autoComplete="name"
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full mt-3 font-bold h-12 rounded-2xl shadow-xl shadow-blue-500/30 text-sm tracking-wide"
          isLoading={loading}
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          Continue to Chat
        </Button>
      </form>

      {/* Helpful Hint */}
      <div className="mt-8 pt-5 border-t border-slate-200/80 dark:border-zinc-800/80 text-center">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
          🔒 No password required. If you are new, your account will be created automatically.
        </p>
      </div>
    </div>
  );
};
