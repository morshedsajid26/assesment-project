"use client";

import React, { useState } from "react";
import { InputField } from "@/src/components/ui/InputField";
import { Button } from "@/src/components/ui/Button";
import { useAuth } from "@/src/hooks/useAuth";
import {
  MessageSquare,
  Phone,
  User as UserIcon,
  Sparkles,
  AlertCircle,
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
      className="w-full max-w-md mx-auto p-8 rounded-3xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-zinc-200/80 dark:border-zinc-800 shadow-2xl shadow-blue-500/5 transition-all"
      suppressHydrationWarning
    >
      {/* Brand Header */}
      <div className="flex flex-col items-center text-center mb-8">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 mb-4">
          <MessageSquare className="w-7 h-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Welcome to ChatApp
        </h1>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400 max-w-xs">
          Enter your phone number and name to sign in or instantly create your
          account.
        </p>
      </div>

      {/* Global Error Banner */}
      {error && (
        <div className="mb-6 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/50 flex items-center gap-3 text-rose-600 dark:text-rose-400 text-xs animate-in fade-in duration-200">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
          className="w-full mt-2 font-semibold shadow-md shadow-blue-500/25"
          isLoading={loading}
          rightIcon={<Sparkles className="w-4 h-4" />}
        >
          Continue to Chat
        </Button>
      </form>

      {/* Helpful Hint */}
      <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
        <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
          🔒 No password required. If your phone number is not registered yet,
          we will register it for you automatically.
        </p>
      </div>
    </div>
  );
};
