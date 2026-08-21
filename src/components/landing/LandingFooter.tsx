"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Heart } from "lucide-react";

export const LandingFooter: React.FC = () => {
  return (
    <footer className="border-t border-slate-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl py-12 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand & Info */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-sm shadow-blue-500/20">
              <MessageSquare className="w-4 h-4" />
            </div>
            <span className="font-extrabold text-sm tracking-tight text-zinc-900 dark:text-zinc-100">
              ChatApp
            </span>
            <span className="text-xs text-zinc-400">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>

          {/* System Status & Built info */}
          <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60 font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Socket Systems Operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
