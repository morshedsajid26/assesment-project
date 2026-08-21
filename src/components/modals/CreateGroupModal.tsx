"use client";

import React, { useState } from "react";
import { Modal } from "@/src/components/ui/Modal";
import { InputField } from "@/src/components/ui/InputField";
import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { useUserSearch } from "@/src/hooks/useUserSearch";
import { Search, Users, X, Check, Loader2 } from "lucide-react";
import { User } from "@/src/types";

export interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (name: string, participantIds: string[]) => Promise<void>;
  currentUserId?: string;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
  isOpen,
  onClose,
  onCreateGroup,
  currentUserId,
}) => {
  const [groupName, setGroupName] = useState("");
  const [groupNameError, setGroupNameError] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [creating, setCreating] = useState(false);

  const { query, setQuery, results, searching, clear } =
    useUserSearch(currentUserId);

  const handleClose = () => {
    setGroupName("");
    setGroupNameError("");
    setSelectedUsers([]);
    clear();
    onClose();
  };

  const toggleUser = (user: User) => {
    setSelectedUsers((prev) => {
      const exists = prev.some((u) => u._id === user._id);
      if (exists) {
        return prev.filter((u) => u._id !== user._id);
      } else {
        return [...prev, user];
      }
    });
  };

  const removeSelectedUser = (userId: string) => {
    setSelectedUsers((prev) => prev.filter((u) => u._id !== userId));
  };

  const handleCreate = async () => {
    const trimmed = groupName.trim();
    if (!trimmed) {
      setGroupNameError("Group name is required");
      return;
    }
    if (selectedUsers.length === 0) {
      setGroupNameError("Please select at least 1 participant");
      return;
    }

    try {
      setCreating(true);
      const participantIds = selectedUsers.map((u) => u._id);
      await onCreateGroup(trimmed, participantIds);
      handleClose();
    } catch (err: any) {
      setGroupNameError(err.message || "Failed to create group");
    } finally {
      setCreating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Group Conversation"
      description="Add a group name and choose participants"
      maxWidth="md"
      footer={
        <div className="flex items-center justify-between w-full">
          <span className="text-xs text-zinc-500">
            {selectedUsers.length} participant
            {selectedUsers.length !== 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              disabled={creating}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={handleCreate}
              isLoading={creating}
              disabled={!groupName.trim() || selectedUsers.length === 0}
            >
              Create Group
            </Button>
          </div>
        </div>
      }
    >
      <div className="space-y-4">
        {/* Group Name */}
        <InputField
          label="Group Name"
          placeholder="e.g. Frontend Team, Weekend Trip..."
          value={groupName}
          onChange={(e) => {
            setGroupName(e.target.value);
            if (groupNameError) setGroupNameError("");
          }}
          error={groupNameError}
          leftIcon={<Users className="w-4 h-4" />}
          autoFocus
        />

        {/* Selected Participants Chips */}
        {selectedUsers.length > 0 && (
          <div>
            <label className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 block mb-1.5">
              Selected Participants ({selectedUsers.length})
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200/80 dark:border-zinc-800 max-h-24 overflow-y-auto">
              {selectedUsers.map((user) => (
                <span
                  key={user._id}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800/60 text-blue-700 dark:text-blue-300 text-xs font-medium"
                >
                  <Avatar name={user.name} seedId={user._id} size="xs" />
                  <span className="max-w-[120px] truncate">{user.name}</span>
                  <button
                    type="button"
                    onClick={() => removeSelectedUser(user._id)}
                    className="hover:text-blue-900 dark:hover:text-blue-100 focus:outline-none"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* User Search */}
        <InputField
          label="Add Members"
          placeholder="Search by name or phone..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          leftIcon={<Search className="w-4 h-4" />}
        />

        {/* Search Results List */}
        <div className="min-h-[160px] max-h-[220px] overflow-y-auto space-y-1 pr-1">
          {searching ? (
            <div className="flex items-center justify-center py-8 text-zinc-400 gap-2">
              <Loader2 className="w-5 h-5 animate-spin text-blue-500" />
              <span className="text-xs">Searching users...</span>
            </div>
          ) : results.length > 0 ? (
            results.map((user) => {
              const isSelected = selectedUsers.some((u) => u._id === user._id);
              return (
                <div
                  key={user._id}
                  onClick={() => toggleUser(user)}
                  className={`flex items-center justify-between p-2 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/50"
                      : "hover:bg-zinc-100 dark:hover:bg-zinc-800/70"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Avatar name={user.name} seedId={user._id} size="sm" />
                    <div className="min-w-0">
                      <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {user.name}
                      </h5>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        {user.phone}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`w-5 h-5 rounded-lg border flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 text-white"
                        : "border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                  </div>
                </div>
              );
            })
          ) : query.trim() ? (
            <p className="text-xs text-center py-6 text-zinc-400">
              No users found
            </p>
          ) : (
            <p className="text-xs text-center py-6 text-zinc-400">
              Type in the search box to find and select group members
            </p>
          )}
        </div>
      </div>
    </Modal>
  );
};
