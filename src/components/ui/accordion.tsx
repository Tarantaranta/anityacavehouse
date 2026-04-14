"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface AccordionContextValue {
  value?: string | string[]
  onValueChange?: (value: string) => void
  type?: "single" | "multiple"
}

const AccordionContext = React.createContext<AccordionContextValue>({})

interface AccordionProps {
  children: React.ReactNode
  type?: "single" | "multiple"
  defaultValue?: string | string[]
  className?: string
}

function Accordion({
  children,
  type = "single",
  defaultValue,
  className,
}: AccordionProps) {
  const [value, setValue] = React.useState<string | string[]>(
    defaultValue || (type === "multiple" ? [] : "")
  )

  const onValueChange = React.useCallback(
    (itemValue: string) => {
      if (type === "multiple") {
        const currentValues = Array.isArray(value) ? value : []
        setValue(
          currentValues.includes(itemValue)
            ? currentValues.filter((v) => v !== itemValue)
            : [...currentValues, itemValue]
        )
      } else {
        setValue(value === itemValue ? "" : itemValue)
      }
    },
    [type, value]
  )

  return (
    <AccordionContext.Provider value={{ value, onValueChange, type }}>
      <div className={cn("space-y-2", className)}>{children}</div>
    </AccordionContext.Provider>
  )
}

interface AccordionItemProps {
  children: React.ReactNode
  value: string
  className?: string
}

function AccordionItem({ children, value, className }: AccordionItemProps) {
  const context = React.useContext(AccordionContext)
  const isOpen = Array.isArray(context.value)
    ? context.value.includes(value)
    : context.value === value

  return (
    <div
      data-state={isOpen ? "open" : "closed"}
      className={cn(
        "border border-border rounded-lg overflow-hidden transition-all",
        className
      )}
    >
      <AccordionItemContext.Provider value={{ value, isOpen }}>
        {children}
      </AccordionItemContext.Provider>
    </div>
  )
}

interface AccordionItemContextValue {
  value: string
  isOpen: boolean
}

const AccordionItemContext = React.createContext<AccordionItemContextValue>({
  value: "",
  isOpen: false,
})

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

function AccordionTrigger({ children, className }: AccordionTriggerProps) {
  const { onValueChange } = React.useContext(AccordionContext)
  const { value, isOpen } = React.useContext(AccordionItemContext)

  return (
    <button
      onClick={() => onValueChange?.(value)}
      className={cn(
        "flex w-full items-center justify-between px-6 py-4 text-left font-medium transition-all hover:bg-surface-2",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 transition-transform duration-200",
          isOpen && "rotate-180"
        )}
      />
    </button>
  )
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

function AccordionContent({ children, className }: AccordionContentProps) {
  const { isOpen } = React.useContext(AccordionItemContext)

  return (
    <div
      className={cn(
        "overflow-hidden transition-all duration-200",
        isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
      )}
    >
      <div className={cn("px-6 pb-4 pt-0 text-sm text-muted-foreground", className)}>
        {children}
      </div>
    </div>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
