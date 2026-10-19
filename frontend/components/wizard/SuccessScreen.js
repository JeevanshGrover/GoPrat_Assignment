"use client";

import React, { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { CATEGORIES } from "@/config/categoryConfig";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { CheckCircle2, Copy, Check, PlusCircle, ArrowLeft } from "lucide-react";

export function SuccessScreen() {
  const { submissionResult, category, event, dispatch } = useWizard();
  const [copied, setCopied] = useState(false);

  const requirementId =
    submissionResult?._id || submissionResult?.id || "N/A";
  const requirementStatus = submissionResult?.status || "submitted";
  const currentCategoryConfig = CATEGORIES[category] || CATEGORIES.planner;

  const handleCopyId = () => {
    if (requirementId !== "N/A") {
      navigator.clipboard.writeText(requirementId);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handlePostAnother = () => {
    dispatch({ type: "RESET_WIZARD" });
  };

  return (
    <div className="max-w-xl mx-auto space-y-6 py-2">
      <div className="bg-white border border-zinc-200 rounded-xl p-7 sm:p-9 text-center space-y-5">
        <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
        </div>

        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
            Submission Confirmed
          </span>
          <h2 className="text-2xl font-bold text-zinc-900 mt-2">
            Requirement Successfully Created
          </h2>
          <p className="text-xs text-zinc-500 mt-1 max-w-sm mx-auto leading-relaxed">
            Your event requirement for{" "}
            <span className="font-semibold text-zinc-800">{event.name}</span> has
            been validated and saved to the database.
          </p>
        </div>

        <div className="p-3.5 rounded-lg bg-zinc-50 border border-zinc-200 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-left">
          <div className="min-w-0">
            <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider block">
              Requirement Document ID
            </span>
            <code className="text-xs font-mono text-zinc-800 font-semibold truncate block mt-0.5">
              {requirementId}
            </code>
          </div>

          <button
            type="button"
            onClick={handleCopyId}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-white hover:bg-zinc-100 text-zinc-700 text-xs font-medium border border-zinc-200 transition-colors cursor-pointer shrink-0"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 stroke-[3]" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-zinc-500" />
                <span>Copy ID</span>
              </>
            )}
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2.5 text-left pt-1">
          <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">
              Category
            </span>
            <span className="text-xs font-semibold text-zinc-800 block mt-0.5 truncate">
              {currentCategoryConfig.name}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">
              Status
            </span>
            <span className="text-xs font-semibold text-emerald-700 block mt-0.5 capitalize">
              {requirementStatus}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-50 border border-zinc-200">
            <span className="text-[10px] text-zinc-500 uppercase block font-semibold">
              City
            </span>
            <span className="text-xs font-semibold text-zinc-800 truncate block mt-0.5">
              {event.location || "—"}
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-center gap-2.5">
          <Button
            type="button"
            variant="primary"
            size="md"
            icon={PlusCircle}
            iconPosition="left"
            onClick={handlePostAnother}
            className="w-full sm:w-auto"
          >
            Post Another Requirement
          </Button>

          <Link href="/" className="w-full sm:w-auto">
            <Button
              type="button"
              variant="outline"
              size="md"
              icon={ArrowLeft}
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
