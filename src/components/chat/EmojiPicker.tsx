"use client";

import React, { useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { EmojiClickData, Theme } from "emoji-picker-react";

// Dynamic import with ssr: false for Next.js app router
const EmojiPickerReact = dynamic(() => import("emoji-picker-react"), {
  ssr: false,
});

interface EmojiPickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
}

export const EmojiPicker: React.FC<EmojiPickerProps> = ({
  isOpen,
  onClose,
  onSelectEmoji,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  // Determine current active theme
  const isDark =
    typeof document !== "undefined" &&
    document.documentElement.classList.contains("dark");

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={pickerRef}
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
          className="absolute bottom-full right-0 mb-3 z-50 shadow-2xl rounded-2xl overflow-hidden border border-slate-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900"
        >
          <EmojiPickerReact
            onEmojiClick={(emojiData: EmojiClickData) => {
              onSelectEmoji(emojiData.emoji);
            }}
            theme={isDark ? Theme.DARK : Theme.LIGHT}
            autoFocusSearch={false}
            lazyLoadEmojis={true}
            searchPlaceHolder="Search all emojis..."
            width={330}
            height={390}
            previewConfig={{
              showPreview: false,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
