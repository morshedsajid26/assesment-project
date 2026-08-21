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
} from "lucide-react";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export const FeatureDeepDive: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<number>(0);

  const features = [
    {
      id: "direct",
      tabTitle: "Direct Messaging",
      icon: <MessageSquare className="w-4 h-4 shrink-0" />,
      title: "Seamless 1-on-1 Real-time Conversations",
      desc: "Start private conversations with any user by searching their phone number or name. Messages sync live with optimistic bubble feedback and double checkmarks.",
      highlights: [
        "Instant user discovery by name or phone",
        "Optimistic sending with retry indicators",
        "Live presence dot showing online status",
      ],
      previewBadge: "Direct Chat",
      color: "from-blue-600 to-cyan-500",
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
      color: "from-indigo-600 to-purple-600",
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
      color: "from-violet-600 to-pink-500",
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
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/90 dark:bg-zinc-900/80 backdrop-blur-md border border-slate-200/90 dark:border-zinc-800 max-w-2xl mx-auto mb-12 shadow-sm">
          {features.map((f, index) => (
            <button
              key={f.id}
              onClick={() => setActiveFeature(index)}
              className={`flex-1 flex items-center justify-center gap-2 h-11 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
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
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
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

          {/* Right Visual Card */}
          <div className="lg:col-span-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-blue-50/30 dark:from-zinc-900/95 dark:to-zinc-900/80 backdrop-blur-2xl border border-blue-200/60 dark:border-zinc-800 shadow-[0_20px_50px_-10px_rgba(59,130,246,0.14)] dark:shadow-2xl space-y-4"
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-zinc-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                      Feature Spotlight
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
                    Live Component
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-100/80 dark:bg-zinc-800/60 border border-slate-200/60 dark:border-zinc-700/50 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                      {current.tabTitle}
                    </span>
                    <span className="text-[11px] text-zinc-500">Connected</span>
                  </div>
                  <div className="w-full bg-slate-200/70 dark:bg-zinc-700/50 h-2 rounded-full overflow-hidden">
                    <div className={`h-full w-4/5 bg-gradient-to-r ${current.color} rounded-full animate-pulse`} />
                  </div>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Active bi-directional socket listener and automatic cache re-validation.
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
