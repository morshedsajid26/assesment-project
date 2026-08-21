"use client";

import React, { useState } from "react";
import { Avatar } from "@/src/components/ui/Avatar";
import { GroupInfoModal } from "@/src/components/modals/GroupInfoModal";
import { Conversation, User } from "@/src/types";
import { ChevronLeft, Info, Phone, Video, ShieldCheck } from "lucide-react";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";

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
      <header className="h-18 px-4 md:px-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-b border-slate-200/90 dark:border-zinc-800 flex items-center justify-between z-10 shrink-0 shadow-xs">
        <div className="flex items-center gap-3 min-w-0">
          {/* Mobile Back Button */}
          {onBack && (
            <button
              onClick={onBack}
              className="md:hidden p-2 -ml-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Back to conversations list"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {/* Avatar & Info */}
          <div
            className={`flex items-center gap-3 min-w-0 ${
              isGroup ? "cursor-pointer group" : ""
            }`}
            onClick={() => isGroup && setIsGroupInfoOpen(true)}
          >
            <Avatar
              name={title}
              seedId={avatarSeed}
              isGroup={isGroup}
              size="md"
              showOnlineDot={!isGroup}
              isOnline={!isGroup}
              className="transition-transform group-hover:scale-105"
            />

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate tracking-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {title}
                </h2>
                {isGroup && (
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                    <ThreeUsersIcon className="w-2.5 h-2.5" /> Group
                  </span>
                )}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1.5 mt-0.5">
                {!isGroup && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                )}
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
              className="p-2 rounded-xl text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
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
