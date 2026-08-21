import React from "react";
import Link from "next/link";

interface BrandLogoProps {
  href?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  showText?: boolean;
  textColor?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  href = "/",
  size = "md",
  className = "",
  onClick,
  showText = true,
  textColor,
}) => {
  const sizeMap = {
    sm: {
      box: "w-8 h-8 rounded-xl",
      icon: "w-4 h-4",
      text: "text-lg",
    },
    md: {
      box: "w-10 h-10 rounded-2xl",
      icon: "w-5 h-5",
      text: "text-xl",
    },
    lg: {
      box: "w-12 h-12 rounded-2xl",
      icon: "w-6 h-6",
      text: "text-2xl",
    },
    xl: {
      box: "w-16 h-16 rounded-[22px]",
      icon: "w-8 h-8",
      text: "text-3xl",
    },
  };

  const current = sizeMap[size];

  const content = (
    <div className={`flex items-center gap-3 select-none group ${className}`}>
      {/* Gradient Squircle Icon */}
      <div
        className={`${current.box} bg-gradient-to-br from-blue-500 via-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 active:scale-95 transition-transform duration-200 shrink-0`}
      >
        <svg
          className={`${current.icon} text-white`}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 14a3 3 0 0 1-3 3H7l-4 4V6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8z" />
        </svg>
      </div>

      {/* Brand Text */}
      {showText && (
        <span
          className={`font-extrabold ${current.text} tracking-tight ${
            textColor || "text-zinc-900 dark:text-white"
          }`}
        >
          ChatApp
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className="inline-flex items-center cursor-pointer">
        {content}
      </Link>
    );
  }

  return content;
};
