"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export const useScrollToBottom = <T extends HTMLElement>(dependencies: any[]) => {
  const containerRef = useRef<T>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const prevScrollHeightRef = useRef<number>(0);

  const checkIfAtBottom = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    // If distance from bottom is less than 120px, consider at bottom
    const distanceFromBottom = scrollHeight - scrollTop - clientHeight;
    const atBottom = distanceFromBottom < 120;

    setIsAtBottom(atBottom);
    setShowScrollButton(!atBottom);
  }, []);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "smooth") => {
    const el = containerRef.current;
    if (!el) return;

    el.scrollTo({
      top: el.scrollHeight,
      behavior,
    });
    setIsAtBottom(true);
    setShowScrollButton(false);
  }, []);

  // Handle scroll event
  const onScroll = useCallback(() => {
    checkIfAtBottom();
  }, [checkIfAtBottom]);

  // When dependencies (e.g. messages array) change
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    // If previously at bottom, auto scroll to new bottom
    if (isAtBottom) {
      // Use instant scroll for initial load, smooth for updates
      const isInitial = prevScrollHeightRef.current === 0;
      scrollToBottom(isInitial ? "auto" : "smooth");
    }

    prevScrollHeightRef.current = el.scrollHeight;
  }, [dependencies, isAtBottom, scrollToBottom]);

  return {
    containerRef,
    isAtBottom,
    showScrollButton,
    scrollToBottom,
    onScroll,
  };
};
