"use client";

import React from "react";
import { Check } from "lucide-react";
import { useWizard } from "@/context/WizardContext";
import { CATEGORIES } from "@/config/categoryConfig";

export function Stepper() {
  const { currentStep, dispatch, category } = useWizard();

  const currentCategoryConfig = CATEGORIES[category] || CATEGORIES.planner;

  const steps = [
    {
      number: 1,
      title: "Event Basics",
      subtitle: "Date, location & category",
    },
    {
      number: 2,
      title: `${currentCategoryConfig.shortName} Details`,
      subtitle: currentCategoryConfig.step2Title,
    },
    {
      number: 3,
      title: "Additional Details",
      subtitle: currentCategoryConfig.step3Title,
    },
    {
      number: 4,
      title: "Review & Submit",
      subtitle: "Verify all details",
    },
  ];

  const activeStep = currentStep === 5 ? 4 : currentStep;

  const handleStepClick = (stepNum) => {
    if (stepNum < currentStep && currentStep <= 4) {
      dispatch({ type: "SET_STEP", payload: stepNum });
    }
  };

  return (
    <nav aria-label="Wizard Steps Progress" className="w-full">
      <div className="flex md:hidden items-center justify-between p-3 rounded-lg bg-white border border-zinc-200">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
            Step {Math.min(activeStep, 4)} of 4
          </span>
          <h3 className="text-sm font-semibold text-zinc-900">
            {steps[Math.min(activeStep, 4) - 1]?.title}
          </h3>
        </div>
        <div className="flex items-center gap-1.5">
          {steps.map((s) => {
            const isCompleted = s.number < activeStep || currentStep === 5;
            const isCurrent = s.number === activeStep && currentStep !== 5;
            return (
              <button
                key={s.number}
                type="button"
                onClick={() => handleStepClick(s.number)}
                disabled={s.number >= currentStep}
                aria-label={`Step ${s.number}: ${s.title}`}
                className={`w-7 h-7 rounded-md text-xs font-semibold flex items-center justify-center transition-colors ${
                  isCompleted
                    ? "bg-zinc-900 text-white cursor-pointer"
                    : isCurrent
                    ? "bg-zinc-100 text-zinc-900 border border-zinc-400 font-bold"
                    : "bg-zinc-50 text-zinc-400 border border-zinc-200 cursor-not-allowed"
                }`}
              >
                {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : s.number}
              </button>
            );
          })}
        </div>
      </div>

      <ol className="hidden md:grid md:grid-cols-4 gap-2.5">
        {steps.map((step) => {
          const isCompleted = step.number < activeStep || currentStep === 5;
          const isCurrent = step.number === activeStep && currentStep !== 5;
          const isClickable = step.number < currentStep && currentStep <= 4;

          return (
            <li key={step.number}>
              <button
                type="button"
                onClick={() => handleStepClick(step.number)}
                disabled={!isClickable}
                aria-current={isCurrent ? "step" : undefined}
                className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-colors ${
                  isCurrent
                    ? "bg-white border-zinc-900 ring-1 ring-zinc-900"
                    : isCompleted
                    ? "bg-white border-zinc-200 hover:border-zinc-300 cursor-pointer"
                    : "bg-zinc-50/70 border-zinc-200 opacity-60 cursor-not-allowed"
                }`}
              >
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-semibold shrink-0 ${
                    isCompleted
                      ? "bg-zinc-900 text-white"
                      : isCurrent
                      ? "bg-zinc-900 text-white"
                      : "bg-zinc-200 text-zinc-600"
                  }`}
                >
                  {isCompleted ? (
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <span>{step.number}</span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <span className="text-[10px] uppercase font-semibold text-zinc-500">
                      Step {step.number}
                    </span>
                    {isCompleted && (
                      <span className="text-[10px] text-zinc-400">(edit)</span>
                    )}
                  </div>
                  <h4 className="text-xs font-semibold text-zinc-900 truncate">
                    {step.title}
                  </h4>
                  <p className="text-[11px] text-zinc-500 truncate mt-0.5">
                    {step.subtitle}
                  </p>
                </div>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
