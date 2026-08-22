"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send, Loader2, Smile, X, Reply } from "lucide-react";
import { Button } from "@/src/components/ui/Button";
import { EmojiPicker } from "./EmojiPicker";
import { Message } from "@/src/types";

export interface MessageInputProps {
  onSendMessage: (text: string) => Promise<any>;
  disabled?: boolean;
  placeholder?: string;
  replyingTo?: Message | null;
  onCancelReply?: () => void;
}

export const MessageInput: React.FC<MessageInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type a message...",
  replyingTo,
  onCancelReply,
}) => {
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
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
      setIsEmojiPickerOpen(false);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }

      let payload = trimmed;
      if (replyingTo) {
        const replyMeta = {
          id: replyingTo._id,
          name: typeof replyingTo.sender === "object" ? replyingTo.sender.name : "User",
          text: replyingTo.text,
        };
        payload = `::REPLY::${JSON.stringify(replyMeta)}::REPLY::\n${trimmed}`;
      }

      await onSendMessage(payload);
      if (onCancelReply) onCancelReply();
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

  const handleSelectEmoji = (emoji: string) => {
    const el = textareaRef.current;
    if (!el) {
      setText((prev) => prev + emoji);
      return;
    }

    const start = el.selectionStart || 0;
    const end = el.selectionEnd || 0;
    const nextText = text.substring(0, start) + emoji + text.substring(end);
    setText(nextText);

    setTimeout(() => {
      el.focus();
      const nextPos = start + emoji.length;
      el.setSelectionRange(nextPos, nextPos);
    }, 10);
  };

  const isBlank = !text.trim();

  return (
    <div className="py-3.5 px-4 sm:px-6 md:px-8 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-zinc-800 relative z-20">
      {/* Reply Preview */}
      {replyingTo && (
        <div className="absolute bottom-full left-0 right-0 px-4 sm:px-6 md:px-8 pb-3 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-zinc-800 flex items-center justify-between shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_15px_-3px_rgba(0,0,0,0.2)]">
          <div className="flex items-center gap-3 overflow-hidden bg-slate-100/80 dark:bg-zinc-800/80 rounded-xl p-3 w-full border border-slate-200 dark:border-zinc-700/60 mt-[-1px]">
            <Reply className="w-4 h-4 text-blue-500 shrink-0" />
            <div className="flex flex-col truncate">
              <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                Replying to {typeof replyingTo.sender === "object" ? replyingTo.sender.name : "User"}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 truncate max-w-sm">
                {replyingTo.text.replace(/::REPLY::.*?::REPLY::\n?/g, "")}
              </span>
            </div>
            <button
              type="button"
              onClick={onCancelReply}
              className="ml-auto p-1.5 rounded-full text-zinc-400 hover:bg-slate-200 dark:hover:bg-zinc-700 hover:text-zinc-700 dark:hover:text-zinc-200 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2.5 w-full relative"
      >
        {/* Emoji Tray Popup (WhatsApp / Messenger Style) */}
        <EmojiPicker
          isOpen={isEmojiPickerOpen}
          onClose={() => setIsEmojiPickerOpen(false)}
          onSelectEmoji={handleSelectEmoji}
        />

        <div className="flex-1 relative flex items-center bg-slate-100/90 dark:bg-zinc-800/90 rounded-2xl border border-slate-200/80 dark:border-zinc-700/60 focus-within:bg-white dark:focus-within:bg-zinc-800 focus-within:border-blue-500 dark:focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-500/15 shadow-2xs transition-all">
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

          {/* WhatsApp / Messenger Style Emoji Trigger */}
          <button
            type="button"
            onClick={() => setIsEmojiPickerOpen((prev) => !prev)}
            className={`absolute right-3 p-1 rounded-xl transition-all cursor-pointer ${
              isEmojiPickerOpen
                ? "text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 scale-110"
                : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-slate-200/50 dark:hover:bg-zinc-700/50"
            }`}
            title="Choose Emoji (WhatsApp/Messenger style)"
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
