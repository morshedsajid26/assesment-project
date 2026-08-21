"use client";

import React, { useState, useMemo } from "react";
import { Avatar } from "@/src/components/ui/Avatar";
import { Button } from "@/src/components/ui/Button";
import { Dropdown } from "@/src/components/ui/Dropdown";
import { Skeleton } from "@/src/components/ui/Skeleton";
import { ConversationItem } from "./ConversationItem";
import { NewChatModal } from "@/src/components/modals/NewChatModal";
import { CreateGroupModal } from "@/src/components/modals/CreateGroupModal";
import {
  Search,
  MessageSquarePlus,
  Users,
  MoreVertical,
  LogOut,
  RefreshCw,
  MessageCircle,
} from "lucide-react";
import { Conversation, User } from "@/src/types";

export interface SidebarProps {
  conversations: Conversation[];
  activeConversationId: string | null;
  loading: boolean;
  currentUser: User | null;
  onSelectConversation: (id: string) => void;
  onStartDirect: (userId: string) => Promise<any>;
  onCreateGroup: (name: string, participantIds: string[]) => Promise<any>;
  onRefresh: () => void;
  onLogout: () => void;
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  conversations,
  activeConversationId,
  loading,
  currentUser,
  onSelectConversation,
  onStartDirect,
  onCreateGroup,
  onRefresh,
  onLogout,
  className = "",
}) => {
  const [filterQuery, setFilterQuery] = useState("");
  const [isNewChatOpen, setIsNewChatOpen] = useState(false);
  const [isCreateGroupOpen, setIsCreateGroupOpen] = useState(false);

  // Filter conversations locally by name
  const filteredConversations = useMemo(() => {
    if (!filterQuery.trim()) return conversations;
    const query = filterQuery.toLowerCase();
    return conversations.filter((c) => {
      if (c.type === "group") {
        return c.name?.toLowerCase().includes(query);
      }
      if (c.participant) {
        return (
          c.participant.name.toLowerCase().includes(query) ||
          c.participant.phone.includes(query)
        );
      }
      if (Array.isArray(c.participants)) {
        return c.participants.some(
          (p: any) =>
            typeof p === "object" &&
            (p.name?.toLowerCase().includes(query) || p.phone?.includes(query)),
        );
      }
      return false;
    });
  }, [conversations, filterQuery]);

  const userMenuItems = [
    {
      id: "refresh",
      label: "Refresh Chats",
      icon: <RefreshCw className="w-3.5 h-3.5" />,
      onClick: onRefresh,
    },
    {
      id: "logout",
      label: "Log Out",
      icon: <LogOut className="w-3.5 h-3.5" />,
      danger: true,
      onClick: onLogout,
    },
  ];

  return (
    <>
      <aside
        className={`flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 ${className}`}
      >
        {/* User Profile Header */}
        <div className="p-4 border-b border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <Avatar
              name={currentUser?.name}
              seedId={currentUser?._id}
              size="md"
              showOnlineDot
              isOnline
            />
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-50 truncate">
                {currentUser?.name || "My Account"}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                {currentUser?.phone || ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <Dropdown
              trigger={
                <button
                  className="p-2 rounded-xl text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors focus:outline-none"
                  aria-label="User Options"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              }
              items={userMenuItems}
            />
          </div>
        </div>

        {/* Action Controls & Search Bar */}
        <div className="p-4 space-y-3 border-b border-zinc-100 dark:border-zinc-800/50">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="primary"
              onClick={() => setIsNewChatOpen(true)}
              className="flex-1 text-xs"
              leftIcon={<MessageSquarePlus className="w-3.5 h-3.5" />}
            >
              New Chat
            </Button>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setIsCreateGroupOpen(true)}
              className="flex-1 text-xs"
              leftIcon={<Users className="w-3.5 h-3.5" />}
            >
              New Group
            </Button>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search chats..."
              value={filterQuery}
              onChange={(e) => setFilterQuery(e.target.value)}
              className="w-full rounded-xl bg-zinc-100/80 dark:bg-zinc-800/60 border border-transparent focus:border-blue-500 focus:bg-white dark:focus:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 pl-9 pr-3 py-2 outline-none transition-all placeholder:text-zinc-400"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading && conversations.length === 0 ? (
            <div className="p-2 space-y-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-3 p-2.5">
                  <Skeleton variant="circular" className="w-10 h-10 shrink-0" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-3.5 w-3/4" />
                    <Skeleton className="h-2.5 w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          ) : filteredConversations.length > 0 ? (
            filteredConversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                conversation={conv}
                isActive={conv._id === activeConversationId}
                currentUser={currentUser}
                onClick={() => onSelectConversation(conv._id)}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-16 px-4 text-center text-zinc-400">
              <MessageCircle className="w-10 h-10 stroke-1 text-zinc-300 dark:text-zinc-700 mb-2" />
              <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400">
                {filterQuery
                  ? "No matching chats found"
                  : "No conversations yet"}
              </p>
              <p className="text-[11px] text-zinc-400 mt-1 max-w-[200px]">
                {filterQuery
                  ? "Try a different search term"
                  : "Click 'New Chat' or 'New Group' above to begin messaging"}
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Modals */}
      <NewChatModal
        isOpen={isNewChatOpen}
        onClose={() => setIsNewChatOpen(false)}
        onSelectUser={onStartDirect}
        currentUserId={currentUser?._id}
      />

      <CreateGroupModal
        isOpen={isCreateGroupOpen}
        onClose={() => setIsCreateGroupOpen(false)}
        onCreateGroup={onCreateGroup}
        currentUserId={currentUser?._id}
      />
    </>
  );
};
