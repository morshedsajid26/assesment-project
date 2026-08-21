"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Star, Sparkles } from "lucide-react";
import { Avatar } from "@/src/components/ui/Avatar";

export const TestimonialsSection: React.FC = () => {
  const reviews = [
    {
      id: 1,
      name: "Tanvir Mahmud",
      role: "Product Lead @ TechFlow",
      avatarSeed: "tanvir-lead",
      comment:
        "The WebSocket latency is mind-blowing. Messages arrive before I even take my finger off the send button. Instant phone onboarding is effortless.",
    },
    {
      id: 2,
      name: "Anika Tabassum",
      role: "Community Director",
      avatarSeed: "anika-manager",
      comment:
        "Managing our team groups has never been this smooth. Promoting multiple admins and having safety confirmation modals prevents accidental mistakes.",
    },
    {
      id: 3,
      name: "Sabbir Ahmed",
      role: "Senior Full-Stack Engineer",
      avatarSeed: "sabbir-dev",
      comment:
        "The UI detail is exceptional. The dual theming, eye-catchy light mode, custom scrollbars, and smart auto-scroll make this feel like an Apple product.",
    },
    {
      id: 4,
      name: "Nusrat Jahan",
      role: "UI/UX Designer @ PixelStudio",
      avatarSeed: "nusrat-design",
      comment:
        "As a designer, I'm blown away by the micro-animations and typography. The ambient gradients in light mode create an incredible experience.",
    },
    {
      id: 5,
      name: "Farhan Kabir",
      role: "DevOps & Cloud Architect",
      avatarSeed: "farhan-cloud",
      comment:
        "Real-time event synchronization over Socket.IO without memory leaks or reconnection glitches is rare. The connection is rock solid.",
    },
    {
      id: 6,
      name: "Mahin Hossain",
      role: "Startup Founder",
      avatarSeed: "mahin-founder",
      comment:
        "We switched our internal collaboration to ChatApp because of how lightning-fast it is. No bloated feature noise, just pure instant messaging.",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <section id="testimonials" className="py-24 relative z-10 scroll-mt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-blue-50 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800/60 shadow-xs mb-3">
            <Sparkles className="w-3.5 h-3.5" /> Community Love
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Loved by fast-moving teams & creators
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400">
            Real stories from teams using ChatApp for instant everyday communication.
          </p>
        </div>

        {/* React Slick Slider */}
        <div className="testimonial-slider px-2">
          <Slider {...settings}>
            {reviews.map((review) => (
              <div key={review.id} className="p-3">
                <div className="p-7 sm:p-8 rounded-3xl bg-gradient-to-br from-white via-slate-50/95 to-blue-50/30 dark:from-zinc-900/95 dark:via-zinc-900/80 dark:to-zinc-950/60 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-[0_15px_35px_-10px_rgba(59,130,246,0.1)] dark:shadow-xl flex flex-col justify-between h-[280px]">
                  <div>
                    {/* 5 Stars */}
                    <div className="flex items-center gap-1 mb-4 text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>

                    {/* Review text */}
                    <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed line-clamp-4 italic">
                      "{review.comment}"
                    </p>
                  </div>

                  {/* Profile */}
                  <div className="pt-4 border-t border-slate-200/60 dark:border-zinc-800/80 flex items-center gap-3">
                    <Avatar name={review.name} seedId={review.avatarSeed} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-50">
                        {review.name}
                      </h4>
                      <p className="text-xs text-blue-600 dark:text-blue-400">
                        {review.role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};
