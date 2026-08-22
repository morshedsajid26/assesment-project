"use client";

import { useState, useCallback } from "react";
import { useAxios } from "./useAxios";
import { Message, MessagesResponse, User } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useMessages = (conversationId: string | null, currentUser: User | null) => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [hasMore, setHasMore] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);

  // TanStack Query to fetch message history with larger initial limit
  const {
    data: messages = [],
    isLoading: loading,
    error: queryError,
    refetch: fetchMessages,
  } = useQuery<Message[]>({
    queryKey: ["messages", conversationId],
    queryFn: async () => {
      if (!conversationId) return [];
      const res = await axios.get<MessagesResponse>(`/conversations/${conversationId}/messages`, {
        params: { limit: 100 },
      });
      const list = res.data?.messages || [];
      if (typeof res.data?.hasMore === "boolean") {
        setHasMore(res.data.hasMore);
      }
      return [...list].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    },
    enabled: !!conversationId,
    refetchInterval: 2500, // 2.5s live polling fallback to guarantee real-time sync
    refetchOnWindowFocus: true,
  });

  // Load older messages (pagination)
  const loadOlderMessages = useCallback(async () => {
    if (!conversationId || loadingOlder || !hasMore || messages.length === 0) return;

    try {
      setLoadingOlder(true);
      const oldestMsg = messages[0];
      const oldestId = oldestMsg?._id;
      const oldestDate = oldestMsg?.createdAt;

      const res = await axios.get<MessagesResponse>(`/conversations/${conversationId}/messages`, {
        params: {
          limit: 50,
          before: oldestId,
          beforeId: oldestId,
          beforeDate: oldestDate,
          offset: messages.length,
        },
      });

      const olderList = res.data?.messages || [];
      if (typeof res.data?.hasMore === "boolean") {
        setHasMore(res.data.hasMore);
      } else {
        setHasMore(olderList.length >= 20);
      }

      if (olderList.length > 0) {
        queryClient.setQueryData<Message[]>(["messages", conversationId], (prev = []) => {
          const combined = [...olderList, ...prev];
          // Remove duplicates
          const seen = new Set<string>();
          const unique: Message[] = [];
          combined.forEach((m) => {
            if (!seen.has(m._id)) {
              seen.add(m._id);
              unique.push(m);
            }
          });
          return unique.sort(
            (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        });
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Failed to load older messages", err);
    } finally {
      setLoadingOlder(false);
    }
  }, [conversationId, loadingOlder, hasMore, messages, axios, queryClient]);

  // Mutation to send a message with optimistic UI updates
  const sendMutation = useMutation({
    mutationFn: async (text: string) => {
      if (!conversationId) throw new Error("No active conversation");
      const res = await axios.post<Message>("/messages", {
        conversationId,
        text,
      });
      return res.data;
    },
    onMutate: async (text: string) => {
      await queryClient.cancelQueries({ queryKey: ["messages", conversationId] });
      const previousMessages = queryClient.getQueryData<Message[]>(["messages", conversationId]) || [];

      const tempId = `temp-${Date.now()}`;
      const optimisticMsg: Message = {
        _id: tempId,
        conversation: conversationId!,
        sender: currentUser?._id || "me",
        text,
        createdAt: new Date().toISOString(),
        status: "pending",
      };

      queryClient.setQueryData<Message[]>(["messages", conversationId], [
        ...previousMessages,
        optimisticMsg,
      ]);

      return { previousMessages, tempId };
    },
    onSuccess: (serverMsg, _variables, context) => {
      queryClient.setQueryData<Message[]>(["messages", conversationId], (old = []) =>
        old.map((m) => (m._id === context?.tempId ? { ...serverMsg, status: "sent" } : m))
      );
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
    },
    onError: (err: any, _variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(["messages", conversationId], (old: Message[] = []) =>
          old.map((m) => (m._id === context.tempId ? { ...m, status: "failed" } : m))
        );
      }
      toast.error(err.response?.data?.message || "Failed to send message");
    },
  });

  // Add incoming socket message into TanStack cache
  const addIncomingMessage = useCallback(
    (newMsg: Message) => {
      const msgConvId =
        typeof newMsg.conversation === "object"
          ? (newMsg.conversation as any)?._id
          : newMsg.conversation;

      if (String(msgConvId) !== String(conversationId)) return;

      queryClient.setQueryData<Message[]>(["messages", conversationId], (old = []) => {
        const exists = old.some(
          (m) =>
            m._id === newMsg._id ||
            (m.status === "pending" && m.text === newMsg.text)
        );
        let updated: Message[];
        if (exists) {
          updated = old.map((m) =>
            m.text === newMsg.text && m.status === "pending" ? { ...newMsg, status: "sent" } : m
          );
        } else {
          updated = [...old, { ...newMsg, status: "sent" }];
        }
        return updated.sort(
          (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      });
    },
    [conversationId, queryClient]
  );

  return {
    messages,
    loading,
    hasMore,
    loadingOlder,
    loadOlderMessages,
    sending: sendMutation.isPending,
    error: queryError ? (queryError as any).message : null,
    fetchMessages,
    sendMessage: (text: string) => sendMutation.mutateAsync(text),
    addIncomingMessage,
  };
};
