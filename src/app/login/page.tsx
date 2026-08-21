import React from "react";
import { LoginForm } from "@/src/components/auth/LoginForm";

export const metadata = {
  title: "Login | ChatApp",
  description: "Sign in with your phone number to access your messages",
};

export default function LoginPage() {
  return (
    <main
      className="relative min-h-screen w-full flex items-center justify-center p-4 bg-zinc-50 dark:bg-zinc-950 overflow-hidden"
      suppressHydrationWarning
    >
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/15 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-indigo-500/10 dark:bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Form Component */}
      <div className="relative z-10 w-full max-w-md" suppressHydrationWarning>
        <LoginForm />
      </div>
    </main>
  );
}
