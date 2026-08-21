"use client";

import React from "react";
import { motion } from "framer-motion";
import { Layers, Cpu, Shield, Zap, RefreshCw, Smartphone } from "lucide-react";

export const TechStack: React.FC = () => {
  const stack = [
    {
      name: "Next.js 16 (Turbopack)",
      desc: "Fast server component rendering & routing",
      badge: "App Router",
    },
    {
      name: "React 19 & TypeScript",
      desc: "Strict type safety with modern hooks",
      badge: "v19.2",
    },
    {
      name: "Socket.IO Engine",
      desc: "Sub-50ms real-time event streaming",
      badge: "WebSocket",
    },
    {
      name: "TanStack React Query v5",
      desc: "Optimistic mutations & background refetch",
      badge: "Cache State",
    },
    {
      name: "Tailwind CSS v4",
      desc: "Class-based dark/light dynamic theming",
      badge: "Design Tokens",
    },
    {
      name: "Framer Motion",
      desc: "Fluid spring animations and micro-effects",
      badge: "Motion",
    },
  ];

  return (
    <section id="tech" className="py-20 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            Architecture
          </span>
          <h2 className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-1">
            Engineered with modern technologies
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {stack.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="p-5 rounded-2xl bg-white/80 dark:bg-zinc-900/70 backdrop-blur-md border border-slate-200/80 dark:border-zinc-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-600/60 transition-colors"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-zinc-900 dark:text-zinc-100">
                  {item.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                  {item.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
