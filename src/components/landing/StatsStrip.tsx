"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Clock, Users } from "lucide-react";

export const StatsStrip: React.FC = () => {
  const stats = [
    {
      icon: <Zap className="w-5 h-5 text-amber-500" />,
      bg: "bg-amber-50 dark:bg-amber-950/40 border border-amber-200/60 dark:border-amber-800/40",
      value: "< 50ms",
      label: "Real-Time WebSocket Latency",
      desc: "Instant bi-directional socket broadcast",
    },
    {
      icon: <Users className="w-5 h-5 text-indigo-500" />,
      bg: "bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/60 dark:border-indigo-800/40",
      value: "Unlimited",
      label: "Group Chat Participants",
      desc: "Dynamic admin roles & moderation",
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-emerald-500" />,
      bg: "bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/60 dark:border-emerald-800/40",
      value: "Zero",
      label: "Password Hassle",
      desc: "Instant phone & name authentication",
    },
    {
      icon: <Clock className="w-5 h-5 text-blue-500" />,
      bg: "bg-blue-50 dark:bg-blue-950/40 border border-blue-200/60 dark:border-blue-800/40",
      value: "99.99%",
      label: "Socket Uptime & Sync",
      desc: "Optimistic updates & background cache",
    },
  ];

  return (
    <section className="py-12 border-y border-slate-200/80 dark:border-zinc-800/80 bg-white/40 dark:bg-zinc-950/50 backdrop-blur-sm relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-white/90 dark:bg-zinc-900/60 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800/70 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-zinc-700 hover:-translate-y-0.5 transition-all"
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${stat.bg}`}
              >
                {stat.icon}
              </div>
              <div className="text-2xl lg:text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs font-bold text-zinc-700 dark:text-zinc-300 mt-1">
                {stat.label}
              </div>
              <div className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
