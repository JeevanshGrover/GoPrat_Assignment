"use client";

import React, { useState } from "react";
import { useWizard } from "@/context/WizardContext";
import { CATEGORIES } from "@/config/categoryConfig";
import { Button } from "@/components/ui/Button";
import { Alert } from "@/components/ui/Alert";
import { createRequirement } from "@/lib/api";
import {
  Calendar,
  MapPin,
  Building,
  Edit2,
  ArrowLeft,
  Send,
  Briefcase,
  Clock,
} from "lucide-react";

export function StepReview() {
  const {
    formData,
    category,
    event,
    details,
    dispatch,
    submissionStatus,
    submissionError,
  } = useWizard();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const currentCategoryConfig = CATEGORIES[category] || CATEGORIES.planner;

  const handleEditStep = (stepNumber) => {
    dispatch({ type: "SET_STEP", payload: stepNumber });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  const formatCurrency = (val) => {
    if (val === undefined || val === null || val === "") return "—";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setErrorMessage(null);
    setFieldErrors({});
    dispatch({ type: "SUBMIT_START" });

    const payload = {
      category: formData.category,
      event: {
        name: formData.event.name,
        type: formData.event.type,
        dateMode: formData.event.dateMode,
        startDate: formData.event.startDate,
        location: formData.event.location,
      },
      details: { ...formData.details },
    };

    if (formData.event.dateMode === "range" && formData.event.endDate) {
      payload.event.endDate = formData.event.endDate;
    }

    if (formData.event.venue) {
      payload.event.venue = formData.event.venue;
    }

    try {
      const result = await createRequirement(payload);

      dispatch({
        type: "SUBMIT_SUCCESS",
        payload: result.data || result,
      });
    } catch (err) {
      console.error("Submission failed:", err);
      const detailsError = err.details;
      const msg =
        detailsError?.message ||
        err.message ||
        "Failed to submit requirement. Please check the details and retry.";

      setErrorMessage(msg);
      if (detailsError?.fieldErrors) {
        setFieldErrors(detailsError.fieldErrors);
      }

      dispatch({
        type: "SUBMIT_FAILURE",
        payload: {
          message: msg,
          fieldErrors: detailsError?.fieldErrors || {},
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {(errorMessage || submissionError) && (
        <Alert
          variant="error"
          title="Submission Issue"
          onDismiss={() => {
            setErrorMessage(null);
            dispatch({ type: "SUBMIT_FAILURE", payload: null });
          }}
        >
          <p>{errorMessage || submissionError?.message}</p>
          {Object.keys(fieldErrors).length > 0 && (
            <ul className="mt-2 list-disc list-inside space-y-1 text-xs">
              {Object.entries(fieldErrors).map(([field, msg]) => (
                <li key={field}>
                  <strong className="font-semibold">{field}:</strong> {msg}
                </li>
              ))}
            </ul>
          )}
        </Alert>
      )}

      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-6">
        <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
              Step 04 of 4 • Final Review
            </span>
            <h2 className="text-xl font-bold text-zinc-900 mt-0.5">
              Review & Submit Requirement
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verify your event basics and category specifications before posting.
            </p>
          </div>

          <span className="px-3 py-1 rounded bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 self-start sm:self-auto">
            {currentCategoryConfig.name}
          </span>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5 mb-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-zinc-600" />
              <span>Event Basics</span>
            </h3>
            <button
              type="button"
              onClick={() => handleEditStep(1)}
              className="text-xs text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1 px-2 py-0.5 rounded hover:bg-zinc-200/60 transition-colors cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 text-xs">
            <div>
              <span className="text-zinc-500 block mb-0.5">Event Name</span>
              <p className="text-sm font-semibold text-zinc-900">{event.name || "—"}</p>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5">Event Type</span>
              <span className="inline-block px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 font-medium text-xs">
                {event.type || "—"}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5">Schedule Mode</span>
              <span className="text-xs font-medium text-zinc-800 capitalize">
                {event.dateMode === "range" ? "Date Range" : "Single Day"}
              </span>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5">Date(s)</span>
              <p className="font-medium text-zinc-800">
                {event.dateMode === "range" ? (
                  <span>
                    {formatDate(event.startDate)} → {formatDate(event.endDate)}
                  </span>
                ) : (
                  <span>{formatDate(event.startDate)}</span>
                )}
              </p>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5">Location / City</span>
              <p className="font-medium text-zinc-800">{event.location || "—"}</p>
            </div>

            <div>
              <span className="text-zinc-500 block mb-0.5">Venue</span>
              <p className="font-medium text-zinc-800">
                {event.venue || "Optional / Not specified"}
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-lg border border-zinc-200 bg-zinc-50/50">
          <div className="flex items-center justify-between border-b border-zinc-200/80 pb-2.5 mb-3.5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-700 flex items-center gap-2">
              <Briefcase className="w-3.5 h-3.5 text-zinc-600" />
              <span>{currentCategoryConfig.name} Requirements</span>
            </h3>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleEditStep(2)}
                className="text-xs text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1 px-2 py-0.5 rounded hover:bg-zinc-200/60 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Step 2</span>
              </button>
              <button
                type="button"
                onClick={() => handleEditStep(3)}
                className="text-xs text-zinc-700 hover:text-zinc-900 font-medium flex items-center gap-1 px-2 py-0.5 rounded hover:bg-zinc-200/60 transition-colors cursor-pointer"
              >
                <Edit2 className="w-3 h-3" />
                <span>Edit Step 3</span>
              </button>
            </div>
          </div>

          {category === "planner" && (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Expected Guests</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.expectedGuests || "—"} guests
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Minimum Budget</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {formatCurrency(details.budgetMin)}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Maximum Budget</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {formatCurrency(details.budgetMax)}
                  </p>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1.5">Required Services</span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(details.services) && details.services.length > 0 ? (
                    details.services.map((svc) => (
                      <span
                        key={svc}
                        className="px-2.5 py-1 rounded bg-zinc-200 text-zinc-800 text-xs font-medium"
                      >
                        {svc}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500">None selected</span>
                  )}
                </div>
              </div>

              {details.notes && (
                <div>
                  <span className="text-zinc-500 block mb-0.5">Planning Notes</span>
                  <p className="p-2.5 rounded bg-white border border-zinc-200 text-zinc-800 text-xs whitespace-pre-wrap">
                    {details.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {category === "performer" && (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Performer Type</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.performerType || "—"}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Genre / Style</span>
                  <p className="text-sm font-medium text-zinc-800">
                    {details.genre || "Not specified"}
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Number of Performers</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.numberOfPerformers || "—"} artist(s)
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Performance Duration</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.durationMinutes || "—"} Minutes
                  </p>
                </div>

                <div>
                  <span className="text-zinc-500 block mb-1">Equipment Required</span>
                  <div className="flex flex-wrap gap-1">
                    {Array.isArray(details.equipmentRequired) &&
                    details.equipmentRequired.length > 0 ? (
                      details.equipmentRequired.map((eq) => (
                        <span
                          key={eq}
                          className="px-2 py-0.5 rounded bg-zinc-200 text-zinc-800 text-xs font-medium"
                        >
                          {eq}
                        </span>
                      ))
                    ) : (
                      <span className="text-zinc-500">None required</span>
                    )}
                  </div>
                </div>
              </div>

              {details.notes && (
                <div>
                  <span className="text-zinc-500 block mb-0.5">Artist Notes & Rider</span>
                  <p className="p-2.5 rounded bg-white border border-zinc-200 text-zinc-800 text-xs whitespace-pre-wrap">
                    {details.notes}
                  </p>
                </div>
              )}
            </div>
          )}

          {category === "crew" && (
            <div className="space-y-3.5 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <span className="text-zinc-500 block mb-0.5">Total Crew Count</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.crewCount || "—"} personnel
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Number of Days</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.numberOfDays || "—"} day(s)
                  </p>
                </div>
                <div>
                  <span className="text-zinc-500 block mb-0.5">Shift Hours</span>
                  <p className="text-sm font-semibold text-zinc-900">
                    {details.shiftHours || "—"} hrs / day
                  </p>
                </div>
              </div>

              <div>
                <span className="text-zinc-500 block mb-1">Required Crew Roles</span>
                <div className="flex flex-wrap gap-1.5">
                  {Array.isArray(details.roles) && details.roles.length > 0 ? (
                    details.roles.map((role) => (
                      <span
                        key={role}
                        className="px-2.5 py-1 rounded bg-zinc-200 text-zinc-800 text-xs font-medium"
                      >
                        {role}
                      </span>
                    ))
                  ) : (
                    <span className="text-zinc-500">None selected</span>
                  )}
                </div>
              </div>

              {details.notes && (
                <div>
                  <span className="text-zinc-500 block mb-0.5">Operational Brief</span>
                  <p className="p-2.5 rounded bg-white border border-zinc-200 text-zinc-800 text-xs whitespace-pre-wrap">
                    {details.notes}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <Button
          type="button"
          variant="outline"
          size="lg"
          icon={ArrowLeft}
          iconPosition="left"
          disabled={isSubmitting}
          onClick={handleBack}
          className="w-full sm:w-auto"
        >
          Back to Step 3
        </Button>

        <Button
          type="button"
          variant="primary"
          size="lg"
          icon={Send}
          iconPosition="right"
          isLoading={isSubmitting}
          disabled={isSubmitting}
          onClick={handleSubmit}
          className="w-full sm:w-auto"
        >
          Submit Requirement
        </Button>
      </div>
    </div>
  );
}
