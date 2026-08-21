"use client";

import React, { useState } from "react";
import { Avatar } from "@/src/components/ui/Avatar";
import { GroupInfoModal } from "@/src/components/modals/GroupInfoModal";
import { Conversation, User } from "@/src/types";
import { ChevronLeft, Info } from "lucide-react";

export interface ChatHeaderProps {
  conversation: Conversation;
  currentUser: User | null;
  onBack?: () => void;
  onRefreshMessages?: () => void;
  onRenameGroup: (conversationId: string, name: string) => Promise<any>;
  onAddParticipants: (
    conversationId: string,
    userIds: string[],
  ) => Promise<any>;
  onPromoteAdmin: (conversationId: string, userId: string) => Promise<any>;
  onRemoveMember: (conversationId: string, userId: string) => Promise<any>;
  onLeaveGroup: (conversationId: string, userId: string) => Promise<any>;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  conversation,
  currentUser,
  onBack,
  onRenameGroup,
  onAddParticipants,
  onPromoteAdmin,
  onRemoveMember,
  onLeaveGroup,
}) => {
  const [isGroupInfoOpen, setIsGroupInfoOpen] = useState(false);
  const isGroup = conversation.type === "group";

  let title = "Chat";
  let subtitle = "";
  let avatarSeed = conversation._id;

  if (isGroup) {
    title = conversation.name || "Group Chat";
    const count = Array.isArray(conversation.participants)
      ? conversation.participants.length
      : 0;
    subtitle = `${count} members`;
  } else {
    if (conversation.participant) {
      title = conversation.participant.name;
      subtitle = conversation.participant.phone;
      avatarSeed = conversation.participant._id;
    } else if (Array.isArray(conversation.participants) && currentUser) {
      const other = conversation.participants.find(
        (p) => typeof p === "object" && p._id !== currentUser._id,
      ) as User | undefined;
      if (other) {
        title = other.name;
        subtitle = other.phone;
        avatarSeed = other._id;
      }
    }
  }

  return (
    <>
      <header className="h-18 px-4 md:px-6 bg-white dark:bg-zinc-900 border-b border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between z-10 shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Back to conversations list"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Avatar & Info */}
          <div
            className={`flex items-center gap-3 min-w-0 ${
              isGroup ? "cursor-pointer" : ""
            }`}
            onClick={() => isGroup && setIsGroupInfoOpen(true)}
          >
            <Avatar
              name={title}
              seedId={avatarSeed}
              isGroup={isGroup}
              size="md"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
                  {title}
                </h2>
                {isGroup && (
                  <span className="hidden sm:inline-flex px-1.5 py-0.5 rounded text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    Group
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
                {subtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {isGroup && (
            <button
              onClick={() => setIsGroupInfoOpen(true)}
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Group Information"
              aria-label="Group Information"
            >
              <Info className="w-5 h-5" />
            </button>
          )}
        </div>
      </header>

      {/* Group Info Modal */}
      {isGroup && (
        <GroupInfoModal
          isOpen={isGroupInfoOpen}
          onClose={() => setIsGroupInfoOpen(false)}
          conversation={conversation}
          currentUser={currentUser}
          onRenameGroup={onRenameGroup}
          onAddParticipants={onAddParticipants}
          onPromoteAdmin={onPromoteAdmin}
          onRemoveMember={onRemoveMember}
          onLeaveGroup={onLeaveGroup}
        />
      )}
    </>
  );
};
