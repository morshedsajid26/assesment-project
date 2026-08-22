"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { useAxios } from "./useAxios";
import { Conversation, LastMessage } from "@/src/types";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useConversations = () => {
  const axios = useAxios();
  const queryClient = useQueryClient();
  const [activeConversationIdState, setActiveConversationIdState] = useState<string | null>(null);
  const [readTimestamps, setReadTimestamps] = useState<Record<string, string>>({});
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [hasInitializedTimestamps, setHasInitializedTimestamps] = useState(false);

  // Sync state with localStorage on mount
  useEffect(() => {
    try {
      const savedConv = localStorage.getItem("activeConversationId");
      if (savedConv) setActiveConversationIdState(savedConv);

      const savedTimestamps = localStorage.getItem("readTimestamps");
      if (savedTimestamps) {
        setReadTimestamps(JSON.parse(savedTimestamps));
      }

      const savedCounts = localStorage.getItem("unreadCounts");
      if (savedCounts) {
        setUnreadCounts(JSON.parse(savedCounts));
      }
    } catch (e) {
      console.error("Failed to load local storage data", e);
    }
  }, []);

  const setActiveConversationId = useCallback((id: string | null) => {
    setActiveConversationIdState(id);
    if (id) {
      localStorage.setItem("activeConversationId", id);
      setReadTimestamps(prev => {
        const next = { ...prev, [id]: new Date().toISOString() };
        localStorage.setItem("readTimestamps", JSON.stringify(next));
        return next;
      });
      setUnreadCounts(prev => {
        const next = { ...prev };
        delete next[id];
        localStorage.setItem("unreadCounts", JSON.stringify(next));
        return next;
      });
    } else {
      localStorage.removeItem("activeConversationId");
    }
  }, []);

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

  // Initialize read timestamps for new conversations
  useEffect(() => {
    if (conversations.length > 0 && !hasInitializedTimestamps) {
      setHasInitializedTimestamps(true);
      setReadTimestamps((prev) => {
        const next = { ...prev };
        let modified = false;
        conversations.forEach((conv) => {
          if (!next[conv._id]) {
            next[conv._id] = new Date().toISOString(); // mark as read by default
            modified = true;
          }
        });
        if (modified) localStorage.setItem("readTimestamps", JSON.stringify(next));
        return next;
      });
    }
  }, [conversations, hasInitializedTimestamps]);

  // Compute unread counts dynamically based on timestamps + manual socket counts
  const computedUnreadCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    conversations.forEach(conv => {
      const manualCount = unreadCounts[conv._id] || 0;
      
      if (manualCount > 0) {
        // We have an exact count from live sockets
        counts[conv._id] = manualCount;
      } else if (conv.lastMessage && conv.lastMessage.createdAt) {
        // Fallback for offline messages: compare timestamps
        const readTime = readTimestamps[conv._id] || "1970-01-01T00:00:00.000Z";
        if (new Date(conv.lastMessage.createdAt).getTime() > new Date(readTime).getTime()) {
          counts[conv._id] = 1;
        } else {
          counts[conv._id] = 0;
        }
      } else {
        counts[conv._id] = 0;
      }
    });
    return counts;
  }, [conversations, readTimestamps, unreadCounts]);

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

  // Mutation: Promote member to admin
  const promoteAdminMutation = useMutation({
    mutationFn: async ({
      conversationId,
      userId,
    }: {
      conversationId: string;
      userId: string;
    }) => {
      const res = await axios.post<Conversation>(`/conversations/${conversationId}/admins`, {
        userId,
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Member promoted to admin");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to promote to admin");
    },
  });

  // Mutation: Remove member (Admin kicks a member)
  const removeMemberMutation = useMutation({
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
      toast.success("Member removed from group");
    },
    onError: (err: any) => {
      toast.error(err.response?.data?.message || "Failed to remove member");
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
    (conversationId: string, lastMessage: LastMessage, isIncoming: boolean = false) => {
      if (isIncoming && conversationId !== activeConversationIdState) {
        setUnreadCounts((prev) => {
          const currentCount = prev[conversationId] || 0;
          const next = { ...prev, [conversationId]: currentCount + 1 };
          localStorage.setItem("unreadCounts", JSON.stringify(next));
          return next;
        });
      }

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
    [queryClient, activeConversationIdState]
  );

  const activeConversation = useMemo(() => {
    if (!activeConversationIdState) return null;
    return conversations.find((c) => c._id === activeConversationIdState) || null;
  }, [conversations, activeConversationIdState]);

  return {
    conversations,
    activeConversationId: activeConversationIdState,
    activeConversation,
    unreadCounts: computedUnreadCounts,
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
    promoteToAdmin: (conversationId: string, userId: string) =>
      promoteAdminMutation.mutateAsync({ conversationId, userId }),
    removeMember: (conversationId: string, userId: string) =>
      removeMemberMutation.mutateAsync({ conversationId, userId }),
    leaveGroup: (conversationId: string, userId: string) =>
      leaveMutation.mutateAsync({ conversationId, userId }),
    removeParticipant: (conversationId: string, userId: string) =>
      removeMemberMutation.mutateAsync({ conversationId, userId }),
    updateConversationLastMessage,
  };
};
