"use client"

import * as React from "react"
import { X } from "lucide-react"

interface DialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children: React.ReactNode
}

export function Dialog({ open, onOpenChange, children }: DialogProps) {
  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [open])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-ink/60 backdrop-blur-sm animate-in fade-in-0 duration-300"
        onClick={() => onOpenChange(false)}
      />
      {/* Content */}
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-in fade-in-0 zoom-in-95 duration-300">
        {children}
      </div>
    </div>
  )
}

interface DialogContentProps {
  children: React.ReactNode
  onClose?: () => void
  className?: string
}

export function DialogContent({ children, onClose, className = "" }: DialogContentProps) {
  return (
    <div className={`relative bg-surface border border-border/40 rounded-2xl shadow-2xl ${className}`}>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-surface/80 backdrop-blur-sm border border-border/40 hover:bg-surface-2 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-ink" strokeWidth={2} />
        </button>
      )}
      {children}
    </div>
  )
}

export function DialogHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`space-y-2 ${className}`}>{children}</div>
}

export function DialogTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <h2 className={`text-2xl md:text-3xl font-serif text-ink tracking-tight leading-tight ${className}`}>
      {children}
    </h2>
  )
}

export function DialogDescription({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`text-[14px] text-muted-foreground/70 font-light italic leading-relaxed ${className}`}>
      {children}
    </p>
  )
}
