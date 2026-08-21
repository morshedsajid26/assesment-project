"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  MessageSquarePlus,
  Users,
  Sparkles,
} from "lucide-react";
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
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-zinc-50/50 dark:bg-zinc-950/50 text-center">
      <div className="max-w-md w-full p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl shadow-blue-500/5">
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white mx-auto mb-4 shadow-lg shadow-blue-500/25">
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
            className="w-full text-xs font-semibold"
          >
            Start Direct Chat
          </Button>

          <Button
            variant="secondary"
            size="md"
            onClick={() => setIsCreateGroupOpen(true)}
            leftIcon={<Users className="w-4 h-4" />}
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
