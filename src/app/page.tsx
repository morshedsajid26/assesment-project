"use client";

import React from "react";
import { LandingNavbar } from "@/src/components/landing/LandingNavbar";
import { HeroSection } from "@/src/components/landing/HeroSection";
import { StatsStrip } from "@/src/components/landing/StatsStrip";
import { BentoFeatures } from "@/src/components/landing/BentoFeatures";
import { HowItWorks } from "@/src/components/landing/HowItWorks";
import { FeatureDeepDive } from "@/src/components/landing/FeatureDeepDive";
import { TestimonialsSection } from "@/src/components/landing/TestimonialsSection";
import { FaqSection } from "@/src/components/landing/FaqSection";
import { CtaSection } from "@/src/components/landing/CtaSection";
import { LandingFooter } from "@/src/components/landing/LandingFooter";

export default function LandingPage() {
  return (
    <div
      className="min-h-screen w-full bg-slate-50/80 dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 overflow-x-hidden selection:bg-blue-600 selection:text-white relative"
      suppressHydrationWarning
    >
      {/* Dynamic Ambient Background Mesh for Light & Dark Mode */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.14),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.08),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2 w-full max-w-7xl h-[700px] bg-[radial-gradient(ellipse_60%_50%_at_50%_50%,rgba(99,102,241,0.09),rgba(255,255,255,0))] dark:bg-transparent pointer-events-none" />
      <div className="absolute top-[50%] right-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(236,72,153,0.06),rgba(255,255,255,0))] dark:bg-transparent pointer-events-none" />
      <div className="absolute top-[75%] left-0 w-[500px] h-[500px] bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.06),rgba(255,255,255,0))] dark:bg-transparent pointer-events-none" />

      {/* Sticky Navbar */}
      <LandingNavbar />

      {/* 1. Hero Section with Interactive Mockup */}
      <HeroSection />

      {/* 2. Key Performance Stats Strip */}
      <StatsStrip />

      {/* 3. Bento Grid Core Features */}
      <BentoFeatures />

      {/* 4. How It Works (3 Simple Steps) */}
      <HowItWorks />

      {/* 5. Interactive Feature Deep Dive */}
      <FeatureDeepDive />

      {/* 6. Community Testimonials / Social Proof */}
      <TestimonialsSection />

      {/* 7. Frequently Asked Questions (FAQ Accordion) */}
      <FaqSection />

      {/* 8. Final Call to Action */}
      <CtaSection />

      {/* 9. Minimal Footer */}
      <LandingFooter />
    </div>
  );
}
