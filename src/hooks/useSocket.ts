"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/src/types";

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

interface UseSocketOptions {
  token: string | null;
  activeConversationId: string | null;
  currentUserId?: string | null;
  onMessageReceived?: (message: Message) => void;
  onRefreshConversations?: () => void;
}

const normalizeIncomingMessage = (data: any): Message | null => {
  if (!data) return null;
  const msg = data.message || data.data || data;
  if (!msg) return null;

  // Verify there is message content
  const text = msg.text || msg.content || msg.body;
  if (typeof text !== "string") return null;

  const convId =
    (typeof msg.conversation === "object" ? msg.conversation?._id : msg.conversation) ||
    msg.conversationId ||
    msg.conversation_id ||
    msg.roomId;

  const senderId =
    (typeof msg.sender === "object" ? msg.sender?._id : msg.sender) ||
    msg.senderId ||
    msg.userId ||
    msg.from;

  return {
    _id: String(msg._id || msg.id || `msg-${Date.now()}`),
    conversation: String(convId || ""),
    sender: typeof senderId === "object" ? senderId : String(senderId || ""),
    text: text,
    createdAt: msg.createdAt || msg.created_at || new Date().toISOString(),
    status: "sent",
  };
};

export const useSocket = ({
  token,
  activeConversationId,
  currentUserId,
  onMessageReceived,
  onRefreshConversations,
}: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  // Initialize socket connection
  useEffect(() => {
    if (!token) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      setIsConnected(false);
      return;
    }

    const cleanToken = token.replace(/^Bearer\s+/i, "");
    const bearerToken = `Bearer ${cleanToken}`;

    const socket = io(SOCKET_SERVER_URL, {
      auth: {
        token: cleanToken,
        jwt: cleanToken,
        authorization: bearerToken,
      },
      query: {
        token: cleanToken,
        ...(currentUserId ? { userId: currentUserId } : {}),
      },
      extraHeaders: {
        Authorization: bearerToken,
      },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: Infinity,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);

      // Join user-specific room
      if (currentUserId) {
        socket.emit("setup", { id: currentUserId });
        socket.emit("join", currentUserId);
        socket.emit("join_user", currentUserId);
      }

      // Join active conversation room if set
      if (activeConversationId) {
        socket.emit("join", activeConversationId);
        socket.emit("join_conversation", activeConversationId);
        socket.emit("joinRoom", activeConversationId);
        socket.emit("join_room", activeConversationId);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    const handlePayload = (payload: any) => {
      const normalized = normalizeIncomingMessage(payload);
      if (normalized && normalized.text) {
        if (onMessageReceived) onMessageReceived(normalized);
        if (onRefreshConversations) onRefreshConversations();
      }
    };

    // Listen to standard named events
    const events = [
      "message",
      "newMessage",
      "new_message",
      "message:receive",
      "receive_message",
      "receiveMessage",
      "chat_message",
      "chatMessage",
      "messageCreated",
      "message_created",
      "sendMessage",
      "send_message",
      "conversation_updated",
      "update_conversation",
    ];

    events.forEach((ev) => socket.on(ev, handlePayload));

    // Catch-all listener for any custom event emitted by the server
    socket.onAny((event, ...args) => {
      if (args && args.length > 0) {
        handlePayload(args[0]);
      }
    });

    return () => {
      events.forEach((ev) => socket.off(ev, handlePayload));
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, currentUserId]);

  // Join room when activeConversationId changes
  useEffect(() => {
    const socket = socketRef.current;
    if (socket && socket.connected && activeConversationId) {
      socket.emit("join", activeConversationId);
      socket.emit("join_conversation", activeConversationId);
      socket.emit("joinRoom", activeConversationId);
      socket.emit("join_room", activeConversationId);
    }
  }, [activeConversationId]);

  // Smart polling fallback (every 3 seconds) to guarantee synchronization
  useEffect(() => {
    if (!token || !activeConversationId) return;

    const interval = setInterval(() => {
      if (onRefreshConversations) onRefreshConversations();
    }, 3000);

    return () => clearInterval(interval);
  }, [token, activeConversationId, onRefreshConversations]);

  return { isConnected, socket: socketRef.current };
};
