"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Zap,
  Shield,
  Smartphone,
  Moon,
  Sparkles,
  ArrowDownCircle,
  ShieldCheck,
  Check,
} from "lucide-react";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export const BentoFeatures: React.FC = () => {
  return (
    <section id="features" className="py-24 md:py-32 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-xs mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" /> Built for Speed & Simplicity
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50"
          >
            Everything you need for seamless communication.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400"
          >
            Engineered with modern web standards, ultra-low latency WebSockets, and
            delightful micro-interactions.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: 2-Cols Real-time Engine */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-sky-50/60 to-blue-100/40 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-blue-950/20 backdrop-blur-xl border border-blue-200/70 dark:border-zinc-800 shadow-[0_15px_40px_-10px_rgba(59,130,246,0.12)] relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/25 mb-6">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Sub-Millisecond Real-Time Engine
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Powered by Socket.IO and TanStack Query with optimistic mutations. Messages
                arrive instantly across all connected clients with zero manual polling or delay.
              </p>
            </div>

            {/* Visual Simulated Live Socket Stream */}
            <div className="mt-8 pt-6 border-t border-blue-200/50 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Optimistic Updates
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Instant Fallback Sync
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                <Check className="w-3.5 h-3.5 text-emerald-500" /> Chronological Auto-Sort
              </span>
            </div>
          </motion.div>

          {/* Card 2: 1-Col Group Management */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-indigo-50/60 to-purple-100/40 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-indigo-950/20 backdrop-blur-xl border border-indigo-200/70 dark:border-zinc-800 shadow-[0_15px_40px_-10px_rgba(99,102,241,0.12)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 mb-6">
                <ThreeUsersIcon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Advanced Group Channels
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Create multi-user groups with full admin hierarchy. Promote members, remove
                users with modal confirmations, and rename channels seamlessly.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 p-3 rounded-2xl bg-white/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <div className="text-xs">
                <p className="font-bold text-zinc-900 dark:text-zinc-100">
                  Full Admin Permissions
                </p>
                <p className="text-[11px] text-zinc-500">
                  Controlled member moderation
                </p>
              </div>
            </div>
          </motion.div>

          {/* Card 3: 1-Col Passwordless Auth */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-emerald-50/60 to-teal-100/40 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-emerald-950/20 backdrop-blur-xl border border-emerald-200/70 dark:border-zinc-800 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.12)] flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/25 mb-6">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Zero Friction Auth
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                No passwords to remember. Instant access with phone and display name. Automatically
                provisions new accounts on the fly.
              </p>
            </div>

            <div className="mt-8 p-3 rounded-2xl bg-white/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-xs font-semibold text-zinc-800 dark:text-zinc-200 shadow-2xs">
              🔒 Cookie-backed JWT Security
            </div>
          </motion.div>

          {/* Card 4: 2-Cols Smart Theming & Mobile UX */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-violet-50/60 to-purple-100/40 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-violet-950/20 backdrop-blur-xl border border-violet-200/70 dark:border-zinc-800 shadow-[0_15px_40px_-10px_rgba(139,92,246,0.12)] relative overflow-hidden flex flex-col justify-between"
          >
            <div className="relative z-10 max-w-lg">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-violet-600 to-pink-600 flex items-center justify-center text-white shadow-lg shadow-violet-500/25 mb-6">
                <Moon className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                Intelligent Dual Theme & Smart Scroll
              </h3>
              <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Class-based dark and light modes with custom high-contrast scrollbars. Smart auto-scroll
                pins latest messages to the bottom while respecting user history reading.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-violet-200/50 dark:border-zinc-800/80 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                <ArrowDownCircle className="w-3.5 h-3.5 text-blue-500" /> Non-Intrusive Auto-Scroll
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 dark:bg-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200 border border-slate-200/80 dark:border-zinc-700/60 shadow-2xs">
                <Smartphone className="w-3.5 h-3.5 text-indigo-500" /> 100% Mobile Responsive
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
