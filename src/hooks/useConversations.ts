"use client";

import { useState, useCallback, useMemo } from "react";
import { useAxios } from "./useAxios";
import { Conversation, LastMessage } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useConversations = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // TanStack Query to fetch conversations
  const {
    data: conversations = [],
    isLoading: loading,
    error: queryError,
    refetch: fetchConversations,
  } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: async () => {
      const res = await axios.get<{ data: Conversation[] }>("/conversations");
      return res.data?.data || (Array.isArray(res.data) ? res.data : []);
    },
  });

  // Mutation: Direct conversation
  const directMutation = useMutation({
    mutationFn: async (userId: string) => {
      const res = await axios.post<{ _id: string; [key: string]: any }>("/conversations", {
        userId,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      if (data._id) setActiveConversationId(data._id);
      toast.success("Conversation opened");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to start conversation");
    },
  });

  // Mutation: Group conversation
  const groupMutation = useMutation({
    mutationFn: async ({
      name,
      participantIds,
    }: {
      name: string;
      participantIds: string[];
    }) => {
      const res = await axios.post<Conversation>("/conversations/group", {
        name: name.trim(),
        participantIds,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      if (data._id) setActiveConversationId(data._id);
      toast.success(`Group "${data.name}" created!`);
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to create group");
    },
  });

  // Mutation: Rename group
  const renameMutation = useMutation({
    mutationFn: async ({
      conversationId,
      name,
    }: {
      conversationId: string;
      name: string;
    }) => {
      const res = await axios.patch<Conversation>(`/conversations/${conversationId}`, {
        name: name.trim(),
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Group renamed successfully");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to rename group");
    },
  });

  // Mutation: Add members
  const addMembersMutation = useMutation({
    mutationFn: async ({
      conversationId,
      userIds,
    }: {
      conversationId: string;
      userIds: string[];
    }) => {
      const res = await axios.post(`/conversations/${conversationId}/participants`, {
        userIds,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Members added to group");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to add members");
    },
  });

  // Mutation: Leave group
  const leaveMutation = useMutation({
    mutationFn: async ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => {
      const res = await axios.delete(`/conversations/${conversationId}/participants/${userId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      setActiveConversationId(null);
      toast.info("You left the group");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to leave group");
    },
  });

  // Update last message in TanStack Query cache
  const updateConversationLastMessage = useCallback(
    (conversationId: string, lastMessage: LastMessage) => {
      queryClient.setQueryData<Conversation[]>(["conversations"], (old = []) => {
        const found = old.find((c) => c._id === conversationId);
        if (!found) {
          queryClient.invalidateQueries({ queryKey: ["conversations"] });
          return old;
        }

        const updated = old.map((conv) => {
          if (conv._id === conversationId) {
            return {
              ...conv,
              lastMessage,
              updatedAt: lastMessage.createdAt || new Date().toISOString(),
            };
          }
          return conv;
        });

        return updated.sort((a, b) => {
          const timeA = new Date(a.updatedAt || a.createdAt || 0).getTime();
          const timeB = new Date(b.updatedAt || b.createdAt || 0).getTime();
          return timeB - timeA;
        });
      });
    },
    [queryClient]
  );

  const activeConversation = useMemo(() => {
    if (!activeConversationId) return null;
    return conversations.find((c) => c._id === activeConversationId) || null;
  }, [conversations, activeConversationId]);

  return {
    conversations,
    activeConversationId,
    activeConversation,
    loading,
    error: queryError ? (queryError as any).message : null,
    setActiveConversationId,
    fetchConversations,
    startDirectConversation: (userId: string) => directMutation.mutateAsync(userId),
    createGroupConversation: (name: string, participantIds: string[]) =>
      groupMutation.mutateAsync({ name, participantIds }),
    renameGroup: (conversationId: string, name: string) =>
      renameMutation.mutateAsync({ conversationId, name }),
    addParticipants: (conversationId: string, userIds: string[]) =>
      addMembersMutation.mutateAsync({ conversationId, userIds }),
    removeParticipant: (conversationId: string, userId: string) =>
      leaveMutation.mutateAsync({ conversationId, userId }),
    updateConversationLastMessage,
  };
};
