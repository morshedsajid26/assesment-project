"use client";

import React, { HTMLAttributes } from "react";
import { cn } from "@/src/lib/utils";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "circular" | "rounded";
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = "default",
  className,
  ...props
}) => {
  const variantStyles = {
    default: "rounded-lg",
    circular: "rounded-full",
    rounded: "rounded-2xl",
  };

  return (
    <div
      className={cn(
        "animate-pulse bg-zinc-200/80 dark:bg-zinc-800/80",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
};
