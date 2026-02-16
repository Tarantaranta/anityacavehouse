"use client";

import { ReactNode } from "react";

interface SoftSnapProps {
  children: ReactNode;
  className?: string;
  snapAlign?: "start" | "center" | "end";
}

export default function SoftSnap({
  children,
  className = "",
  snapAlign = "start",
}: SoftSnapProps) {
  const snapClass =
    snapAlign === "center"
      ? "snap-center"
      : snapAlign === "end"
      ? "snap-end"
      : "snap-start";

  return (
    <div className={`snap-always ${snapClass} ${className}`}>
      {children}
    </div>
  );
}
