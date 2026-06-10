"use client";

import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

interface GradientTextProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "warm";
  as?: "h1" | "h2" | "h3" | "h4" | "span";
}

export function GradientText({
  className,
  variant = "primary",
  as: Tag = "span",
  children,
  ...props
}: GradientTextProps) {
  return (
    <Tag
      className={cn(
        variant === "primary" ? "gradient-text" : "gradient-text-warm",
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}
