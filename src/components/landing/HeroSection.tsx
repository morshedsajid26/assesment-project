"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Activity,
} from "lucide-react";
import { HeroChatMockup } from "@/src/components/landing/HeroChatMockup";

export const HeroSection: React.FC = () => {
  // Dynamic rotating animated audience words
  const rotatingWords = ["Teams", "Developers", "Friends", "Communities", "Creators"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2400);
    return () => clearInterval(interval);
  }, [rotatingWords.length]);

  return (
    <section id="hero" className="relative pt-32 pb-24 md:pt-44 md:pb-36 overflow-hidden scroll-mt-20">
      {/* ============================================================ */}
      {/* 1. BALANCED VIBRANT BACKGROUND EFFECTS (CRISP, CLEAN & RICH) */}
      {/* ============================================================ */}

      {/* Cyber Grid with Balanced Contrast */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(59,130,246,0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.12)_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,rgba(59,130,246,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,0.07)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:radial-gradient(ellipse_68%_58%_at_50%_40%,#000_65%,transparent_100%)] pointer-events-none" />

      {/* Expanding Sonar / Radar Pulse Rings with Crisp Visibility */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
        {/* Ring 1 */}
        <motion.div
          animate={{ scale: [1, 2.6], opacity: [0.65, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut" }}
          className="w-[300px] h-[300px] rounded-full border-2 border-blue-500/50 dark:border-blue-500/40 bg-transparent"
        />
        {/* Ring 2 */}
        <motion.div
          animate={{ scale: [1, 2.6], opacity: [0.65, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: 1.2 }}
          className="w-[300px] h-[300px] rounded-full border-2 border-indigo-500/45 dark:border-indigo-500/35 bg-transparent absolute inset-0 m-auto"
        />
        {/* Ring 3 */}
        <motion.div
          animate={{ scale: [1, 2.6], opacity: [0.65, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeOut", delay: 2.4 }}
          className="w-[300px] h-[300px] rounded-full border-2 border-violet-500/45 dark:border-violet-500/35 bg-transparent absolute inset-0 m-auto"
        />
      </div>

      {/* Perfectly Balanced Glowing Ambient Spheres */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [-25, 25, -25],
          y: [-18, 18, -18],
          rotate: [0, 180, 360],
        }}
        transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-500/28 via-indigo-500/22 to-violet-500/18 dark:from-blue-600/20 dark:via-indigo-600/18 dark:to-purple-600/15 rounded-full blur-[135px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.25, 1],
          x: [25, -25, 25],
          y: [18, -18, 18],
        }}
        transition={{ repeat: Infinity, duration: 12, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-6 w-[480px] h-[480px] bg-cyan-400/25 dark:bg-cyan-500/15 rounded-full blur-[115px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          x: [-25, 25, -25],
          y: [-18, 18, -18],
        }}
        transition={{ repeat: Infinity, duration: 14, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 left-6 w-[480px] h-[480px] bg-fuchsia-400/25 dark:bg-fuchsia-600/15 rounded-full blur-[115px] pointer-events-none"
      />

      {/* Floating Starlight Particles */}
      {[...Array(7)].map((_, i) => (
        <motion.div
          key={i}
          animate={{
            y: [0, -32, 0],
            opacity: [0.3, 0.9, 0.3],
            scale: [0.8, 1.4, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 3 + (i % 3),
            ease: "easeInOut",
            delay: i * 0.55,
          }}
          style={{
            top: `${16 + (i * 11)}%`,
            left: `${9 + (i * 13)}%`,
          }}
          className="absolute w-2 h-2 rounded-full bg-blue-500/90 dark:bg-blue-300 shadow-[0_0_8px_rgba(59,130,246,0.6)] pointer-events-none"
        />
      ))}

      {/* ============================================================ */}
      {/* 2. HERO CONTENT WITH HEAVY ANIMATIONS */}
      {/* ============================================================ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Glowing Animated Announcement Pill */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/95 dark:bg-zinc-900/90 backdrop-blur-2xl border border-blue-300/80 dark:border-blue-500/40 shadow-[0_4px_22px_rgba(59,130,246,0.18)] mb-8 hover:scale-105 transition-all cursor-default"
          >
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-80" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-blue-600 shadow-sm" />
            </span>
            <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100 tracking-wide uppercase">
              ⚡ Sub-50ms WebSocket Broadcast Engine
            </span>
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span className="text-xs text-blue-600 dark:text-blue-400 font-extrabold flex items-center gap-1">
              <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </motion.div>

          {/* Dynamic Headline with Flipping Word Reel */}
          <motion.h1
            initial={{ opacity: 0, y: 35, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, type: "spring", damping: 18 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.08]"
          >
            Instant Real-Time Chat for{" "}
            <span className="inline-block relative min-w-[200px] sm:min-w-[320px] text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={rotatingWords[wordIndex]}
                  initial={{ y: 40, opacity: 0, rotateX: -90, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, rotateX: 0, filter: "blur(0px)" }}
                  exit={{ y: -40, opacity: 0, rotateX: 90, filter: "blur(8px)" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="inline-block bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-700 dark:from-blue-400 dark:via-indigo-300 dark:to-violet-400 bg-clip-text text-transparent decoration-blue-500/30 underline-offset-8"
                >
                  {rotatingWords[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </span>
          </motion.h1>

          {/* Subtitle with Animated Reveal */}
          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="mt-7 text-base sm:text-xl text-zinc-700 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed font-semibold"
          >
            Experience lightning-fast messaging with zero password hurdles, continuous WebSocket synchronization, and intelligent group channel hierarchy.
          </motion.p>

          {/* Animated Spinning Laser CTA Button Strip */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-5"
          >
            {/* High-Energy Primary Button with Conic Laser Glow */}
            <div className="relative group w-full sm:w-auto">
              {/* Spinning Rainbow Glow Border */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 opacity-80 blur-lg group-hover:opacity-100 group-hover:blur-xl transition duration-500 animate-pulse" />

              <Link
                href="/login"
                className="relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-9 py-4.5 rounded-2xl text-base font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-2xl shadow-indigo-500/40 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <Zap className="w-5 h-5 text-amber-300 fill-amber-300 animate-bounce" />
                <span>Start Chatting Free</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
              </Link>
            </div>

            {/* Secondary Glass Action */}
            <a
              href="#how-it-works"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4.5 rounded-2xl text-base font-bold bg-white/95 dark:bg-zinc-900/90 backdrop-blur-xl hover:bg-slate-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-slate-300 dark:border-zinc-700/80 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 transition-all"
            >
              <span>Explore 3-Step Setup</span>
            </a>
          </motion.div>

          {/* Trust Metric Badges */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="mt-9 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-bold text-zinc-700 dark:text-zinc-300"
          >
            <span className="flex items-center gap-2 bg-white/90 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-slate-300/80 dark:border-zinc-700/60 shadow-xs">
              <Zap className="w-4 h-4 text-amber-500" /> &lt;50ms Latency
            </span>
            <span className="flex items-center gap-2 bg-white/90 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-slate-300/80 dark:border-zinc-700/60 shadow-xs">
              <Shield className="w-4 h-4 text-emerald-500" /> No Passwords
            </span>
            <span className="flex items-center gap-2 bg-white/90 dark:bg-zinc-800/80 px-3.5 py-1.5 rounded-xl border border-slate-300/80 dark:border-zinc-700/60 shadow-xs">
              <Activity className="w-4 h-4 text-blue-500" /> 100% Real-Time
            </span>
          </motion.div>
        </div>

        {/* Dedicated Separate Live Interactive Chat Mockup Component */}
        <HeroChatMockup />
      </div>
    </section>
  );
};
