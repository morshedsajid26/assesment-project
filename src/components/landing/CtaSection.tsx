"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Shield, Users } from "lucide-react";
import { BrandLogo } from "@/src/components/ui/BrandLogo";

export const CtaSection: React.FC = () => {
  return (
    <section
      id="get-started"
      className="py-16 md:py-24 relative z-10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6 }}
          className="relative rounded-[32px] p-8 sm:p-12 md:p-14 bg-gradient-to-br from-blue-50/90 via-indigo-50/60 to-purple-50/70 dark:from-zinc-900/95 dark:via-zinc-900/90 dark:to-zinc-950/95 backdrop-blur-2xl border border-blue-200/80 dark:border-zinc-800 shadow-[0_20px_60px_-15px_rgba(59,130,246,0.16)] dark:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)] overflow-hidden text-center"
        >
          {/* Ambient Lighting Accents tailored for Light and Dark modes */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Subtle Cyber Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.06)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-5">
            {/* Top Brand Logo - Adaptive Light/Dark Colors */}
            <div className="flex items-center justify-center select-none mx-auto">
              <BrandLogo href="/" size="lg" />
            </div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
              Connect instantly with anyone.
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto font-medium">
              Real-time messaging with sub-50ms WebSocket delivery. No passwords or delays — get started in seconds.
            </p>

            {/* Action CTA Button */}
            <div className="pt-2 flex items-center justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:scale-105 active:scale-95 transition-all duration-200 text-base group cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
                <span>Start Chatting Now</span>
                <ArrowRight className="w-5 h-5 text-white/90 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Adaptive Trust Badges for Light & Dark */}
            <div className="pt-6 border-t border-slate-200/80 dark:border-zinc-800/80 flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/90 dark:border-zinc-700/60 shadow-2xs">
                <Zap className="w-3.5 h-3.5 text-amber-500" /> &lt;50ms Real-Time
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/90 dark:border-zinc-700/60 shadow-2xs">
                <Shield className="w-3.5 h-3.5 text-emerald-500" /> Passwordless
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md border border-slate-200/90 dark:border-zinc-700/60 shadow-2xs">
                <Users className="w-3.5 h-3.5 text-blue-500" /> Group Channels
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
