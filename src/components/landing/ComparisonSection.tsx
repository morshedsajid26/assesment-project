"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, X, Sparkles } from "lucide-react";

export const ComparisonSection: React.FC = () => {
  const rows = [
    {
      feature: "Message Latency",
      chatapp: "< 50ms Real-Time WebSockets",
      others: "Slow 5-10s Polling / Refresh",
      better: true,
    },
    {
      feature: "Onboarding Experience",
      chatapp: "Instant (Phone & Display Name)",
      others: "Complex passwords & email confirmations",
      better: true,
    },
    {
      feature: "Group Management",
      chatapp: "Multi-admin roles with modal safeguards",
      others: "Basic single owner & no safety modals",
      better: true,
    },
    {
      feature: "Theme Customization",
      chatapp: "Zero-flicker Light & Dark mode + custom scrollbars",
      others: "Generic static themes with invisible scrollbars",
      better: true,
    },
    {
      feature: "Client State Sync",
      chatapp: "Optimistic UI mutations & TanStack Cache",
      others: "Frequent full reloads on disconnect",
      better: true,
    },
  ];

  return (
    <section
      id="comparison"
      className="py-24 bg-white/40 dark:bg-zinc-950/50 border-t border-slate-200/80 dark:border-zinc-800/80 relative z-10 scroll-mt-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Built Different
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Why teams & friends choose ChatApp
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            See how our modern architecture compares to legacy messaging tools.
          </p>
        </div>

        {/* Comparison Table Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-blue-50/20 dark:from-zinc-900/90 dark:via-zinc-900/80 dark:to-zinc-950/50 backdrop-blur-2xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_20px_50px_-15px_rgba(59,130,246,0.1)] overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/80 dark:border-zinc-800 bg-slate-100/70 dark:bg-zinc-900/70">
                  <th className="py-5 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Core Capability
                  </th>
                  <th className="py-5 px-6 text-sm font-extrabold text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-950/30">
                    ⚡ ChatApp v2.0
                  </th>
                  <th className="py-5 px-6 text-xs font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                    Traditional Messengers
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200/60 dark:divide-zinc-800/60 text-sm">
                {rows.map((row, index) => (
                  <tr
                    key={row.feature}
                    className={
                      index % 2 === 0
                        ? "bg-transparent"
                        : "bg-slate-50/40 dark:bg-zinc-900/30"
                    }
                  >
                    <td className="py-4 px-6 font-bold text-zinc-900 dark:text-zinc-100">
                      {row.feature}
                    </td>
                    <td className="py-4 px-6 font-semibold text-zinc-900 dark:text-zinc-100 bg-blue-50/30 dark:bg-blue-950/20">
                      <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-2xs">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                        <span>{row.chatapp}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-zinc-500 dark:text-zinc-400">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-slate-200 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center shrink-0">
                          <X className="w-3.5 h-3.5" />
                        </div>
                        <span>{row.others}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
