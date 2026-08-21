import React from "react";
import { LoginForm } from "@/src/components/auth/LoginForm";

export const metadata = {
  title: "Login | ChatApp",
  description: "Sign in with your phone number to access your messages",
};

export default function LoginPage() {
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center p-4 sm:p-6 bg-gradient-to-br from-slate-100 via-blue-50/50 to-indigo-100/60 dark:from-zinc-950 dark:via-zinc-900 dark:to-zinc-950 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 dark:bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[450px] h-[450px] bg-indigo-500/20 dark:bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-2/3 left-1/4 w-72 h-72 bg-cyan-400/15 dark:bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />

      {/* Main Login Form Container */}
      <div className="relative z-10 w-full max-w-md" suppressHydrationWarning>
        <LoginForm />
      </div>
    </main>
  );
}
