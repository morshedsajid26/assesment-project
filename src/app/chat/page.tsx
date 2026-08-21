"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Sidebar } from "@/src/components/chat/Sidebar";
import { ChatArea } from "@/src/components/chat/ChatArea";
import { EmptyState } from "@/src/components/chat/EmptyState";
import { useAuthContext } from "@/src/context/AuthContext";
import { useConversations } from "@/src/hooks/useConversations";
import { useSocket } from "@/src/hooks/useSocket";
import { Message } from "@/src/types";
import { Spinner } from "@/src/components/ui/Spinner";

export default function ChatDashboardPage() {
  const { user, token, loading: authLoading, logout } = useAuthContext();
  const {
    conversations,
    activeConversationId,
    activeConversation,
    loading: convsLoading,
    setActiveConversationId,
    fetchConversations,
    startDirectConversation,
    createGroupConversation,
    renameGroup,
    addParticipants,
    promoteToAdmin,
    removeMember,
    leaveGroup,
    updateConversationLastMessage,
  } = useConversations();

  const [latestSocketMessage, setLatestSocketMessage] =
    useState<Message | null>(null);

  // Load conversations on mount
  useEffect(() => {
    if (token) {
      fetchConversations();
    }
  }, [token, fetchConversations]);

  // Real-time message listener callback
  const handleMessageReceived = useCallback(
    (message: Message) => {
      setLatestSocketMessage(message);
      updateConversationLastMessage(message.conversation, {
        text: message.text,
        sender: message.sender,
        createdAt: message.createdAt,
      });
    },
    [updateConversationLastMessage],
  );

  // Initialize socket connection & background sync
  const { isConnected } = useSocket({
    token,
    activeConversationId,
    currentUserId: user?._id,
    onMessageReceived: handleMessageReceived,
    onRefreshConversations: fetchConversations,
  });

  // Loading state while checking auth cookie
  if (authLoading) {
    return (
      <div
        className="h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950"
        suppressHydrationWarning
      >
        <div className="flex flex-col items-center gap-3" suppressHydrationWarning>
          <Spinner size="lg" />
          <p className="text-xs font-medium text-zinc-500">
            Loading ChatApp...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className="fixed inset-0 flex h-full w-full overflow-hidden bg-white dark:bg-zinc-950 select-none"
      suppressHydrationWarning
    >
      {/* Sidebar: hidden on mobile when viewing a conversation */}
      <div
        className={`w-full md:w-80 lg:w-96 shrink-0 h-full ${
          activeConversationId ? "hidden md:block" : "block"
        }`}
        suppressHydrationWarning
      >
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          loading={convsLoading}
          currentUser={user}
          onSelectConversation={setActiveConversationId}
          onStartDirect={startDirectConversation}
          onCreateGroup={createGroupConversation}
          onRefresh={fetchConversations}
          onLogout={logout}
          isSocketConnected={isConnected}
          className="h-full"
        />
      </div>

      {/* Main Chat Area or Empty State */}
      <div
        className={`flex-1 h-full min-w-0 ${
          !activeConversationId ? "hidden md:flex" : "flex"
        }`}
        suppressHydrationWarning
      >
        {activeConversation ? (
          <ChatArea
            conversation={activeConversation}
            currentUser={user}
            incomingSocketMessage={latestSocketMessage}
            onUpdateLastMessage={(convId, msg) => updateConversationLastMessage(convId, msg)}
            onBack={() => setActiveConversationId(null)}
            onRenameGroup={renameGroup}
            onAddParticipants={addParticipants}
            onPromoteAdmin={promoteToAdmin}
            onRemoveMember={removeMember}
            onLeaveGroup={leaveGroup}
          />
        ) : (
          <EmptyState
            onStartDirect={startDirectConversation}
            onCreateGroup={createGroupConversation}
            currentUserId={user?._id}
          />
        )}
      </div>
    </div>
  );
}
