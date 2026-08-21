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
  senderUser?: User;
}

export const MessageBubble: React.FC<MessageBubbleProps> = ({
  message,
  isMe,
  showSenderHeader = false,
  senderUser,
}) => {
  const senderName =
    senderUser?.name ||
    (typeof message.sender === "object" ? message.sender.name : "User");

  return (
    <div
      className={`flex items-end gap-2 my-1 px-4 ${
        isMe ? "justify-end" : "justify-start"
      } animate-in fade-in slide-in-from-bottom-1 duration-150`}
    >
      {/* Received message avatar (if group and showSenderHeader) */}
      {!isMe && (
        <div className="w-7 shrink-0">
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
            <div className="w-7" />
          )}
        </div>
      )}

      {/* Bubble Container */}
      <div
        className={`max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-sm text-sm leading-relaxed ${
          isMe
            ? "bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-br-xs"
            : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200/70 dark:border-zinc-700/60 rounded-bl-xs"
        }`}
      >
        {/* Sender Name in Group Chat */}
        {!isMe && showSenderHeader && (
          <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 mb-1">
            {senderName}
          </p>
        )}

        {/* Message Content */}
        <p className="whitespace-pre-wrap break-words">{message.text}</p>

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
