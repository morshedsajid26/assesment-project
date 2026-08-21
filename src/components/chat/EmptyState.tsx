"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  MessageSquarePlus,
  Sparkles,
} from "lucide-react";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";
import { Button } from "@/src/components/ui/Button";
import { NewChatModal } from "@/src/components/modals/NewChatModal";
import { CreateGroupModal } from "@/src/components/modals/CreateGroupModal";

export interface EmptyStateProps {
  onStartDirect: (userId: string) => Promise<any>;
  onCreateGroup: (name: string, participantIds: string[]) => Promise<any>;
  currentUserId?: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  onStartDirect,
  onCreateGroup,
  currentUserId,
}) => {
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-slate-100/90 via-blue-50/20 to-slate-100/90 dark:from-zinc-950 dark:via-zinc-900/95 dark:to-zinc-950 text-center relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute w-96 h-96 rounded-full bg-blue-500/10 dark:bg-blue-600/5 blur-3xl pointer-events-none -top-12 -right-12" />
      <div className="absolute w-96 h-96 rounded-full bg-indigo-500/10 dark:bg-indigo-600/5 blur-3xl pointer-events-none -bottom-12 -left-12" />

      <div className="relative z-10 max-w-md w-full p-8 rounded-3xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-slate-200/90 dark:border-zinc-800 shadow-2xl shadow-blue-500/10">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-500/30 animate-in zoom-in-95 duration-200">
          <MessageSquare className="w-8 h-8" />
        </div>

        <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50">
          Select or Start a Chat
        </h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2 leading-relaxed">
          Choose a conversation from the sidebar, search for a contact, or
          create a group to start messaging in real-time.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          <Button
            variant="primary"
            size="md"
            onClick={() => setIsNewChatOpen(true)}
            leftIcon={<MessageSquarePlus className="w-4 h-4" />}
            className="w-full text-xs font-semibold shadow-md shadow-blue-500/20"
          >
            Start Direct Chat
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsCreateGroupOpen(true)}
            leftIcon={<ThreeUsersIcon className="w-4 h-4" />}
            className="w-full text-xs font-semibold"
          >
            Create Group
          </Button>
        </div>
      </div>

      <NewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onSelectUser={onStartDirect}
        currentUserId={currentUserId}
      />

      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={onCreateGroup}
        currentUserId={currentUserId}
      />
    </div>
  );
};
