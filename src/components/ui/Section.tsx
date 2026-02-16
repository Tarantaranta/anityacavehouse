import React from "react";

export default function Section({
  children,
  className = "",
  tone = "base",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "base" | "warm";
}) {
  const bg = tone === "warm" ? "bg-surface-2" : "bg-surface";

  return (
    <section className={`${bg} py-24 md:py-32 ${className}`}>{children}</section>
  );
}
