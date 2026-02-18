import { ReactNode } from "react";

interface SectionShellProps {
  children: ReactNode;
  className?: string;
  /** Pass a custom inner wrapper class (e.g. for full-bleed sections) */
  innerClassName?: string;
  as?: "section" | "div" | "article";
}

/**
 * Shared section wrapper – consistent max-width, horizontal padding, and
 * vertical spacing across all interior pages.
 */
export default function SectionShell({
  children,
  className = "",
  innerClassName = "",
  as: Tag = "section",
}: SectionShellProps) {
  return (
    <Tag className={`py-20 md:py-28 ${className}`}>
      <div className={`max-w-6xl mx-auto px-5 md:px-8 ${innerClassName}`}>
        {children}
      </div>
    </Tag>
  );
}
