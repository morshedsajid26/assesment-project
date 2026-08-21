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
    removeParticipant,
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
  useSocket({
    token,
    activeConversationId,
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
    <main
      className="h-screen w-full flex overflow-hidden bg-white dark:bg-zinc-900"
      suppressHydrationWarning
    >
      {/* Left Sidebar: hidden on mobile if a conversation is open */}
      <div
        className={`w-full md:w-80 lg:w-96 shrink-0 h-full ${
          activeConversationId ? "hidden md:flex" : "flex"
        }`}
        suppressHydrationWarning
      >
        <Sidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          loading={convsLoading}
          currentUser={user}
          onSelectConversation={(id) => setActiveConversationId(id)}
          onStartDirect={startDirectConversation}
          onCreateGroup={createGroupConversation}
          onRefresh={fetchConversations}
          onLogout={logout}
          className="w-full"
        />
      </div>

      {/* Right Chat Area: hidden on mobile if no conversation is open */}
      <div
        className={`flex-1 h-full min-w-0 ${
          !activeConversationId ? "hidden md:flex" : "flex"
        }`}
      >
        {activeConversation ? (
          <ChatArea
            conversation={activeConversation}
            currentUser={user}
            onBack={() => setActiveConversationId(null)}
            onUpdateLastMessage={updateConversationLastMessage}
            onRenameGroup={renameGroup}
            onAddParticipants={addParticipants}
            onLeaveGroup={async (convId, userId) => {
              await removeParticipant(convId, userId);
              setActiveConversationId(null);
            }}
            incomingSocketMessage={latestSocketMessage}
          />
        ) : (
          <EmptyState
            onStartDirect={startDirectConversation}
            onCreateGroup={createGroupConversation}
            currentUserId={user?._id}
          />
        )}
      </div>
    </main>
  );
}
