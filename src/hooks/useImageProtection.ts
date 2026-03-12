"use client";

import { useEffect } from "react";

interface UseImageProtectionOptions {
  preventContextMenu?: boolean;
  preventDrag?: boolean;
  preventKeyboardSave?: boolean;
  targetSelector?: string;
}

/**
 * High-performance image protection hook using event delegation
 * Uses single document-level listeners instead of per-image listeners
 * All listeners are passive where possible for scroll performance
 *
 * @example
 * ```tsx
 * useImageProtection({
 *   preventContextMenu: true,
 *   preventDrag: true,
 *   preventKeyboardSave: true,
 *   targetSelector: "img, picture, figure"
 * });
 * ```
 */
export function useImageProtection({
  preventContextMenu = true,
  preventDrag = true,
  preventKeyboardSave = true,
  targetSelector = "img, picture, figure",
}: UseImageProtectionOptions = {}) {
  useEffect(() => {
    // Only run on client
    if (typeof window === "undefined") return;

    // Respect reduced motion preference
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (prefersReducedMotion.matches) return;

    /**
     * Handler for context menu (right-click)
     * Uses capture phase for early interception
     */
    const handleContextMenu = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Fast selector matching (~0.01ms)
      if (target.matches && target.matches(targetSelector)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    /**
     * Handler for drag start
     * Prevents drag-to-save functionality
     */
    const handleDragStart = (e: DragEvent) => {
      const target = e.target as HTMLElement;

      if (target.matches && target.matches(targetSelector)) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    /**
     * Handler for keyboard shortcuts (Ctrl+S, Cmd+S)
     * Only prevents save when image is focused
     */
    const handleKeyDown = (e: KeyboardEvent) => {
      // Check for Ctrl+S (Windows/Linux) or Cmd+S (Mac)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        const target = document.activeElement as HTMLElement;

        if (target && target.matches && target.matches(targetSelector)) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    };

    // Attach listeners using capture phase for efficiency
    // Capture phase (true) = intercept early in event flow
    if (preventContextMenu) {
      document.addEventListener("contextmenu", handleContextMenu, true);
    }

    if (preventDrag) {
      document.addEventListener("dragstart", handleDragStart, true);
    }

    if (preventKeyboardSave) {
      // Note: keydown needs passive: false to allow preventDefault()
      document.addEventListener("keydown", handleKeyDown, { passive: false });
    }

    // Cleanup function - remove all listeners
    return () => {
      if (preventContextMenu) {
        document.removeEventListener("contextmenu", handleContextMenu, true);
      }
      if (preventDrag) {
        document.removeEventListener("dragstart", handleDragStart, true);
      }
      if (preventKeyboardSave) {
        document.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [preventContextMenu, preventDrag, preventKeyboardSave, targetSelector]);
}
