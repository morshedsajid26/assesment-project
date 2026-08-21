"use client";

import React from "react";
import { Avatar } from "@/src/components/ui/Avatar";
import { formatConversationTime } from "@/src/lib/utils";
import { Conversation, User } from "@/src/types";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

export interface ConversationItemProps {
  conversation: Conversation;
  isActive: boolean;
  currentUser: User | null;
  onClick: () => void;
}

export const ConversationItem: React.FC<ConversationItemProps> = ({
  conversation,
  isActive,
  currentUser,
  onClick,
}) => {
  const isGroup = conversation.type === "group";

  // Compute display name and avatar identifier
  let displayName = "Conversation";
  let avatarSeed = conversation._id;

  if (isGroup) {
    displayName = conversation.name || "Group Chat";
  } else {
    // In direct chat, find the other participant
    if (conversation.participant) {
      displayName = conversation.participant.name;
      avatarSeed = conversation.participant._id;
    } else if (Array.isArray(conversation.participants) && currentUser) {
      const other = conversation.participants.find(
        (p) => typeof p === "object" && p._id !== currentUser._id,
      ) as User | undefined;
      if (other) {
        displayName = other.name;
        avatarSeed = other._id;
      }
    }
  }

  const lastMessage = conversation.lastMessage;
  const lastMessageText = lastMessage?.text || "No messages yet";
  const timestamp = conversation.updatedAt || conversation.createdAt;

  return (
    <div
      onClick={onClick}
      className={`group relative flex items-center gap-3.5 p-3 rounded-2xl cursor-pointer transition-all duration-150 select-none ${
        isActive
          ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25 dark:shadow-blue-600/20"
          : "hover:bg-slate-100/90 dark:hover:bg-zinc-800/60 text-zinc-900 dark:text-zinc-100 hover:translate-x-0.5"
      }`}
    >
      {/* Active Left Indicator */}
      {isActive && (
        <span className="absolute -left-1 top-3.5 bottom-3.5 w-1.5 bg-blue-300 rounded-full shadow-xs" />
      )}
      {/* Avatar */}
      <Avatar
        name={displayName}
        seedId={avatarSeed}
        isGroup={isGroup}
        size="md"
        className="shrink-0 ring-2 ring-transparent group-hover:scale-105 transition-transform"
      />

      {/* Main Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-0.5">
          <div className="flex items-center gap-1.5 min-w-0">
            <h4
              className={`text-sm font-semibold truncate ${
                isActive ? "text-white" : "text-zinc-900 dark:text-zinc-100"
              }`}
            >
              {displayName}
            </h4>
            {isGroup && (
              <ThreeUsersIcon
                className={`w-3.5 h-3.5 shrink-0 ${
                  isActive
                    ? "text-blue-200"
                    : "text-zinc-400 dark:text-zinc-500"
                }`}
              />
            )}
          </div>

          {timestamp && (
            <span
              className={`text-[11px] shrink-0 font-medium ${
                isActive ? "text-blue-100" : "text-zinc-400 dark:text-zinc-500"
              }`}
            >
              {formatConversationTime(timestamp)}
            </span>
          )}
        </div>

        <p
          className={`text-xs truncate ${
            isActive ? "text-blue-100" : "text-zinc-500 dark:text-zinc-400"
          }`}
        >
          {lastMessageText}
        </p>
      </div>
    </div>
  );
};
