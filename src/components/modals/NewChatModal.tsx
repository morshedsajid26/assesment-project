"use client";

import React, { useState } from "react";
import { Modal } from "@/src/components/ui/Modal";
import { InputField } from "@/src/components/ui/InputField";
import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { useUserSearch } from "@/src/hooks/useUserSearch";
import { Search, UserPlus, Phone, Loader2, MessageSquare } from "lucide-react";
import { User } from "@/src/types";

export interface NewChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectUser: (userId: string) => Promise<void>;
  currentUserId?: string;
}

export const NewChatModal: React.FC<NewChatModalProps> = ({
  isOpen,
  onClose,
  onSelectUser,
  currentUserId,
}) => {
  const { query, setQuery, results, searching, error, clear } =
    useUserSearch(currentUserId);
  const [startingUserId, setStartingUserId] = useState<string | null>(null);

  const handleClose = () => {
    clear();
    setStartingUserId(null);
    onClose();
  };

  const handleUserClick = async (user: User) => {
    try {
      setStartingUserId(user._id);
      await onSelectUser(user._id);
      handleClose();
    } catch (e) {
      console.error(e);
      setStartingUserId(null);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Start a New Conversation"
      description="Search for people by name or phone number"
      maxWidth="md"
    >
      <div className="space-y-4">
        {/* Search Input */}
        <InputField
          placeholder="Search by name or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
          autoFocus
        />

        {/* Error message */}
        {error && <p className="text-xs text-rose-500">{error}</p>}

        {/* Search Results / State */}
        <div className="min-h-[220px] max-h-[320px] overflow-y-auto space-y-1.5 pr-1">
          {searching ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-400 gap-2">
              <Loader2 className="w-6 h-6 animate-spin text-blue-500" />
              <span className="text-xs font-medium">Searching users...</span>
            </div>
          ) : results.length > 0 ? (
            <>
              <p className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider px-1 mb-1">
                {query.trim()
                  ? `Search Results (${results.length})`
                  : `All Contacts (${results.length})`}
              </p>
              {results.map((user) => {
                const isStarting = startingUserId === user._id;
                return (
                  <div
                    key={user._id}
                    onClick={() => !isStarting && handleUserClick(user)}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-800/70 cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={user.name} seedId={user._id} size="md" />
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {user.name}
                        </h4>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                          <Phone className="w-3 h-3" /> {user.phone}
                        </p>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="secondary"
                      isLoading={isStarting}
                      className="shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                );
              })}
            </>
          ) : query.trim() ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400">
              <UserPlus className="w-8 h-8 stroke-1 text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-xs font-medium text-zinc-500">
                No users found for &quot;{query}&quot;
              </p>
              <p className="text-[11px] text-zinc-400 mt-0.5">
                Try searching with a different name or phone number
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center text-zinc-400">
              <Search className="w-8 h-8 stroke-1 text-zinc-300 dark:text-zinc-600 mb-2" />
              <p className="text-xs font-medium text-zinc-500">
                Type a name or phone to find users
              </p>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};
