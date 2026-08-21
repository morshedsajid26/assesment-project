"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Smile } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

export interface MessageInputProps {
  onSendMessage: (text: string) => Promise<any>;
  disabled?: boolean;
  placeholder?: string;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
}) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea height based on content (max 120px)
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [text]);

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || disabled || sending) return;

    try {
      setSending(true);
      setText("");
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
      await onSendMessage(trimmed);
    } catch (err) {
      console.error("Failed to send message", err);
      // Restore unsent text on failure
      setText(trimmed);
    } finally {
      setSending(false);
      // Maintain focus
      setTimeout(() => textareaRef.current?.focus(), 50);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const isBlank = !text.trim();

  return (
    <div className="p-3 md:p-4 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-zinc-800">
      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2.5 max-w-5xl mx-auto"
      >
        <div className="flex-1 relative flex items-center bg-slate-100/90 dark:bg-zinc-800/80 rounded-2xl border border-slate-200/80 dark:border-zinc-700/60 focus-within:bg-white dark:focus-within:bg-zinc-850 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15 shadow-2xs transition-all">
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled || sending}
            placeholder={placeholder}
            className="w-full bg-transparent resize-none py-3 pl-4 pr-10 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none max-h-32"
          />

          {/* Quick emoji helper or trigger */}
          <button
            type="button"
            onClick={() => setText((prev) => prev + " 😊")}
            className="absolute right-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
            title="Add Emoji"
          >
            <Smile className="w-5 h-5" />
          </button>
        </div>

        {/* Send Button */}
        <Button
          type="submit"
          variant="primary"
          size="icon"
          disabled={isBlank || disabled || sending}
          className="rounded-2xl h-11 w-11 shrink-0 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md shadow-blue-500/25 active:scale-95 transition-all"
          title="Send message (Enter)"
        >
          {sending ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Send className="w-4 h-4 text-white -ml-0.5" />
          )}
        </Button>
      </form>
    </div>
  );
};
