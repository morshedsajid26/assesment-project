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
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
        setMobileMenuOpen(false);
      }
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 dark:bg-zinc-950/85 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="#hero" onClick={(e) => handleScrollTo(e, "#hero")} className="flex items-center gap-2.5 group select-none">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
            <MessageSquare className="w-5 h-5" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
            ChatApp
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-2 p-1 rounded-full bg-slate-100/70 dark:bg-zinc-900/70 border border-slate-200/60 dark:border-zinc-800 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleScrollTo(e, link.href)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-blue-400 shadow-xs"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Actions (Theme Toggle + Auth CTAs) */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle className="bg-slate-100/80 dark:bg-zinc-800/80 backdrop-blur border border-slate-200/80 dark:border-zinc-700/60" />

          {isAuthenticated ? (
            <Link
              href="/chat"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-md shadow-blue-500/25 active:scale-95 transition-all group"
            >
              <span>Open Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 hover:from-blue-700 hover:via-indigo-700 hover:to-violet-700 text-white shadow-md shadow-blue-500/25 active:scale-95 transition-all group"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300 fill-amber-300" />
              <span>Start Chatting</span>
              <ArrowRight className="w-3.5 h-3.5 text-white/80 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
            className="md:hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl border-b border-slate-200 dark:border-zinc-800 px-4 pt-2 pb-6 space-y-4 shadow-xl"
          >
            <nav className="flex flex-col space-y-2 pt-2">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleScrollTo(e, link.href)}
                  className="px-3.5 py-2.5 rounded-xl text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-slate-100 dark:hover:bg-zinc-800"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-3 border-t border-slate-200/80 dark:border-zinc-800 flex flex-col gap-2.5">
              {isAuthenticated ? (
                <Link
                  href="/chat"
                  className="w-full text-center py-2.5 rounded-xl font-semibold bg-blue-600 text-white shadow-md"
                >
                  Open Dashboard
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md"
                >
                  <Zap className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Start Chatting</span>
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
