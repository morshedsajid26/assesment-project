"use client";

import React from "react";
import { Avatar } from "@/src/components/ui/Avatar";
import { formatTime } from "@/src/lib/utils";
import { Message, User } from "@/src/types";
import { Check, Clock, AlertCircle } from "lucide-react";

export interface MessageBubbleProps {
  message: Message;
  isMe: boolean;
  showSenderHeader?: boolean;
  isGroup?: boolean;
  senderUser?: User;
  isConsecutive?: boolean;
}

// Helper to auto-linkify URLs within message text
const renderMessageText = (text: string, isMe: boolean) => {
  if (!text) return null;
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;
  const parts = text.split(urlRegex);

  return parts.map((part, index) => {
    if (part.match(urlRegex)) {
      const href =
        part.startsWith("http://") || part.startsWith("https://")
          ? part
          : `https://${part}`;
      return (
        <a
          key={index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={`underline underline-offset-2 break-all transition-colors cursor-pointer ${
            isMe
              ? "text-white font-medium hover:text-blue-100 hover:decoration-white"
              : "text-blue-600 dark:text-blue-400 font-medium hover:text-blue-700 dark:hover:text-blue-300"
          }`}
        >
          {part}
        </a>
      );
    }
    return part;
  });
};

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isMe,
  showSenderHeader = false,
  isGroup = false,
  senderUser,
  isConsecutive = false,
}) => {
  const senderName =
    senderUser?.name ||
    (typeof message.sender === "object" ? message.sender.name : "User");

  return (
    <div
      className={`w-full flex items-start gap-1.5 sm:gap-2 ${
        isConsecutive ? "mt-2" : "mt-2"
      } ${
        isMe ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-1 duration-150`}
    >
      {/* Group Chat Avatar Column (aligned to top) */}
      {!isMe && isGroup && (
        <div className="w-6 sm:w-7 shrink-0 mt-0.5">
          {showSenderHeader ? (
            <Avatar
              name={senderName}
              seedId={
                typeof message.sender === "string"
                  ? message.sender
                  : message.sender?._id
              }
              size="xs"
            />
          ) : (
            <div className="w-6 sm:w-7" />
          )}
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[85%] sm:max-w-[85%] md:max-w-[65%] rounded-2xl px-3.5 sm:px-4 py-2 sm:py-2.5 text-sm leading-relaxed transition-all ${
          isMe
            ? "bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 text-white rounded-br-xs shadow-md shadow-blue-500/20"
            : "bg-white/95 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-slate-200/90 dark:border-zinc-700/60 rounded-bl-xs shadow-sm shadow-slate-200/60"
        }`}
      >
        {/* Sender Name in Group Chat */}
        {!isMe && showSenderHeader && (
          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">
            {senderName}
          </p>
        )}

        {/* Message Content with Auto-Clickable Links */}
        <p className="whitespace-pre-wrap break-words">
          {renderMessageText(message.text, isMe)}
        </p>

        {/* Meta (Timestamp + Status) */}
        <div
          className={`flex items-center justify-end gap-1 mt-1 text-[10px] select-none ${
            isMe ? "text-blue-100/90" : "text-zinc-400 dark:text-zinc-400"
          }`}
        >
          <span>{formatTime(message.createdAt)}</span>

          {isMe && (
            <span>
              {message.status === "pending" && (
                <Clock className="w-3 h-3 animate-spin" />
              )}
              {message.status === "failed" && (
                <AlertCircle className="w-3 h-3 text-rose-300" />
              )}
              {(!message.status || message.status === "sent") && (
                <Check className="w-3 h-3 stroke-[2.5]" />
              )}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
