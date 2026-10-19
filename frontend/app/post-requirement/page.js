"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { WizardProvider, useWizard } from "@/context/WizardContext";
import { Stepper } from "@/components/wizard/Stepper";
import { StepBasics } from "@/components/wizard/StepBasics";
import { DynamicStep } from "@/components/wizard/DynamicStep";
import { StepReview } from "@/components/wizard/StepReview";
import { SuccessScreen } from "@/components/wizard/SuccessScreen";
import { checkHealth } from "@/lib/api";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

function WizardContent() {
  const { currentStep } = useWizard();
  const [apiStatus, setApiStatus] = useState("checking");

  useEffect(() => {
    checkHealth().then((res) => {
      setApiStatus(res.healthy ? "online" : "offline");
    });
  }, []);

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-zinc-600 hover:text-zinc-900 text-xs font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Link>

            <div className="h-4 w-px bg-zinc-200" />

            <div className="flex items-center gap-2">
              <span className="font-bold tracking-tight text-zinc-900 text-sm">
                GoPratle
              </span>
              <span className="text-xs text-zinc-500">Requirement Posting</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium border ${
                apiStatus === "online"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : apiStatus === "checking"
                  ? "bg-amber-50 text-amber-700 border-amber-200"
                  : "bg-rose-50 text-rose-700 border-rose-200"
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  apiStatus === "online"
                    ? "bg-emerald-600"
                    : apiStatus === "checking"
                    ? "bg-amber-600"
                    : "bg-rose-600"
                }`}
              />
              <span>
                {apiStatus === "online"
                  ? "API Connected"
                  : apiStatus === "checking"
                  ? "Checking..."
                  : "API Offline"}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
        {currentStep <= 4 && (
          <div className="space-y-5">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight">
                Post an Event Requirement
              </h1>
              <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                Complete the four steps below to publish your requirement for an event planner, performer, or crew.
              </p>
            </div>

            <Stepper />
          </div>
        )}

        <div className="w-full">
          {currentStep === 1 && <StepBasics />}
          {currentStep === 2 && <DynamicStep stepNumber={2} />}
          {currentStep === 3 && <DynamicStep stepNumber={3} />}
          {currentStep === 4 && <StepReview />}
          {currentStep === 5 && <SuccessScreen />}
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-4 text-center text-xs text-zinc-500">
        <p>GoPratle • Event Requirement Posting Flow</p>
      </footer>
    </div>
  );
}

export default function PostRequirementPage() {
  return (
    <WizardProvider>
      <WizardContent />
    </WizardProvider>
  );
}
