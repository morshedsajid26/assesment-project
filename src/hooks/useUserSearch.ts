"use client";

import { useState, useEffect, useRef } from "react";
import { useAxios } from "./useAxios";
import { User } from "@/src/types";
import { useQuery } from "@tanstack/react-query";

export const useUserSearch = (excludeUserId?: string) => {
  const axios = useAxios();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Debounce query
  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 250);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [query]);

  // TanStack Query for searching & preloading users
  const {
    data: results = [],
    isLoading: searching,
    error,
  } = useQuery<User[]>({
    queryKey: ["users", debouncedQuery],
    queryFn: async () => {
      // If query is present, search with ?q=, otherwise fetch all/recent users with /users/search
      const url = debouncedQuery
        ? `/users/search?q=${encodeURIComponent(debouncedQuery)}`
        : `/users/search`;

      const res = await axios.get<User[]>(url);
      const users = Array.isArray(res.data) ? res.data : [];
      return excludeUserId ? users.filter((u) => u._id !== excludeUserId) : users;
    },
    staleTime: 1000 * 30, // 30 seconds cache
  });

  const clear = () => {
    setQuery("");
    setDebouncedQuery("");
  };

  return {
    query,
    setQuery,
    results,
    searching: searching || (query.trim() !== debouncedQuery),
    error: error ? (error as any).message : null,
    clear,
  };
};
