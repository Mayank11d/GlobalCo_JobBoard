import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "outline" | "success" | "warning" | "error"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  const baseStyles = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
  
  const variants = {
    default: "bg-primary-container text-on-primary-container",
    secondary: "bg-surface-container-high text-on-surface",
    outline: "text-on-surface border border-outline-variant",
    success: "bg-[#dcfce7] text-[#166534]",
    warning: "bg-[#fef08a] text-[#854d0e]",
    error: "bg-error-container text-on-error-container",
  }

  return (
    <div className={cn(baseStyles, variants[variant], className)} {...props} />
  )
}

export { Badge }
