"use client";

import React, { forwardRef } from "react";
import { ChevronDown, AlertCircle } from "lucide-react";

export const Select = forwardRef(function Select(
  {
    id,
    name,
    label,
    options = [],
    required = false,
    error,
    helperText,
    placeholder = "Select an option...",
    className = "",
    ...props
  },
  ref
) {
  const selectId = id || name;

  const baseStyles =
    "w-full rounded-lg bg-white border text-zinc-900 transition-colors duration-150 outline-none text-sm font-normal appearance-none px-3.5 py-2.5 min-h-[44px] pr-10 cursor-pointer disabled:bg-zinc-50 disabled:text-zinc-400";

  const stateStyles = error
    ? "border-rose-500 focus:border-rose-600 focus:ring-1 focus:ring-rose-500"
    : "border-zinc-300 hover:border-zinc-400 focus:border-zinc-900 focus:ring-1 focus:ring-zinc-900";

  return (
    <div className={`flex flex-col gap-1.5 w-full ${className}`}>
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-semibold uppercase tracking-wider text-zinc-700"
        >
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      <div className="relative w-full">
        <select
          ref={ref}
          id={selectId}
          name={name}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined
          }
          className={`${baseStyles} ${stateStyles}`}
          {...props}
        >
          {placeholder && (
            <option value="" disabled className="text-zinc-400">
              {placeholder}
            </option>
          )}
          {options.map((opt) => {
            const value = typeof opt === "object" ? opt.value : opt;
            const labelText = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={value} value={value} className="text-zinc-900">
                {labelText}
              </option>
            );
          })}
        </select>

        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none">
          <ChevronDown className="w-4 h-4" />
        </div>
      </div>

      {error ? (
        <p
          id={`${selectId}-error`}
          className="text-xs text-rose-600 flex items-center gap-1.5 mt-0.5"
          role="alert"
        >
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p id={`${selectId}-helper`} className="text-xs text-zinc-500 mt-0.5">
          {helperText}
        </p>
      ) : null}
    </div>
  );
});
