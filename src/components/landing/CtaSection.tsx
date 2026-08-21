"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, MessageSquare, Shield, Users } from "lucide-react";

export const CtaSection: React.FC = () => {
  return (
    <section
      id="get-started"
      className="py-14 relative z-10 scroll-mt-20 overflow-hidden"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl p-8 sm:p-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 text-white shadow-[0_20px_60px_-15px_rgba(79,70,229,0.35)] border border-white/20 overflow-hidden text-center"
        >
          {/* Subtle Ambient Glows inside card */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-cyan-400/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-fuchsia-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-xl mx-auto space-y-4">
            {/* Top Brand Logo */}
            <div className="flex items-center justify-center gap-2.5 select-none mx-auto">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-black/20 border border-white/25">
                <MessageSquare className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-2xl tracking-tight text-white">
                ChatApp
              </span>
            </div>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
              Connect instantly with anyone.
            </h2>

            {/* Subtitle */}
            <p className="text-xs sm:text-sm text-blue-100/90 leading-relaxed max-w-md mx-auto">
              Real-time messaging with sub-50ms WebSocket delivery. No passwords
              or delays — get started in seconds.
            </p>

            {/* Action CTA Button */}
            <div className="pt-2 flex items-center justify-center">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold bg-white text-indigo-700 hover:bg-blue-50 shadow-lg shadow-black/15 hover:scale-105 active:scale-95 transition-all text-sm group cursor-pointer"
              >
                <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                <span>Start Chatting Now</span>
                <ArrowRight className="w-4 h-4 text-indigo-600 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>

            {/* Compact Trust Features */}
            <div className="pt-4 border-t border-white/15 flex items-center justify-center gap-4 sm:gap-6 text-[11px] font-semibold text-blue-100/90">
              <span className="flex items-center gap-1.5">
                <Zap className="w-3 h-3 text-amber-300" /> &lt;50ms Real-Time
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-1.5">
                <Shield className="w-3 h-3 text-emerald-300" /> Passwordless
              </span>
              <span className="w-1 h-1 rounded-full bg-white/40" />
              <span className="flex items-center gap-1.5">
                <Users className="w-3 h-3 text-cyan-300" /> Group Channels
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
