"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  ShieldCheck,
  UserMinus,
  Sparkles,
  ArrowRight,
  Layers,
  Send,
  CheckCheck,
  UserPlus,
  Crown,
  Search,
  ArrowDown,
  Smile,
} from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export const FeatureDeepDive: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [reactionCount, setReactionCount] = useState<number>(4);

  const features = [
    {
      id: "direct",
      tabTitle: "Direct Messaging",
      icon: <MessageSquare className="w-4 h-4 shrink-0" />,
      title: "Seamless 1-on-1 Real-time Conversations",
      desc: "Start private conversations with any user by searching their phone number or name. Messages sync live with optimistic bubble feedback and double checkmarks.",
      highlights: [
        "Instant user discovery by name or phone",
        "Optimistic sending with instant delivery",
        "Live presence dot showing online status",
      ],
      previewBadge: "Direct Chat",
    },
    {
      id: "groups",
      tabTitle: "Group Channels",
      icon: <ThreeUsersIcon className="w-4 h-4 shrink-0" />,
      title: "Powerful Channels with Role Hierarchy",
      desc: "Create multi-participant rooms for teams and friend groups. Admins can promote members to Admin, remove members with modal confirmations, and rename groups dynamically.",
      highlights: [
        "Modal confirmation safety when removing members",
        "Multi-admin support with instant permission sync",
        "Live participant counters and group avatars",
      ],
      previewBadge: "Group Moderation",
    },
    {
      id: "architecture",
      tabTitle: "Smart UI & Sync",
      icon: <Layers className="w-4 h-4 shrink-0" />,
      title: "Smart Auto-Scroll & Category Filtering",
      desc: "Stay organized with 'All', 'Direct', and 'Groups' category chips in the sidebar. Smart auto-scroll preserves your scroll position when reading past messages.",
      highlights: [
        "Non-intrusive auto-scroll with floating button",
        "Chronological sorting from top to bottom",
        "One-click search filter with instant clear",
      ],
      previewBadge: "Smart Navigation",
    },
  ];

  const current = features[activeFeature];

  return (
    <section id="demo" className="py-24 bg-white/40 dark:bg-zinc-950/60 border-t border-slate-200/80 dark:border-zinc-800/80 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Feature Deep Dive
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-2 tracking-tight">
            Designed for speed, clarity, and control
          </h2>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 max-w-2xl mx-auto mb-12 shadow-sm overflow-x-auto">
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(index)}
              className={`flex-1 min-w-[120px] sm:min-w-0 flex items-center justify-center gap-1.5 sm:gap-2 h-11 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap shrink-0 sm:shrink ${
                activeFeature === index
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 font-bold"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-slate-100/50 dark:hover:bg-zinc-800/40"
              }`}
            >
              {f.icon}
              <span>{f.tabTitle}</span>
            </button>
          ))}
        </div>

        {/* Tab Content Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl mx-auto">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/50">
                  <Sparkles className="w-3.5 h-3.5" /> {current.previewBadge}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {current.title}
                </h3>
                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {current.desc}
                </p>

                <div className="space-y-2.5 pt-2">
                  {current.highlights.map((item) => (
                    <div key={item} className="flex items-center gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <div className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                        ✓
                      </div>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Visual Live Interactive Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              {/* 1. Direct Messaging Visual Mockup */}
              {activeFeature === 0 && (
                <motion.div
                  key="direct-mock"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-blue-50/30 dark:from-zinc-900/95 dark:via-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-2xl border border-blue-200/70 dark:border-zinc-800 shadow-[0_20px_50px_-15px_rgba(59,130,246,0.16)] dark:shadow-2xl overflow-hidden p-6 space-y-4"
                >
                  {/* Chat Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Avatar name="Tanvir Rahman" seedId="tanvir-lead" size="md" showOnlineDot isOnline />
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                          Tanvir Rahman
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
                            Verified
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          +880 1712-345678 • Online
                        </p>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                      ⚡ &lt;50ms Socket
                    </span>
                  </div>

                  {/* Messages Stream */}
                  <div className="space-y-3 py-2">
                    <div className="flex items-start gap-2">
                      <Avatar name="Tanvir Rahman" seedId="tanvir-lead" size="xs" />
                      <div className="p-3 rounded-2xl rounded-tl-xs bg-slate-100 dark:bg-zinc-800 text-xs text-zinc-800 dark:text-zinc-200 max-w-[80%] border border-slate-200/60 dark:border-zinc-700/50">
                        Hey! The real-time messaging latency is practically instantaneous 🚀
                        <span className="block text-[10px] text-zinc-400 mt-1 text-right">10:45 AM</span>
                      </div>
                    </div>

                    <div className="flex items-end justify-end gap-1.5">
                      <div className="p-3 rounded-2xl rounded-br-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-xs text-white max-w-[80%] shadow-md shadow-blue-500/20">
                        Confirmed! Optimistic UI state and checkmarks are syncing live across all clients.
                        <div className="flex items-center justify-end gap-1 text-[10px] text-blue-200 mt-1">
                          <span>10:46 AM</span>
                          <CheckCheck className="w-3.5 h-3.5 text-blue-200" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Quick Reactions Bar */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-200/70 dark:border-zinc-800 text-xs">
                    <span className="text-zinc-500 font-medium">Quick reaction:</span>
                    <div className="flex items-center gap-1.5">
                      {["👍", "🚀", "🔥", "❤️"].map((emoji, i) => (
                        <button
                          key={emoji}
                          onClick={() => setReactionCount((prev) => prev + 1)}
                          className="px-2 py-1 rounded-lg bg-slate-100 dark:bg-zinc-800 hover:bg-blue-50 dark:hover:bg-blue-950 text-sm hover:scale-110 active:scale-95 transition-all cursor-pointer"
                        >
                          {emoji}
                        </button>
                      ))}
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 ml-1">
                        +{reactionCount}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* 2. Group Moderation Visual Mockup */}
              {activeFeature === 1 && (
                <motion.div
                  key="group-mock"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-indigo-50/30 dark:from-zinc-900/95 dark:via-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-2xl border border-indigo-200/70 dark:border-zinc-800 shadow-[0_20px_50px_-15px_rgba(99,102,241,0.16)] dark:shadow-2xl overflow-hidden p-6 space-y-4"
                >
                  {/* Group Info Header */}
                  <div className="flex items-center justify-between pb-3.5 border-b border-slate-200/80 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                      <Avatar name="Engineering Core" isGroup size="md" />
                      <div>
                        <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-1.5">
                          Engineering Core
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400">
                            12 Members
                          </span>
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Multi-Admin Channel
                        </p>
                      </div>
                    </div>
                    <button className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-xs flex items-center gap-1">
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                  {/* Member Roles List */}
                  <div className="space-y-2.5 py-1">
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700/50">
                      <div className="flex items-center gap-2.5">
                        <Avatar name="You" seedId="you" size="sm" />
                        <div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">You (Creator)</span>
                          <span className="block text-[10px] text-zinc-400">+880 1800-000000</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                        <Crown className="w-3 h-3" /> Admin
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700/50">
                      <div className="flex items-center gap-2.5">
                        <Avatar name="Tanvir Rahman" seedId="tanvir-lead" size="sm" />
                        <div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Tanvir Rahman</span>
                          <span className="block text-[10px] text-zinc-400">+880 1712-345678</span>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                        Admin
                      </span>
                    </div>

                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700/50">
                      <div className="flex items-center gap-2.5">
                        <Avatar name="Sabbir Ahmed" seedId="sabbir-dev" size="sm" />
                        <div>
                          <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Sabbir Ahmed</span>
                          <span className="block text-[10px] text-zinc-400">+880 1911-223344</span>
                        </div>
                      </div>
                      <span className="text-[10px] font-semibold text-zinc-500">
                        Member
                      </span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40 text-[11px] text-indigo-800 dark:text-indigo-300 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
                    <span>Member removal protected with modal safeguard</span>
                  </div>
                </motion.div>
              )}

              {/* 3. Smart UI & Navigation Mockup */}
              {activeFeature === 2 && (
                <motion.div
                  key="ui-mock"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-violet-50/30 dark:from-zinc-900/95 dark:via-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-2xl border border-violet-200/70 dark:border-zinc-800 shadow-[0_20px_50px_-15px_rgba(139,92,246,0.16)] dark:shadow-2xl overflow-hidden p-6 space-y-4"
                >
                  {/* Category Chips Bar */}
                  <div className="flex items-center gap-2 pb-3 border-b border-slate-200/80 dark:border-zinc-800">
                    {[
                      { id: "all", label: "All", count: 14 },
                      { id: "direct", label: "Direct", count: 8 },
                      { id: "groups", label: "Groups", count: 6 },
                    ].map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                          activeCategory === cat.id
                            ? "bg-violet-600 text-white shadow-xs font-bold"
                            : "bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-slate-200 dark:hover:bg-zinc-700"
                        }`}
                      >
                        <span>{cat.label}</span>
                        <span
                          className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                            activeCategory === cat.id ? "bg-white/20" : "bg-slate-200 dark:bg-zinc-700"
                          }`}
                        >
                          {cat.count}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Search Input Preview */}
                  <div className="relative">
                    <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      readOnly
                      value="Tanvir"
                      className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-100/90 dark:bg-zinc-800/80 border border-slate-200/80 dark:border-zinc-700/60 text-xs text-zinc-800 dark:text-zinc-200 font-medium"
                    />
                  </div>

                  {/* Filtered Result Preview */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700/50 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar name="Tanvir Rahman" seedId="tanvir-lead" size="md" isOnline showOnlineDot />
                      <div>
                        <h5 className="text-xs font-bold text-zinc-900 dark:text-zinc-50">
                          Tanvir Rahman
                        </h5>
                        <p className="text-[11px] text-zinc-500 truncate max-w-[160px]">
                          Hey! The real-time messaging...
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] text-zinc-400 font-medium">Just now</span>
                  </div>

                  {/* Floating Auto-scroll indicator simulation */}
                  <div className="flex items-center justify-center pt-1">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-600 text-white text-xs font-bold shadow-lg shadow-blue-500/25 animate-bounce">
                      <ArrowDown className="w-3.5 h-3.5" />
                      <span>Scroll to Latest</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
