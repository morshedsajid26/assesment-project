"use client";

import React, { useState } from "react";
import { Modal } from "@/src/components/ui/Modal";
import { InputField } from "@/src/components/ui/InputField";
import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { Badge } from "@/src/components/ui/Badge";
import { useUserSearch } from "@/src/hooks/useUserSearch";
import { ThreeUsersIcon } from "@/src/components/ui/ThreeUsersIcon";
import {
  UserPlus,
  UserMinus,
  LogOut,
  Check,
  Edit2,
  ShieldCheck,
  Shield,
  Phone,
  X,
  AlertTriangle,
  Loader2,
} from "lucide-react";
import { Conversation, User } from "@/src/types";

export interface GroupInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: Conversation;
  currentUser: User | null;
  onRenameGroup: (conversationId: string, name: string) => Promise<any>;
  onAddParticipants: (
    conversationId: string,
    userIds: string[],
  ) => Promise<any>;
  onPromoteAdmin?: (conversationId: string, userId: string) => Promise<any>;
  onRemoveMember?: (conversationId: string, userId: string) => Promise<any>;
  onLeaveGroup: (conversationId: string, userId: string) => Promise<any>;
}

export const GroupInfoModal: React.FC<GroupInfoModalProps> = ({
  isOpen,
  onClose,
  conversation,
  currentUser,
  onRenameGroup,
  onAddParticipants,
  onPromoteAdmin,
  onRemoveMember,
  onLeaveGroup,
}) => {
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(conversation.name || "");
  const [isRenaming, setIsRenaming] = useState(false);
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [selectedToAdd, setSelectedToAdd] = useState<User[]>([]);

  // Confirmation Modals State
  const [userToRemove, setUserToRemove] = useState<User | null>(null);
  const [isRemoving, setIsRemoving] = useState(false);

  const [userToPromote, setUserToPromote] = useState<User | null>(null);
  const [isPromoting, setIsPromoting] = useState(false);

  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);

  const { query, setQuery, results, searching, clear } = useUserSearch(
    currentUser?._id,
  );

  const participants: User[] = Array.isArray(conversation.participants)
    ? (conversation.participants as any[]).filter((p) => typeof p === "object")
    : [];

  const adminIds: string[] = Array.isArray(conversation.admins)
    ? conversation.admins.map((a: any) => (typeof a === "object" ? a._id : a))
    : [];

  const isUserAdmin = currentUser && adminIds.includes(currentUser._id);

  const handleRename = async () => {
    if (!newName.trim() || newName === conversation.name) {
      setIsEditingName(false);
      return;
    }
    try {
      setIsRenaming(true);
      await onRenameGroup(conversation._id, newName.trim());
      setIsEditingName(false);
    } catch (e) {
      console.error("Rename failed", e);
    } finally {
      setIsRenaming(false);
    }
  };

  const handleAddSelected = async () => {
    if (selectedToAdd.length === 0) return;
    try {
      await onAddParticipants(
        conversation._id,
        selectedToAdd.map((u) => u._id),
      );
      setSelectedToAdd([]);
      setIsAddingMode(false);
      clear();
    } catch (e) {
      console.error("Add members failed", e);
    }
  };

  const confirmPromoteAdmin = async () => {
    if (!userToPromote || !onPromoteAdmin) return;
    try {
      setIsPromoting(true);
      await onPromoteAdmin(conversation._id, userToPromote._id);
      setUserToPromote(null);
    } catch (e) {
      console.error("Promote admin failed", e);
    } finally {
      setIsPromoting(false);
    }
  };

  const confirmRemoveMember = async () => {
    if (!userToRemove || !onRemoveMember) return;
    try {
      setIsRemoving(true);
      await onRemoveMember(conversation._id, userToRemove._id);
      setUserToRemove(null);
    } catch (e) {
      console.error("Remove member failed", e);
    } finally {
      setIsRemoving(false);
    }
  };

  const confirmLeaveGroup = async () => {
    if (!currentUser) return;
    try {
      setIsLeaving(true);
      await onLeaveGroup(conversation._id, currentUser._id);
      setShowLeaveModal(false);
      onClose();
    } catch (e) {
      console.error("Leave group failed", e);
    } finally {
      setIsLeaving(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        title="Group Details"
        maxWidth="md"
      >
        <div className="space-y-6">
          {/* Group Header Card */}
          <div className="flex flex-col items-center text-center p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
            <Avatar name={conversation.name} isGroup size="xl" className="mb-3" />

            {isEditingName ? (
              <div className="flex items-center gap-2 w-full max-w-xs">
                <InputField
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  autoFocus
                />
                <Button size="sm" onClick={handleRename} isLoading={isRenaming}>
                  <Check className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setIsEditingName(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">
                  {conversation.name || "Group"}
                </h3>
                {isUserAdmin && (
                  <button
                    onClick={() => {
                      setNewName(conversation.name || "");
                      setIsEditingName(true);
                    }}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-lg hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50 transition-colors cursor-pointer"
                    title="Rename Group"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
              <ThreeUsersIcon className="w-3.5 h-3.5 text-zinc-400" />
              <span>{participants.length} member{participants.length !== 1 ? "s" : ""}</span>
            </p>
          </div>

          {/* Members Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Members ({participants.length})
              </h4>
              {!isAddingMode && isUserAdmin && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingMode(true)}
                  className="text-blue-600 hover:text-blue-700 text-xs"
                  leftIcon={<UserPlus className="w-3.5 h-3.5" />}
                >
                  Add Member
                </Button>
              )}
            </div>

            {/* Add Members Panel */}
            {isAddingMode && (
              <div className="p-3 mb-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800/50 space-y-3 animate-in fade-in duration-150">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-blue-900 dark:text-blue-200">
                    Search Users to Add
                  </span>
                  <button
                    onClick={() => {
                      setIsAddingMode(false);
                      setSelectedToAdd([]);
                      clear();
                    }}
                    className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <InputField
                  placeholder="Type name or phone..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                />

                {results.length > 0 && (
                  <div className="max-h-36 overflow-y-auto space-y-1">
                    {results
                      .filter((u) => !participants.some((p) => p._id === u._id))
                      .map((user) => {
                        const isSelected = selectedToAdd.some(
                          (u) => u._id === user._id,
                        );
                        return (
                          <div
                            key={user._id}
                            onClick={() => {
                              setSelectedToAdd((prev) =>
                                isSelected
                                  ? prev.filter((u) => u._id !== user._id)
                                  : [...prev, user],
                              );
                            }}
                            className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-zinc-800 text-xs cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-700/50 transition-colors"
                          >
                            <div className="flex items-center gap-2">
                              <Avatar
                                name={user.name}
                                seedId={user._id}
                                size="xs"
                              />
                              <span>{user.name}</span>
                            </div>
                            {isSelected && (
                              <Check className="w-3.5 h-3.5 text-blue-600" />
                            )}
                          </div>
                        );
                      })}
                  </div>
                )}

                {selectedToAdd.length > 0 && (
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={handleAddSelected}
                    className="w-full"
                  >
                    Add {selectedToAdd.length} User
                    {selectedToAdd.length !== 1 ? "s" : ""}
                  </Button>
                )}
              </div>
            )}

            {/* Members List */}
            <div className="max-h-64 overflow-y-auto space-y-2 pr-1">
              {participants.map((member) => {
                const isAdmin = adminIds.includes(member._id);
                const isMe = currentUser && member._id === currentUser._id;

                return (
                  <div
                    key={member._id}
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-50/50 dark:bg-zinc-800/30 border border-zinc-200/50 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar name={member.name} seedId={member._id} size="sm" />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                            {member.name} {isMe && "(You)"}
                          </span>
                          {isAdmin && (
                            <Badge variant="primary" size="sm" className="gap-1">
                              <ShieldCheck className="w-2.5 h-2.5" /> Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          {member.phone}
                        </p>
                      </div>
                    </div>

                    {/* Admin Actions for other members */}
                    {isUserAdmin && !isMe && (
                      <div className="flex items-center gap-1.5 shrink-0 ml-2">
                        {/* Promote to Admin Button */}
                        {!isAdmin && onPromoteAdmin && (
                          <button
                            onClick={() => setUserToPromote(member)}
                            className="px-2.5 py-1 rounded-lg text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 flex items-center gap-1 transition-colors cursor-pointer"
                            title="Make Admin"
                          >
                            <Shield className="w-3 h-3" />
                            <span>Make Admin</span>
                          </button>
                        )}

                        {/* Remove Member Button */}
                        {onRemoveMember && (
                          <button
                            onClick={() => setUserToRemove(member)}
                            className="p-1.5 rounded-lg text-rose-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-transparent hover:border-rose-200 dark:hover:border-rose-900/50 transition-colors cursor-pointer"
                            title={`Remove ${member.name}`}
                          >
                            <UserMinus className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Leave Group Action */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex justify-end">
            <Button
              variant="danger"
              size="sm"
              onClick={() => setShowLeaveModal(true)}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Leave Group
            </Button>
          </div>
        </div>
      </Modal>

      {/* 1. Modal: Remove Member Confirmation */}
      <Modal
        isOpen={!!userToRemove}
        onClose={() => setUserToRemove(null)}
        title="Remove Member"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Remove from group?
              </p>
              <p>
                Are you sure you want to remove <strong className="text-zinc-900 dark:text-zinc-100">{userToRemove?.name}</strong> from{" "}
                <strong className="text-zinc-900 dark:text-zinc-100">{conversation.name}</strong>? They will no longer be able to read or send messages in this group.
              </p>
            </div>
          </div>

          {userToRemove && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
              <Avatar name={userToRemove.name} seedId={userToRemove._id} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {userToRemove.name}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {userToRemove.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserToRemove(null)}
              disabled={isRemoving}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={confirmRemoveMember}
              isLoading={isRemoving}
              leftIcon={<UserMinus className="w-3.5 h-3.5" />}
            >
              Remove Member
            </Button>
          </div>
        </div>
      </Modal>

      {/* 2. Modal: Make Admin Confirmation */}
      <Modal
        isOpen={!!userToPromote}
        onClose={() => setUserToPromote(null)}
        title="Make Group Admin"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-blue-50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/50 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Promote to Admin
              </p>
              <p>
                Promote <strong className="text-zinc-900 dark:text-zinc-100">{userToPromote?.name}</strong> to Group Admin? Admins can add or remove members and rename the group.
              </p>
            </div>
          </div>

          {userToPromote && (
            <div className="flex items-center gap-3 p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
              <Avatar name={userToPromote.name} seedId={userToPromote._id} size="sm" />
              <div className="min-w-0">
                <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {userToPromote.name}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {userToPromote.phone}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserToPromote(null)}
              disabled={isPromoting}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={confirmPromoteAdmin}
              isLoading={isPromoting}
              leftIcon={<ShieldCheck className="w-3.5 h-3.5" />}
            >
              Make Admin
            </Button>
          </div>
        </div>
      </Modal>

      {/* 3. Modal: Leave Group Confirmation */}
      <Modal
        isOpen={showLeaveModal}
        onClose={() => setShowLeaveModal(false)}
        title="Leave Group"
        maxWidth="sm"
      >
        <div className="space-y-4">
          <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/50 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <LogOut className="w-5 h-5" />
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              <p className="font-semibold text-zinc-900 dark:text-zinc-100 mb-1">
                Leave {conversation.name}?
              </p>
              <p>
                Are you sure you want to leave this group? You will no longer receive or send messages here unless added again.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowLeaveModal(false)}
              disabled={isLeaving}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={confirmLeaveGroup}
              isLoading={isLeaving}
              leftIcon={<LogOut className="w-3.5 h-3.5" />}
            >
              Leave Group
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
