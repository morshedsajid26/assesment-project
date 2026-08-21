"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  Zap,
  Shield,
  Send,
  CheckCheck,
  Smile,
  Phone,
  Info,
  User,
} from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export const HeroSection: React.FC = () => {
  // Simulated interactive chat animation state
  const [activeTab, setActiveTab] = useState<"direct" | "group">("group");

  const groupMessages = [
    {
      id: 1,
      sender: "Tanvir Rahman",
      text: "Hey team! Just pushed the real-time WebSocket messaging updates 🚀",
      time: "10:42 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Awesome! Sub-50ms latency is incredible. All socket channels are syncing seamlessly.",
      time: "10:43 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Sabbir Ahmed",
      text: "Group admin promotion and member management are working perfectly too! 🎉",
      time: "10:44 AM",
      isMe: false,
    },
  ];

  const directMessages = [
    {
      id: 1,
      sender: "Tanvir Rahman",
      text: "Hey, did you check out the new dark mode & scrollbar improvements?",
      time: "11:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Yes! Contrast looks super sharp and eye-catching now.",
      time: "11:16 AM",
      isMe: true,
    },
    {
      id: 3,
      sender: "Tanvir Rahman",
      text: "Great! Let's get everything deployed to production. 🚀",
      time: "11:17 AM",
      isMe: false,
    },
  ];

  const messages = activeTab === "group" ? groupMessages : directMessages;

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden scroll-mt-20">
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-blue-500/25 via-indigo-500/20 to-purple-500/15 dark:from-blue-600/10 dark:via-indigo-600/10 dark:to-purple-600/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[420px] h-[420px] bg-cyan-400/20 dark:bg-cyan-600/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute top-1/2 left-10 w-[420px] h-[420px] bg-violet-400/20 dark:bg-violet-600/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Announcement Pill Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 dark:bg-zinc-800/80 backdrop-blur-md border border-blue-200/60 dark:border-zinc-700/80 shadow-md shadow-blue-500/10 mb-8"
          >
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              ⚡ Powered by Real-Time WebSockets & Next.js 16
            </span>
            <span className="text-xs text-blue-600 dark:text-blue-400 font-bold ml-1 flex items-center gap-0.5">
              Explore <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.1]"
          >
            Instant Conversations. <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Limitless Connections.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-6 text-base sm:text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed"
          >
            Experience ultra-fast, zero-friction real-time messaging with instant
            passwordless sign-in, private direct rooms, and group collaboration channels.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all"
            >
              <Sparkles className="w-5 h-5 text-blue-200" />
              <span>Start Chatting Free</span>
              <ArrowRight className="w-5 h-5" />
            </Link>

            <a
              href="#demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-base font-semibold bg-white/80 dark:bg-zinc-800/80 backdrop-blur-md hover:bg-slate-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-slate-200/90 dark:border-zinc-700/80 shadow-sm hover:shadow transition-all"
            >
              <span>See How It Works</span>
            </a>
          </motion.div>

          {/* Trust Highlights */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-8 flex items-center justify-center gap-6 text-xs text-zinc-500 dark:text-zinc-400 font-medium"
          >
            <span className="flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-amber-500" /> No password required
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-emerald-500" /> Real-time socket sync
            </span>
          </motion.div>
        </div>

        {/* ============================================================ */}
        {/* Interactive Floating Chat App Mockup Showcase */}
        {/* ============================================================ */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          className="mt-16 lg:mt-24 relative max-w-5xl mx-auto"
        >
          {/* Decorative Glow Ring behind mockup */}
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-[32px] blur-xl opacity-30 dark:opacity-20 animate-pulse pointer-events-none" />

          <div className="relative rounded-[28px] bg-white/95 dark:bg-zinc-900/90 backdrop-blur-2xl border border-white/90 dark:border-zinc-800 shadow-[0_25px_70px_-15px_rgba(59,130,246,0.16)] dark:shadow-2xl overflow-hidden">
            {/* Mockup Window Titlebar */}
            <div className="px-6 py-4 bg-slate-100/90 dark:bg-zinc-950/80 border-b border-slate-200/80 dark:border-zinc-800/80 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-semibold text-zinc-500 ml-3">
                  ChatApp Live Preview • v2.0
                </span>
              </div>

              {/* Mockup Active Channel Switcher */}
              <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-zinc-800/90 p-1 rounded-xl border border-slate-300/80 dark:border-zinc-700/80">
                <button
                  onClick={() => setActiveTab("group")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "group"
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-zinc-700/60"
                  }`}
                >
                  <ThreeUsersIcon className="w-3.5 h-3.5" />
                  <span>Dev Team Group</span>
                </button>
                <button
                  onClick={() => setActiveTab("direct")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                    activeTab === "direct"
                      ? "bg-blue-600 text-white shadow-xs font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-zinc-700/60"
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Tanvir (Direct)</span>
                </button>
              </div>
            </div>

            {/* Mockup Chat Body */}
            <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50/90 via-sky-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-zinc-900/90 dark:to-zinc-950 min-h-[380px] flex flex-col justify-between">
              {/* Header inside mockup */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200/70 dark:border-zinc-800/80">
                <div className="flex items-center gap-3">
                  <Avatar
                    name={activeTab === "group" ? "Engineering Core" : "Tanvir Rahman"}
                    isGroup={activeTab === "group"}
                    size="md"
                    showOnlineDot={activeTab === "direct"}
                    isOnline
                  />
                  <div>
                    <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                      {activeTab === "group" ? "Engineering Core" : "Tanvir Rahman"}
                      {activeTab === "group" && (
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                          Group
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {activeTab === "group" ? "12 members • 8 online" : "Online • +88017..."}
                    </p>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-white/80 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-zinc-500">
                  <Info className="w-4 h-4" />
                </div>
              </div>

              {/* Animated Message Bubbles */}
              <div className="space-y-4 my-6">
                {messages.map((msg, i) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + i * 0.15 }}
                    className={`flex items-end gap-2.5 ${msg.isMe ? "justify-end" : "justify-start"}`}
                  >
                    {!msg.isMe && (
                      <Avatar name={msg.sender} seedId={msg.sender} size="xs" />
                    )}

                    <div
                      className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                        msg.isMe
                          ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-br-xs shadow-md shadow-blue-500/20"
                          : "bg-white/95 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-slate-200/90 dark:border-zinc-700/60 rounded-bl-xs shadow-sm"
                      }`}
                    >
                      {!msg.isMe && (
                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">
                          {msg.sender}
                        </p>
                      )}
                      <p>{msg.text}</p>
                      <div
                        className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${
                          msg.isMe ? "text-blue-100" : "text-zinc-400"
                        }`}
                      >
                        <span>{msg.time}</span>
                        {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mockup Input Box */}
              <div className="pt-3 border-t border-slate-200/70 dark:border-zinc-800/80 flex items-center gap-2">
                <div className="flex-1 flex items-center bg-white/90 dark:bg-zinc-800/80 rounded-2xl border border-slate-200/90 dark:border-zinc-700/60 px-4 py-2.5 text-xs text-zinc-400">
                  <span className="flex-1">Type a message...</span>
                  <Smile className="w-4 h-4 text-zinc-400 hover:text-zinc-600" />
                </div>
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30">
                  <Send className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
