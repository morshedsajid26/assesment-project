"use client";

import React from "react";
import { cn, getAvatarColor, getInitials } from "@/src/lib/utils";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export interface AvatarProps {
  name?: string;
  seedId?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  isGroup?: boolean;
  isOnline?: boolean;
  showOnlineDot?: boolean;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  name,
  seedId,
  size = "md",
  isGroup = false,
  isOnline,
  showOnlineDot = false,
  className,
}) => {
  const sizeStyles = {
    xs: "w-6 h-6 text-[10px]",
    sm: "w-8 h-8 text-xs",
    md: "w-10 h-10 text-sm",
    lg: "w-12 h-12 text-base",
    xl: "w-16 h-16 text-xl",
  };

  const dotSize = {
    xs: "w-2 h-2 bottom-0 right-0",
    sm: "w-2.5 h-2.5 bottom-0 right-0",
    md: "w-3 h-3 bottom-0 right-0",
    lg: "w-3.5 h-3.5 bottom-0.5 right-0.5",
    xl: "w-4 h-4 bottom-1 right-1",
  };

  const bgStyle = isGroup
    ? "bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 text-white shadow-sm shadow-indigo-500/25"
    : getAvatarColor(seedId || name);

  return (
    <div className={cn("relative inline-flex shrink-0 select-none", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold tracking-tight overflow-hidden ring-1 ring-black/5 dark:ring-white/10 transition-transform",
          sizeStyles[size],
          bgStyle,
        )}
      >
        {isGroup ? (
          <ThreeUsersIcon className={cn("w-1/2 h-1/2 text-white", size === "xs" && "w-3 h-3")} />
        ) : (
          getInitials(name)
        )}
      </div>

      {showOnlineDot && !isGroup && (
        <span
          className={cn(
            "absolute rounded-full ring-2 ring-white dark:ring-zinc-900 transition-colors",
            dotSize[size],
            isOnline
              ? "bg-emerald-500 shadow-xs shadow-emerald-500/50"
              : "bg-zinc-400 dark:bg-zinc-600",
          )}
        />
      )}
    </div>
  );
};
