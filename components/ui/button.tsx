"use client";

import { cn } from "@/lib/utils";
import { forwardRef, type ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "glass";
  size?: "sm" | "md" | "lg" | "xl";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading, children, disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(
          "relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer",
          // Variants
          variant === "primary" && [
            "bg-blue-600 text-white",
            "shadow-sm shadow-blue-600/20",
            "hover:bg-blue-700 hover:shadow-md hover:shadow-blue-600/30",
            "active:bg-blue-800 active:scale-[0.98]",
          ],
          variant === "secondary" && [
            "bg-white text-[#18352b] border border-gray-300",
            "hover:bg-gray-50 hover:border-gray-400",
            "active:bg-gray-100 active:scale-[0.98]",
          ],
          variant === "ghost" && [
            "text-gray-600 hover:text-[#18352b] hover:bg-gray-100",
          ],
          variant === "outline" && [
            "border border-gray-300 hover:border-blue-500 text-[#18352b] bg-transparent",
            "hover:bg-blue-50 hover:text-blue-600",
          ],
          variant === "glass" && [
            "bg-white text-[#18352b] border border-gray-200",
            "hover:bg-gray-50 hover:border-gray-300",
          ],
          // Sizes
          size === "sm" && "px-4 py-2 text-xs gap-1.5 rounded-lg",
          size === "md" && "px-5 py-2.5 text-sm gap-2",
          size === "lg" && "px-6 py-3 text-base gap-2.5",
          size === "xl" && "px-8 py-4 text-lg gap-3",
          className
        )}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export { Button, type ButtonProps };
