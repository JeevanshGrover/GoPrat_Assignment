"use client";

import React from "react";
import { Check, AlertCircle } from "lucide-react";

export function MultiSelect({
  id,
  name,
  label,
  options = [],
  value = [],
  onChange,
  required = false,
  error,
  helperText,
  className = "",
}) {
  const selectId = id || name;
  const currentValues = Array.isArray(value) ? value : [];

  const handleToggle = (optionValue) => {
    let next;
    if (currentValues.includes(optionValue)) {
      next = currentValues.filter((v) => v !== optionValue);
    } else {
      next = [...currentValues, optionValue];
    }
    onChange?.(next);
  };

  return (
    <div className={`flex flex-col gap-2 w-full ${className}`} id={selectId}>
      {label && (
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
            {label} {required && <span className="text-rose-500">*</span>}
          </label>
          {currentValues.length > 0 && (
            <span className="text-xs font-medium text-zinc-700 bg-zinc-100 px-2 py-0.5 rounded border border-zinc-200">
              {currentValues.length} selected
            </span>
          )}
        </div>
      )}

      <div
        className={`grid grid-cols-2 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-zinc-50 border ${
          error ? "border-rose-500" : "border-zinc-200"
        }`}
      >
        {options.map((opt) => {
          const optVal = typeof opt === "object" ? opt.value : opt;
          const optLabel = typeof opt === "object" ? opt.label : opt;
          const isSelected = currentValues.includes(optVal);

          return (
            <button
              key={optVal}
              type="button"
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => handleToggle(optVal)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-xs font-medium border text-left transition-colors cursor-pointer min-h-[40px] ${
                isSelected
                  ? "bg-zinc-900 border-zinc-900 text-white"
                  : "bg-white hover:bg-zinc-100 border-zinc-200 text-zinc-700"
              }`}
            >
              <div
                className={`w-3.5 h-3.5 rounded flex items-center justify-center shrink-0 border ${
                  isSelected
                    ? "bg-zinc-900 border-white text-white"
                    : "border-zinc-300 bg-white"
                }`}
              >
                {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
              </div>
              <span className="truncate">{optLabel}</span>
            </button>
          );
        })}
      </div>

      {error ? (
        <p className="text-xs text-rose-600 flex items-center gap-1.5 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : helperText ? (
        <p className="text-xs text-zinc-500 mt-0.5">{helperText}</p>
      ) : null}
    </div>
  );
}
