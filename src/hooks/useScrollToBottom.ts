"use client";

import { useRef, useState, useEffect, useCallback, useLayoutEffect } from "react";

export interface UseScrollToBottomOptions {
  conversationId?: string;
  itemsCount?: number;
  lastMessageId?: string;
}

export const useScrollToBottom = <T extends HTMLElement = HTMLDivElement>(
  options: UseScrollToBottomOptions | any[]
) => {
  const containerRef = useRef<T | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // User position tracker: true if within 120px of bottom
  const isAtBottomRef = useRef<boolean>(true);
  const [showScrollButton, setShowScrollButton] = useState<boolean>(false);

  // Track conversation switches & initial load
  const isInitialLoadRef = useRef<boolean>(true);
  const prevConversationIdRef = useRef<string | undefined>(undefined);
  const prevItemsCountRef = useRef<number>(0);

  // Normalize options whether passed as an object or legacy dependency array
  const isArray = Array.isArray(options);
  const conversationId = isArray ? options[1] : options?.conversationId;
  const itemsCount = isArray ? options[0] : options?.itemsCount ?? 0;
  const lastMessageId = isArray ? undefined : options?.lastMessageId;

  // Scroll to bottom helper
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = containerRef.current;
    if (!el) return;

    if (behavior === "auto") {
      el.scrollTop = el.scrollHeight;
    } else {
      el.scrollTo({
        top: el.scrollHeight,
        behavior: "smooth",
      });
    }

    isAtBottomRef.current = true;
    setShowScrollButton(false);
  }, []);

  // Check scroll position to determine if the user is at the bottom
  const checkIfAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    // Distance from the bottom of the scroll container
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const atBottom = distanceFromBottom < 100;

    isAtBottomRef.current = atBottom;
    setShowScrollButton(!atBottom);
  }, []);

  // Scroll event handler
  const onScroll = useCallback(() => {
    checkIfAtBottom();
  }, [checkIfAtBottom]);

  // Reset state when switching conversations
  useEffect(() => {
    if (conversationId !== prevConversationIdRef.current) {
      prevConversationIdRef.current = conversationId;
      isInitialLoadRef.current = true;
      isAtBottomRef.current = true;
      setShowScrollButton(false);
      prevItemsCountRef.current = 0;
    }
  }, [conversationId]);

  // Auto-scroll logic when items or conversation change
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || itemsCount === 0) return;

    // 1. Initial conversation open / initial load: jump directly to bottom
    if (isInitialLoadRef.current) {
      const scrollToBottomInstant = () => {
        if (containerRef.current) {
          containerRef.current.scrollTop = containerRef.current.scrollHeight;
        }
      };

      scrollToBottomInstant();
      // Double rAF ensures all nested DOM elements (e.g. fonts, avatars) are painted
      const raf1 = requestAnimationFrame(() => {
        scrollToBottomInstant();
        const raf2 = requestAnimationFrame(() => {
          scrollToBottomInstant();
          isInitialLoadRef.current = false;
          isAtBottomRef.current = true;
          setShowScrollButton(false);
        });
        return () => cancelAnimationFrame(raf2);
      });

      return () => cancelAnimationFrame(raf1);
    }

    // 2. New message arrived: only scroll if the user was already at the bottom
    if (itemsCount > prevItemsCountRef.current) {
      if (isAtBottomRef.current) {
        requestAnimationFrame(() => {
          scrollToBottom("smooth");
        });
      } else {
        // User has scrolled up to read history -> DO NOT force scroll, show floating button
        setShowScrollButton(true);
      }
    }

    prevItemsCountRef.current = itemsCount;
  }, [itemsCount, lastMessageId, conversationId, scrollToBottom]);

  return {
    containerRef,
    bottomRef,
    isAtBottom: isAtBottomRef.current,
    showScrollButton,
    scrollToBottom,
    onScroll,
  };
};
