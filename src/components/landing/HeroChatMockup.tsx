"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCheck,
  Smile,
  Info,
  User,
  Heart,
  Lock,
  Zap,
  Radio,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export const HeroChatMockup: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"direct" | "group">("group");
  const [typing, setTyping] = useState<boolean>(true);
  const [floatingLikes, setFloatingLikes] = useState<{ id: number; x: number }[]>([]);

  // Simulate typing indicator before last message appears
  useEffect(() => {
    setTyping(true);
    const timer = setTimeout(() => {
      setTyping(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const addFloatingReaction = () => {
    const newLike = { id: Date.now(), x: Math.random() * 60 - 30 };
    setFloatingLikes((prev) => [...prev, newLike]);
    setTimeout(() => {
      setFloatingLikes((prev) => prev.filter((item) => item.id !== newLike.id));
    }, 1500);
  };

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
      text: "Hey! Did you check out the new dual-theming & custom scrollbar enhancements?",
      time: "11:15 AM",
      isMe: false,
    },
    {
      id: 2,
      sender: "You",
      text: "Yes! High-contrast and fluid spring animations feel ultra-smooth now.",
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
    <div className="mt-16 lg:mt-24 relative max-w-5xl mx-auto">
      {/* Heavy Animated Orbiting Glow Ring */}
      <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-[34px] blur-2xl opacity-40 dark:opacity-30 animate-pulse pointer-events-none" />

      {/* Floating Badge 1: Top Left Active Socket Pulse */}
      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [0, -1, 0],
        }}
        transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        className="hidden sm:flex absolute -top-7 -left-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.2)] select-none"
      >
        <span className="flex h-2.5 w-2.5 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div>
          <p className="text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100">
            WebSocket Live: <span className="text-emerald-600 dark:text-emerald-400">&lt;24ms</span>
          </p>
          <p className="text-[9px] font-medium text-zinc-500">Bi-directional event broadcast</p>
        </div>
      </motion.div>

      {/* Floating Badge 2: Top Right Live Action Notice */}
      <motion.div
        animate={{
          y: [0, 10, 0],
          rotate: [0, 1, 0],
        }}
        transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.8 }}
        className="hidden sm:flex absolute -top-7 -right-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-indigo-500/40 shadow-[0_10px_30px_rgba(99,102,241,0.2)] select-none"
      >
        <div className="w-6 h-6 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-xs font-extrabold">
          👑
        </div>
        <div>
          <p className="text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100">
            Multi-Admin Hierarchy
          </p>
          <p className="text-[9px] font-medium text-zinc-500">Instant role synchronization</p>
        </div>
      </motion.div>

      {/* Floating Badge 3: Bottom Right Secure Session */}
      <motion.div
        animate={{
          y: [0, 8, 0],
          rotate: [0, -1, 0],
        }}
        transition={{ repeat: Infinity, duration: 4.5, ease: "easeInOut", delay: 1.5 }}
        className="hidden sm:flex absolute -bottom-7 -right-6 z-30 items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border border-blue-500/40 shadow-[0_10px_30px_rgba(59,130,246,0.2)] select-none"
      >
        <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center text-xs font-bold">
          <Lock className="w-3.5 h-3.5" />
        </div>
        <div>
          <p className="text-[11px] font-extrabold text-zinc-900 dark:text-zinc-100">Encrypted JWT Session</p>
          <p className="text-[9px] text-zinc-500">Double-check delivery</p>
        </div>
      </motion.div>

      {/* Floating Heart / Like Reactions Container */}
      <div className="absolute right-8 bottom-24 z-30 pointer-events-none">
        <AnimatePresence>
          {floatingLikes.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 1, y: 0, scale: 0.5, x: item.x }}
              animate={{ opacity: 0, y: -90, scale: 1.4 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute text-rose-500 drop-shadow-lg"
            >
              <Heart className="w-7 h-7 fill-rose-500" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Main Mockup Glass Frame */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.25, type: "spring", damping: 20 }}
        className="relative rounded-[30px] bg-white/95 dark:bg-zinc-900/90 backdrop-blur-3xl border border-white/90 dark:border-zinc-800 shadow-[0_30px_90px_-20px_rgba(59,130,246,0.25)] dark:shadow-[0_30px_90px_-20px_rgba(0,0,0,0.8)] overflow-hidden"
      >
        {/* Mockup Window Titlebar */}
        <div className="px-4 sm:px-6 py-4 bg-slate-100/95 dark:bg-zinc-950/85 border-b border-slate-200/80 dark:border-zinc-800/80 flex flex-wrap gap-2 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block shadow-xs" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block shadow-xs" />
            <span className="text-[11px] sm:text-xs font-extrabold text-zinc-500 ml-2 hidden sm:inline-block">
              ChatApp Live Interactive Studio
            </span>
          </div>

          {/* Mockup Active Channel Switcher */}
          <div className="flex items-center gap-1 bg-slate-200/80 dark:bg-zinc-800/90 p-1 rounded-xl border border-slate-300/80 dark:border-zinc-700/80">
            <button
              onClick={() => setActiveTab("group")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "group"
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-zinc-700/60"
              }`}
            >
              <ThreeUsersIcon className="w-3.5 h-3.5" />
              <span>Dev Team</span>
            </button>
            <button
              onClick={() => setActiveTab("direct")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeTab === "direct"
                  ? "bg-blue-600 text-white shadow-md font-bold"
                  : "text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white hover:bg-slate-300/60 dark:hover:bg-zinc-700/60"
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Tanvir</span>
            </button>
          </div>
        </div>

        {/* Mockup Chat Body */}
        <div className="p-6 md:p-8 bg-gradient-to-br from-slate-50/90 via-sky-50/30 to-indigo-50/20 dark:from-zinc-950 dark:via-zinc-900/90 dark:to-zinc-950 min-h-[390px] flex flex-col justify-between">
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
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                      Group Channel
                    </span>
                  )}
                </h4>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  {activeTab === "group" ? "12 members • 8 active now" : "Active Now • +880 1712..."}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={addFloatingReaction}
                className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:scale-110 active:scale-95 transition-all cursor-pointer shadow-xs"
                title="Send instant reaction"
              >
                <Heart className="w-4 h-4 fill-rose-500" />
              </button>
              <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 text-zinc-500">
                <Info className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Animated Message Bubbles with Dynamic Transitions */}
          <div className="space-y-4 my-6">
            <AnimatePresence mode="popLayout">
              {messages.slice(0, typing ? 2 : 3).map((msg, i) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20, scale: 0.94 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.4, delay: i * 0.1, type: "spring", damping: 18 }}
                  className={`flex items-end gap-2.5 ${msg.isMe ? "justify-end" : "justify-start"}`}
                >
                  {!msg.isMe && (
                    <Avatar name={msg.sender} seedId={msg.sender} size="xs" />
                  )}

                  <div
                    className={`max-w-[80%] md:max-w-[65%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                      msg.isMe
                        ? "bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white rounded-br-xs shadow-lg shadow-blue-500/25"
                        : "bg-white/95 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-slate-200/90 dark:border-zinc-700/60 rounded-bl-xs shadow-sm"
                    }`}
                  >
                    {!msg.isMe && (
                      <p className="text-[11px] font-extrabold text-blue-600 dark:text-blue-400 mb-1">
                        {msg.sender}
                      </p>
                    )}
                    <p className="font-medium">{msg.text}</p>
                    <div
                      className={`flex items-center justify-end gap-1 mt-1.5 text-[10px] ${
                        msg.isMe ? "text-blue-100" : "text-zinc-400"
                      }`}
                    >
                      <span>{msg.time}</span>
                      {msg.isMe && <CheckCheck className="w-3.5 h-3.5 text-blue-200" />}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Animated Typing Dots Indicator */}
            {typing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="flex items-center gap-2"
              >
                <Avatar name="Tanvir Rahman" seedId="tanvir-lead" size="xs" />
                <div className="px-3.5 py-2 rounded-2xl bg-white/90 dark:bg-zinc-800 border border-slate-200/80 dark:border-zinc-700/60 shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                  <span className="text-[10px] text-zinc-400 ml-1">typing...</span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Mockup Input Box */}
          <div className="pt-3 border-t border-slate-200/70 dark:border-zinc-800/80 flex items-center gap-2">
            <div className="flex-1 flex items-center bg-white/90 dark:bg-zinc-800/80 rounded-2xl border border-slate-200/90 dark:border-zinc-700/60 px-4 py-2.5 text-xs text-zinc-400">
              <span className="flex-1">Type a message...</span>
              <Smile className="w-4 h-4 text-zinc-400 hover:text-zinc-600 cursor-pointer" />
            </div>
            <button
              onClick={addFloatingReaction}
              className="w-10 h-10 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
