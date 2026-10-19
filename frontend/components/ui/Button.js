"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  disabled = false,
  className = "",
  type = "button",
  icon: Icon,
  iconPosition = "left",
  ...props
}) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-lg transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs min-h-[38px] gap-1.5",
    md: "px-4 py-2.5 text-sm min-h-[44px] gap-2",
    lg: "px-5 py-3 text-sm min-h-[48px] gap-2",
  };

  const variants = {
    primary:
      "bg-zinc-900 hover:bg-zinc-800 text-white border border-zinc-900 focus-visible:ring-zinc-900",
    secondary:
      "bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 focus-visible:ring-zinc-400",
    outline:
      "border border-zinc-300 hover:border-zinc-400 text-zinc-700 hover:text-zinc-900 bg-white hover:bg-zinc-50 focus-visible:ring-zinc-400",
    ghost:
      "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 focus-visible:ring-zinc-400",
    danger:
      "bg-rose-600 hover:bg-rose-700 text-white border border-rose-600 focus-visible:ring-rose-500",
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variants[variant] || variants.primary
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Processing...</span>
        </>
      ) : (
        <>
          {Icon && iconPosition === "left" && <Icon className="w-4 h-4 shrink-0" />}
          <span>{children}</span>
          {Icon && iconPosition === "right" && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
}
