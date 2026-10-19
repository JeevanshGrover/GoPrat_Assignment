"use client";

import React from "react";
import { Sparkles, Mic, Users, Check } from "lucide-react";

const ICON_MAP = {
  planner: Sparkles,
  performer: Mic,
  crew: Users,
};

export function CategoryCard({
  categoryKey,
  name,
  tagline,
  description,
  isSelected = false,
  onClick,
}) {
  const Icon = ICON_MAP[categoryKey] || Sparkles;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={onClick}
      className={`relative flex flex-col p-4 rounded-xl border text-left transition-colors cursor-pointer ${
        isSelected
          ? "border-zinc-900 bg-zinc-50 ring-1 ring-zinc-900"
          : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/50"
      }`}
    >
      <div className="flex items-start justify-between gap-3 mb-2.5">
        <div
          className={`p-2 rounded-lg ${
            isSelected
              ? "bg-zinc-900 text-white"
              : "bg-zinc-100 text-zinc-700"
          }`}
        >
          <Icon className="w-4 h-4" />
        </div>

        <div
          className={`w-4 h-4 rounded-full border flex items-center justify-center ${
            isSelected
              ? "border-zinc-900 bg-zinc-900 text-white"
              : "border-zinc-300 bg-white"
          }`}
        >
          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-zinc-900">{name}</h4>
        <p className="text-xs font-medium text-zinc-500 mt-0.5 line-clamp-1">
          {tagline}
        </p>
        <p className="text-xs text-zinc-600 mt-2 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      {isSelected && (
        <div className="mt-3 pt-2.5 border-t border-zinc-200 flex items-center justify-between text-[11px]">
          <span className="text-zinc-600 font-medium">Selected category</span>
          <span className="text-[10px] font-semibold text-zinc-900 uppercase">
            Active
          </span>
        </div>
      )}
    </button>
  );
}
