"use client";

import React, { useMemo } from "react";
import { MessageBubble } from "./MessageBubble";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { useScrollToBottom } from "@/src/hooks/useScrollToBottom";
import { formatDateDivider } from "@/src/lib/utils";
import { Conversation, Message, User } from "@/src/types";
import { ArrowDown, MessageSquare } from "lucide-react";

export interface MessageListProps {
  messages: Message[];
  loading: boolean;
  currentUser: User | null;
  conversation: Conversation;
}

export const MessageList: React.FC<MessageListProps> = ({
  messages,
  loading,
  currentUser,
  conversation,
}) => {
  const isGroup = conversation.type === "group";

  // Build map of participants for quick lookup
  const participantsMap = useMemo(() => {
    const map = new Map<string, User>();
    if (Array.isArray(conversation.participants)) {
      conversation.participants.forEach((p) => {
        if (typeof p === "object" && p._id) {
          map.set(p._id, p);
        }
      });
    }
    if (conversation.participant) {
      map.set(conversation.participant._id, conversation.participant);
    }
    return map;
  }, [conversation]);

  const { containerRef, showScrollButton, scrollToBottom, onScroll } =
    useScrollToBottom<HTMLDivElement>([messages.length, conversation._id]);

  // Group messages by Date Divider
  const groupedMessages = useMemo(() => {
    const groups: { dateKey: string; items: Message[] }[] = [];

    messages.forEach((msg) => {
      const dateKey = formatDateDivider(msg.createdAt);
      const lastGroup = groups[groups.length - 1];

      if (lastGroup && lastGroup.dateKey === dateKey) {
        lastGroup.items.push(msg);
      } else {
        groups.push({ dateKey, items: [msg] });
      }
    });

    return groups;
  }, [messages]);

  if (loading && messages.length === 0) {
    return (
      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex justify-start">
          <Skeleton className="h-12 w-48 rounded-2xl" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-16 w-64 rounded-2xl" />
        </div>
        <div className="flex justify-start">
          <Skeleton className="h-10 w-40 rounded-2xl" />
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-14 w-56 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-zinc-400">
        <div className="w-16 h-16 rounded-3xl bg-blue-50 dark:bg-zinc-800/60 flex items-center justify-center text-blue-500 mb-3 shadow-inner">
          <MessageSquare className="w-8 h-8 stroke-1" />
        </div>
        <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
          No messages here yet
        </h4>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xs mt-1">
          Say hello to start the conversation!
        </p>
      </div>
    );
  }

  return (
    <div className="relative flex-1 min-h-0 flex flex-col">
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto py-4 space-y-4"
      >
        {groupedMessages.map((group, groupIndex) => (
          <div key={group.dateKey || groupIndex} className="space-y-1">
            {/* Date divider pill */}
            <div className="flex items-center justify-center my-3">
              <span className="px-3 py-1 rounded-full text-[11px] font-semibold bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 select-none shadow-xs">
                {group.dateKey}
              </span>
            </div>

            {/* Messages in this group */}
            {group.items.map((msg, index) => {
              const senderId =
                typeof msg.sender === "object" ? msg.sender._id : msg.sender;
              const isMe = currentUser ? senderId === currentUser._id : false;

              // Check if previous message had same sender to collapse sender name in groups
              const prevMsg = group.items[index - 1];
              const prevSenderId = prevMsg
                ? typeof prevMsg.sender === "object"
                  ? prevMsg.sender._id
                  : prevMsg.sender
                : null;
              const isConsecutive = prevSenderId === senderId;

              const senderUser = participantsMap.get(senderId);

              return (
                <MessageBubble
                  key={msg._id || index}
                  message={msg}
                  isMe={isMe}
                  showSenderHeader={isGroup && !isMe && !isConsecutive}
                  senderUser={senderUser}
                />
              );
            })}
          </div>
        ))}
      </div>

      {/* Floating Scroll to Bottom Button */}
      {showScrollButton && (
        <button
          onClick={() => scrollToBottom("smooth")}
          className="absolute bottom-4 right-6 px-3.5 py-2 rounded-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold shadow-lg shadow-blue-500/30 flex items-center gap-1.5 transition-all animate-in fade-in slide-in-from-bottom-2 duration-150 cursor-pointer"
        >
          <ArrowDown className="w-3.5 h-3.5" />
          <span>Latest messages</span>
        </button>
      )}
    </div>
  );
};
