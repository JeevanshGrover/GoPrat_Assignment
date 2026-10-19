"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useWizard } from "@/context/WizardContext";
import { EVENT_TYPES, CATEGORIES } from "@/config/categoryConfig";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { CategoryCard } from "@/components/ui/CategoryCard";
import { Alert } from "@/components/ui/Alert";
import { Calendar, MapPin, Building, ArrowRight } from "lucide-react";

export function StepBasics() {
  const { formData, dispatch, categoryChangedNotice } = useWizard();

  const [todayStr, setTodayStr] = useState("");

  useEffect(() => {
    setTodayStr(new Date().toISOString().split("T")[0]);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: formData.event?.name || "",
      type: formData.event?.type || "Corporate",
      dateMode: formData.event?.dateMode || "single",
      startDate: formData.event?.startDate || "",
      endDate: formData.event?.endDate || "",
      location: formData.event?.location || "",
      venue: formData.event?.venue || "",
      category: formData.category || "planner",
    },
    mode: "onTouched",
  });

  const selectedDateMode = watch("dateMode");
  const selectedStartDate = watch("startDate");
  const currentCategory = watch("category");

  const handleDateModeChange = (mode) => {
    setValue("dateMode", mode);
    if (mode === "single") {
      setValue("endDate", "");
    }
  };

  const handleCategorySelect = (catKey) => {
    setValue("category", catKey);
    dispatch({ type: "SET_CATEGORY", payload: catKey });
  };

  const onSubmit = (data) => {
    const eventPayload = {
      name: data.name.trim(),
      type: data.type,
      dateMode: data.dateMode,
      startDate: data.startDate,
      endDate: data.dateMode === "range" ? data.endDate : undefined,
      location: data.location.trim(),
      venue: data.venue?.trim() || undefined,
    };

    dispatch({ type: "UPDATE_EVENT", payload: eventPayload });
    dispatch({ type: "SET_CATEGORY", payload: data.category });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {categoryChangedNotice && (
        <Alert
          variant="warning"
          title="Category Switched"
          onDismiss={() => dispatch({ type: "CLEAR_CATEGORY_NOTICE" })}
        >
          {categoryChangedNotice}
        </Alert>
      )}

      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-5">
        <div className="border-b border-zinc-100 pb-3.5">
          <h2 className="text-base font-bold text-zinc-900">
            Event Information
          </h2>
          <p className="text-xs text-zinc-500 mt-0.5">
            Basic details and location of your event.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Event Name"
            placeholder="e.g. Annual Tech Symposium 2026"
            required
            error={errors.name?.message}
            {...register("name", {
              required: "Event name is required",
              minLength: {
                value: 3,
                message: "Event name must be at least 3 characters",
              },
              maxLength: {
                value: 100,
                message: "Event name cannot exceed 100 characters",
              },
            })}
          />

          <Select
            label="Event Type"
            required
            options={EVENT_TYPES}
            error={errors.type?.message}
            {...register("type", {
              required: "Please select an event type",
            })}
          />
        </div>

        <div className="space-y-3 pt-1">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-700">
                Event Schedule <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-zinc-500">
                Select single-day or date range
              </p>
            </div>

            <div className="inline-flex p-1 rounded-lg bg-zinc-100 border border-zinc-200 self-start sm:self-auto">
              <button
                type="button"
                onClick={() => handleDateModeChange("single")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedDateMode === "single"
                    ? "bg-white text-zinc-900 border border-zinc-300"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Single Day
              </button>
              <button
                type="button"
                onClick={() => handleDateModeChange("range")}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  selectedDateMode === "range"
                    ? "bg-white text-zinc-900 border border-zinc-300"
                    : "text-zinc-600 hover:text-zinc-900"
                }`}
              >
                Date Range
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <Input
              label={selectedDateMode === "range" ? "Start Date" : "Event Date"}
              type="date"
              required
              min={todayStr}
              icon={Calendar}
              error={errors.startDate?.message}
              helperText="Cannot be in the past"
              {...register("startDate", {
                required: "Start date is required",
                validate: (val) => {
                  if (!val) return "Start date is required";
                  if (todayStr && val < todayStr) return "Start date cannot be in the past";
                  return true;
                },
              })}
            />

            {selectedDateMode === "range" && (
              <Input
                label="End Date"
                type="date"
                required
                min={selectedStartDate || todayStr}
                icon={Calendar}
                error={errors.endDate?.message}
                helperText="Must be on or after start date"
                {...register("endDate", {
                  required:
                    selectedDateMode === "range"
                      ? "End date is required for a date range"
                      : false,
                  validate: (val) => {
                    if (selectedDateMode !== "range") return true;
                    if (!val) return "End date is required for a date range";
                    if (selectedStartDate && val < selectedStartDate) {
                      return "End date cannot precede the start date";
                    }
                    return true;
                  },
                })}
              />
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <Input
            label="Location (City)"
            placeholder="e.g. Mumbai, Bengaluru, Jaipur"
            icon={MapPin}
            required
            error={errors.location?.message}
            helperText="City where event takes place"
            {...register("location", {
              required: "Location / city is required",
              validate: (val) =>
                val.trim().length > 0 || "Location cannot be empty",
            })}
          />

          <Input
            label="Venue (Optional)"
            placeholder="e.g. Grand Hyatt, Hall 3, Palace Grounds"
            icon={Building}
            error={errors.venue?.message}
            helperText="Specific venue or address if finalized"
            {...register("venue")}
          />
        </div>
      </div>

      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-4">
        <div className="border-b border-zinc-100 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-base font-bold text-zinc-900">
              Select Category <span className="text-rose-500">*</span>
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Subsequent steps adapt based on this selection.
            </p>
          </div>
          <span className="text-[11px] font-medium text-zinc-600 bg-zinc-100 px-2.5 py-0.5 rounded border border-zinc-200 self-start sm:self-auto">
            Config-driven
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-1">
          {Object.values(CATEGORIES).map((cat) => (
            <CategoryCard
              key={cat.id}
              categoryKey={cat.id}
              name={cat.name}
              tagline={cat.tagline}
              description={cat.description}
              isSelected={currentCategory === cat.id}
              onClick={() => handleCategorySelect(cat.id)}
            />
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end pt-1">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
          className="w-full sm:w-auto"
        >
          Continue to Step 2
        </Button>
      </div>
    </form>
  );
}
