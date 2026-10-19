"use client";

import React, { forwardRef } from "react";
import { AlertCircle } from "lucide-react";

export const Input = forwardRef(function Input(
  {
    id,
    name,
    label,
    type = "text",
    required = false,
    error,
    helperText,
    placeholder,
    className = "",
    icon: Icon,
    min,
    max,
    maxLength,
    rows = 4,
    ...props
  },
  ref
) {
  const inputId = id || name;
  const isTextarea = type === "textarea";

  const baseInputStyles =
    "w-full rounded-lg bg-white border text-zinc-900 placeholder-zinc-400 transition-colors duration-150 outline-none text-sm font-normal disabled:bg-zinc-50 disabled:text-zinc-400";

  const stateStyles = error
    ? "border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-500"
    : "border-zinc-300 hover:border-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900";

  const paddingStyles = isTextarea
    ? "p-3"
    : Icon
    ? "pl-9 pr-3.5 py-2.5 min-h-[44px]"
    : "px-3.5 py-2.5 min-h-[44px]";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-semibold uppercase tracking-wider text-zinc-700 flex items-center justify-between"
        >
          <span>
            {label} {required && <span className="text-rose-500">*</span>}
          </span>
          {maxLength && (
            <span className="text-[11px] font-normal text-zinc-400 lowercase">
              max {maxLength} chars
            </span>
          )}
        </label>
      )}

      <div className="relative w-full">
        {Icon && !isTextarea && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}

        {isTextarea ? (
          <textarea
            ref={ref}
            id={inputId}
            name={name}
            rows={rows}
            maxLength={maxLength}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={`${baseInputStyles} ${stateStyles} ${paddingStyles} resize-y`}
            {...props}
          />
        ) : (
          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            min={min}
            max={max}
            maxLength={maxLength}
            placeholder={placeholder}
            aria-invalid={!!error}
            aria-describedby={
              error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined
            }
            className={`${baseInputStyles} ${stateStyles} ${paddingStyles}`}
            {...props}
          />
        )}
      </div>

      {error ? (
        <p
          id={`${inputId}-error`}
          className="text-xs text-rose-600 flex items-center gap-1.5 mt-0.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${inputId}-helper`} className="text-xs text-zinc-500 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
