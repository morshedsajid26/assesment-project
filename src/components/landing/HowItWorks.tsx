"use client";

import React from "react";
import { motion } from "framer-motion";
import { Phone, Users, Zap, ArrowRight, ShieldCheck } from "lucide-react";

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      number: "01",
      icon: <Phone className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
      bg: "bg-blue-50 dark:bg-blue-950/50 border-blue-200/60 dark:border-blue-800/50",
      title: "One-Click Onboarding",
      desc: "Enter your phone number and display name. No complex passwords or email confirmations needed.",
      badge: "Instant Access",
    },
    {
      number: "02",
      icon: <Users className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />,
      bg: "bg-indigo-50 dark:bg-indigo-950/50 border-indigo-200/60 dark:border-indigo-800/50",
      title: "Discover or Create Groups",
      desc: "Search registered users instantly or create multi-user group channels with custom names and avatars.",
      badge: "Channels & 1-on-1",
    },
    {
      number: "03",
      icon: <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
      bg: "bg-amber-50 dark:bg-amber-950/50 border-amber-200/60 dark:border-amber-800/50",
      title: "Chat in Real-Time",
      desc: "Experience sub-50ms message delivery, live presence indicators, and seamless auto-scroll history.",
      badge: "<50ms WebSockets",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 relative z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 tracking-wider uppercase">
            Simple 3-Step Workflow
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 mt-2 tracking-tight">
            How ChatApp Works
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Get up and running in less than 10 seconds. Built for zero friction
            and ultimate speed.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50/90 to-blue-50/20 dark:from-zinc-900/90 dark:via-zinc-900/70 dark:to-zinc-950/40 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_15px_35px_-10px_rgba(59,130,246,0.08)] dark:shadow-xl flex flex-col justify-between group hover:-translate-y-1 hover:border-blue-300 dark:hover:border-zinc-700 transition-all"
            >
              {/* Top Step Pill & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${step.bg} shadow-xs group-hover:scale-105 transition-transform`}
                  >
                    {step.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-200 dark:text-zinc-800 font-mono tracking-tighter">
                    {step.number}
                  </span>
                </div>

                <div className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-blue-100/70 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 mb-3 border border-blue-200/50 dark:border-blue-800/40">
                  {step.badge}
                </div>

                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                  {step.title}
                </h3>

                <p className="mt-2.5 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {/* Progress Connector */}
              <div className="mt-6 pt-4 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center gap-1 text-xs font-semibold text-blue-600 dark:text-blue-400">
                <span>Step {index + 1} of 3</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
