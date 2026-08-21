"use client";

import React from "react";
import { cn, getAvatarColor, getInitials } from "@/src/lib/utils";
import { Users } from "lucide-react";

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
    xs: "w-1.5 h-1.5 bottom-0 right-0",
    sm: "w-2 h-2 bottom-0 right-0",
    md: "w-2.5 h-2.5 bottom-0 right-0",
    lg: "w-3 h-3 bottom-0.5 right-0.5",
    xl: "w-3.5 h-3.5 bottom-1 right-1",
  };

  const bgStyle = isGroup
    ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
    : getAvatarColor(seedId || name);

  return (
    <div className={cn("relative inline-flex shrink-0 select-none", className)}>
      <div
        className={cn(
          "rounded-full flex items-center justify-center font-bold tracking-tight shadow-inner overflow-hidden",
          sizeStyles[size],
          bgStyle,
        )}
      >
        {isGroup ? (
          <Users className={cn("w-1/2 h-1/2", size === "xs" && "w-3 h-3")} />
        ) : (
          getInitials(name)
        )}
      </div>

      {showOnlineDot && !isGroup && (
        <span
          className={cn(
            "absolute rounded-full ring-2 ring-white dark:ring-zinc-950",
            dotSize[size],
            isOnline ? "bg-emerald-500" : "bg-zinc-400",
          )}
        />
      )}
    </div>
  );
};
