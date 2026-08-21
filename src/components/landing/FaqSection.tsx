"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "Do I need a password or email to create an account?",
      a: "No! ChatApp is 100% passwordless. Simply enter your phone number and your display name. If your phone number is not registered yet, we automatically create your account in seconds.",
    },
    {
      q: "How fast is real-time message delivery?",
      a: "Messages are delivered in under 50ms using continuous bi-directional WebSocket connections (Socket.IO). Optimistic UI updates ensure your sent messages appear immediately without waiting.",
    },
    {
      q: "Can I create groups and assign multiple admins?",
      a: "Yes! Any group creator or admin can promote participants to Admin, remove members with secure in-app confirmation modals, and update channel names seamlessly.",
    },
    {
      q: "Does ChatApp support Dark & Light modes?",
      a: "Yes! ChatApp features an intelligent dual-theme engine. You can toggle between sleek dark mode and vibrant eye-catching light mode anytime with persistent preferences and zero screen flickering.",
    },
    {
      q: "Is my chat history and session preserved?",
      a: "Yes, your authentication session is secured via encrypted JWT cookies, and messages are synchronized with TanStack React Query for reliable background caching.",
    },
  ];

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-24 bg-white/40 dark:bg-zinc-950/50 border-t border-slate-200/80 dark:border-zinc-800/80 relative z-10 scroll-mt-20"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 mb-3">
            <HelpCircle className="w-3.5 h-3.5" /> Got Questions?
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Everything you need to know about ChatApp's features, speed, and
            security.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-2xl transition-all duration-300 ${
                  isOpen
                    ? "p-[1.5px] bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 shadow-xl shadow-indigo-500/15"
                    : "p-[1px] bg-slate-200/90 dark:bg-zinc-800 hover:bg-slate-300 dark:hover:bg-zinc-700 shadow-xs"
                }`}
              >
                <div
                  className={`w-full h-full rounded-[15px] backdrop-blur-xl transition-all duration-200 overflow-hidden ${
                    isOpen
                      ? "bg-white/95 dark:bg-zinc-900/95"
                      : "bg-white/90 dark:bg-zinc-900/90"
                  }`}
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full py-5 px-6 flex items-center justify-between text-left cursor-pointer gap-4"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`text-sm sm:text-base transition-colors ${
                        isOpen
                          ? "font-extrabold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent"
                          : "font-bold text-zinc-900 dark:text-zinc-100"
                      }`}
                    >
                      {faq.q}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/25"
                          : "bg-slate-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-slate-100 dark:border-zinc-800/80">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
