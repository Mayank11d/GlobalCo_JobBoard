import * as React from "react"
import { cn } from "@/lib/utils"

export interface PaginationProps extends React.HTMLAttributes<HTMLDivElement> {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

export function Pagination({ className, currentPage, totalPages, onPageChange, ...props }: PaginationProps) {
  return (
    <div className={cn("flex justify-center items-center gap-md mt-xl pt-lg border-t border-outline-variant", className)} {...props}>
      <button 
        disabled={currentPage <= 1}
        onClick={() => onPageChange?.(currentPage - 1)}
        className="flex items-center justify-center w-10 h-10 rounded border border-outline-variant text-on-surface-variant hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_left</span>
      </button>
      
      <div className="flex gap-sm">
        {/* Render a few page numbers for demo purposes */}
        <button 
          className={cn(
            "w-10 h-10 rounded font-label-md text-label-md flex items-center justify-center transition-colors",
            currentPage === 1 
              ? "bg-primary-container text-on-primary" 
              : "border border-outline-variant text-on-surface hover:bg-surface-container-high"
          )}
          onClick={() => onPageChange?.(1)}
        >
          1
        </button>
        <button 
          className={cn(
            "w-10 h-10 rounded font-label-md text-label-md flex items-center justify-center transition-colors",
            currentPage === 2 
              ? "bg-primary-container text-on-primary" 
              : "border border-outline-variant text-on-surface hover:bg-surface-container-high"
          )}
          onClick={() => onPageChange?.(2)}
        >
          2
        </button>
        <button 
          className={cn(
            "w-10 h-10 rounded font-label-md text-label-md flex items-center justify-center transition-colors",
            currentPage === 3 
              ? "bg-primary-container text-on-primary" 
              : "border border-outline-variant text-on-surface hover:bg-surface-container-high"
          )}
          onClick={() => onPageChange?.(3)}
        >
          3
        </button>
        <span className="w-10 h-10 flex items-center justify-center text-on-surface-variant">...</span>
        <button 
          className={cn(
            "w-10 h-10 rounded font-label-md text-label-md flex items-center justify-center transition-colors",
            currentPage === totalPages 
              ? "bg-primary-container text-on-primary" 
              : "border border-outline-variant text-on-surface hover:bg-surface-container-high"
          )}
          onClick={() => onPageChange?.(totalPages)}
        >
          {totalPages}
        </button>
      </div>
      
      <button 
        disabled={currentPage >= totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
        className="flex items-center justify-center w-10 h-10 rounded border border-outline-variant text-on-surface hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className="material-symbols-outlined text-[20px]">chevron_right</span>
      </button>
    </div>
  )
}
