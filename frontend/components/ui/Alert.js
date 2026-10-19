"use client";

import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info, X } from "lucide-react";

export function Alert({
  variant = "info",
  title,
  children,
  onDismiss,
  className = "",
}) {
  const variants = {
    info: {
      bg: "bg-blue-50 border-blue-200 text-blue-900",
      iconColor: "text-blue-600",
      Icon: Info,
    },
    warning: {
      bg: "bg-amber-50 border-amber-200 text-amber-900",
      iconColor: "text-amber-600",
      Icon: AlertTriangle,
    },
    error: {
      bg: "bg-rose-50 border-rose-200 text-rose-900",
      iconColor: "text-rose-600",
      Icon: AlertCircle,
    },
    success: {
      bg: "bg-emerald-50 border-emerald-200 text-emerald-900",
      iconColor: "text-emerald-600",
      Icon: CheckCircle2,
    },
  }[variant] || {
    bg: "bg-zinc-100 border-zinc-200 text-zinc-900",
    iconColor: "text-zinc-600",
    Icon: Info,
  };

  const { Icon, iconColor, bg } = variants;

  return (
    <div
      role="alert"
      className={`flex items-start gap-3 p-3.5 rounded-lg border text-sm ${bg} ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 ${iconColor} mt-0.5`} />
      <div className="flex-1">
        {title && <h5 className="font-semibold text-zinc-900 mb-0.5 text-xs">{title}</h5>}
        <div className="text-xs leading-relaxed">{children}</div>
      </div>
      {onDismiss && (
        <button
          type="button"
          onClick={onDismiss}
          className="text-zinc-500 hover:text-zinc-700 p-0.5 rounded transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}
