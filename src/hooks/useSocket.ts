"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { Message } from "@/src/types";

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_SOCKET_SERVER_URL;

interface UseSocketOptions {
  token: string | null;
  activeConversationId: string | null;
  onMessageReceived?: (message: Message) => void;
  onRefreshConversations?: () => void;
}

export const useSocket = ({
  token,
  activeConversationId,
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

    const socket = io(SOCKET_SERVER_URL, {
      auth: { token },
      query: { token },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionAttempts: 10,
      reconnectionDelay: 1000,
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      if (activeConversationId) {
        socket.emit("join", activeConversationId);
        socket.emit("join_conversation", activeConversationId);
      }
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    // Listen to standard message events
    const handleIncomingMessage = (data: any) => {
      if (data && data._id && data.text) {
        if (onMessageReceived) onMessageReceived(data);
        if (onRefreshConversations) onRefreshConversations();
      }
    };

    socket.on("message", handleIncomingMessage);
    socket.on("newMessage", handleIncomingMessage);
    socket.on("message:receive", handleIncomingMessage);
    socket.on("receive_message", handleIncomingMessage);

    return () => {
      socket.off("message", handleIncomingMessage);
      socket.off("newMessage", handleIncomingMessage);
      socket.off("message:receive", handleIncomingMessage);
      socket.off("receive_message", handleIncomingMessage);
      socket.disconnect();
      socketRef.current = null;
    };
  }, [token, onMessageReceived, onRefreshConversations, activeConversationId]);

  // Join room when activeConversationId changes
  useEffect(() => {
    if (socketRef.current && socketRef.current.connected && activeConversationId) {
      socketRef.current.emit("join", activeConversationId);
      socketRef.current.emit("join_conversation", activeConversationId);
    }
  }, [activeConversationId]);

  // Smart polling fallback (every 3.5 seconds) to ensure 100% reliable updates
  useEffect(() => {
    if (!token || !activeConversationId) return;

    const interval = setInterval(() => {
      if (onRefreshConversations) onRefreshConversations();
    }, 3500);

    return () => clearInterval(interval);
  }, [token, activeConversationId, onRefreshConversations]);

  return { isConnected, socket: socketRef.current };
};
