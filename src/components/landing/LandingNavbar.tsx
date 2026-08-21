"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, ArrowRight, Menu, X, Sparkles, Zap } from "lucide-react";
import { ThemeToggle } from "@/src/components/ui/ThemeToggle";
import { useAuthContext } from "@/src/context/AuthContext";

export const LandingNavbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthContext();

  const navLinks = [
    { label: "Overview", href: "#hero" },
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = [
        "hero",
        "features",
        "how-it-works",
        "demo",
        "testimonials",
        "faq",
        "get-started",
      ];
      const scrollPos = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      setMobileMenuOpen(false);

      if (targetElement) {
        setTimeout(() => {
          const headerOffset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }, 100);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled || mobileMenuOpen
          ? "bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="#hero"
          onClick={(e) => handleScrollTo(e, "#hero")}
          className="flex items-center gap-2.5 group select-none shrink-0"
        >
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
            ChatApp
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-slate-100/70 dark:bg-zinc-900/70 border border-slate-200/60 dark:border-zinc-800 backdrop-blur-md shrink-0">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs font-bold"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions (Theme Toggle + Auth CTAs) */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          <ThemeToggle className="bg-slate-100/80 dark:bg-zinc-800/80 backdrop-blur border border-slate-200/80 dark:border-zinc-700/60" />

          {isAuthenticated ? (
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-md shadow-blue-500/25 active:scale-95 transition-all group whitespace-nowrap"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-md shadow-blue-500/25 active:scale-95 transition-all group whitespace-nowrap"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Start Chatting</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile / Tablet Hamburger Button */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2.5 rounded-xl text-zinc-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800 active:scale-95 transition-transform cursor-pointer touch-manipulation"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 px-5 pt-3 pb-7 space-y-4 shadow-2xl relative z-50 pointer-events-auto"
          >
            <nav className="flex flex-col space-y-1 pt-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleScrollTo(e, link.href)}
                    className={`px-4 py-3 rounded-xl text-sm font-semibold transition-all cursor-pointer block w-full touch-manipulation ${
                      isActive
                        ? "bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-900 active:bg-slate-200 dark:active:bg-zinc-800"
                    }`}
                  >
                    {link.label}
                  </a>
                );
              })}
            </nav>

            <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <Link
                  href="/chat"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center py-3 rounded-xl font-bold bg-blue-600 text-white shadow-md active:scale-[0.98] transition-transform"
                >
                  Open Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white shadow-md active:scale-[0.98] transition-transform"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Start Chatting Now</span>
                  <ArrowRight className="w-4 h-4 text-white/80" />
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
