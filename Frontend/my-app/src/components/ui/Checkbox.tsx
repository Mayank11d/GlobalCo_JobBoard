import * as React from "react"
import { cn } from "@/lib/utils"

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className="flex items-center gap-sm cursor-pointer group">
        <input 
          type="checkbox"
          className={cn(
            "w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary cursor-pointer transition-colors",
            className
          )}
          ref={ref}
          {...props} 
        />
        {label && (
          <span className="font-body-sm text-body-sm text-on-surface group-hover:text-on-surface transition-colors">
            {label}
          </span>
        )}
      </label>
    )
  }
)
Checkbox.displayName = "Checkbox"

export { Checkbox }
