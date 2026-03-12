"use client";

import { ReactNode } from "react";
import { useImageProtection } from "@/hooks/useImageProtection";

interface ImageProtectionProviderProps {
  children: ReactNode;
  enabled?: boolean;
}

/**
 * Global image protection provider
 * Wrap app layout to enable site-wide protection against:
 * - Right-click context menu save
 * - Drag-to-desktop save
 * - iOS/Android long-press save
 * - Keyboard shortcuts (Ctrl+S / Cmd+S)
 *
 * Zero visual impact, <1ms overhead using event delegation
 *
 * @example
 * ```tsx
 * <ImageProtectionProvider>
 *   <YourApp />
 * </ImageProtectionProvider>
 * ```
 *
 * @example Disable for development
 * ```tsx
 * <ImageProtectionProvider enabled={process.env.NODE_ENV === 'production'}>
 *   <YourApp />
 * </ImageProtectionProvider>
 * ```
 */
export default function ImageProtectionProvider({
  children,
  enabled = true,
}: ImageProtectionProviderProps) {
  // Enable protection hook with comprehensive settings
  useImageProtection({
    preventContextMenu: enabled,
    preventDrag: enabled,
    preventKeyboardSave: enabled,
    targetSelector: "img, picture, figure, [data-protected]",
  });

  // Pass through children without wrapper
  // No additional DOM nodes = zero layout impact
  return <>{children}</>;
}
