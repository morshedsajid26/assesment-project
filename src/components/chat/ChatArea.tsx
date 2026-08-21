"use client";

import React, { useEffect, useCallback } from "react";
import { ChatHeader } from "./ChatHeader";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";
import { useMessages } from "@/src/hooks/useMessages";
import { Conversation, User, Message } from "@/src/types";

export interface ChatAreaProps {
  conversation: Conversation;
  currentUser: User | null;
  onBack?: () => void;
  onUpdateLastMessage: (
    conversationId: string,
    message: { text: string; sender?: any; createdAt: string },
  ) => void;
  onRenameGroup: (conversationId: string, name: string) => Promise<any>;
  onAddParticipants: (
    conversationId: string,
    userIds: string[],
  ) => Promise<any>;
  onLeaveGroup: (conversationId: string, userId: string) => Promise<any>;
  incomingSocketMessage?: Message | null;
}

export const ChatArea: React.FC<ChatAreaProps> = ({
  conversation,
  currentUser,
  onBack,
  onUpdateLastMessage,
  onRenameGroup,
  onAddParticipants,
  onLeaveGroup,
  incomingSocketMessage,
}) => {
  const { messages, loading, fetchMessages, sendMessage, addIncomingMessage } =
    useMessages(conversation._id, currentUser);

  // Load message history on conversation change
  useEffect(() => {
    fetchMessages();
  }, [conversation._id, fetchMessages]);

  // Handle incoming socket message
  useEffect(() => {
    if (
      incomingSocketMessage &&
      incomingSocketMessage.conversation === conversation._id
    ) {
      addIncomingMessage(incomingSocketMessage);
    }
  }, [incomingSocketMessage, conversation._id, addIncomingMessage]);

  const handleSendMessage = async (text: string) => {
    const sent = await sendMessage(text);
    if (sent) {
      onUpdateLastMessage(conversation._id, {
        text: sent.text,
        sender: currentUser?._id,
        createdAt: sent.createdAt,
      });
    }
    return sent;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-zinc-50/50 dark:bg-zinc-950/40 overflow-hidden">
      {/* Header */}
      <ChatHeader
        conversation={conversation}
        currentUser={currentUser}
        onBack={onBack}
        onRefreshMessages={() => {
          fetchMessages();
        }}
        onRenameGroup={onRenameGroup}
        onAddParticipants={onAddParticipants}
        onLeaveGroup={onLeaveGroup}
      />

      {/* Messages */}
      <MessageList
        messages={messages}
        loading={loading}
        currentUser={currentUser}
        conversation={conversation}
      />

      {/* Input Bar */}
      <MessageInput onSendMessage={handleSendMessage} disabled={!currentUser} />
    </div>
  );
};
