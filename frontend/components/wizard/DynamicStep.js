"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { useWizard } from "@/context/WizardContext";
import { CATEGORIES } from "@/config/categoryConfig";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { MultiSelect } from "@/components/ui/MultiSelect";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, ArrowRight } from "lucide-react";

export function DynamicStep({ stepNumber }) {
  const { category, details, dispatch } = useWizard();

  const currentCategoryConfig = CATEGORIES[category] || CATEGORIES.planner;
  const fields = currentCategoryConfig.steps[stepNumber] || [];

  const title =
    stepNumber === 2
      ? currentCategoryConfig.step2Title
      : currentCategoryConfig.step3Title;
  const description =
    stepNumber === 2
      ? currentCategoryConfig.step2Description
      : currentCategoryConfig.step3Description;

  const defaultValues = fields.reduce((acc, field) => {
    if (details && details[field.name] !== undefined) {
      acc[field.name] = details[field.name];
    } else if (field.type === "multiselect") {
      acc[field.name] = [];
    } else {
      acc[field.name] = "";
    }
    return acc;
  }, {});

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onTouched",
  });

  useEffect(() => {
    reset(defaultValues);
  }, [category, stepNumber]);

  const onSubmit = (data) => {
    const formattedData = { ...data };
    fields.forEach((field) => {
      if (field.type === "number" && formattedData[field.name] !== "") {
        formattedData[field.name] = Number(formattedData[field.name]);
      }
    });

    dispatch({ type: "UPDATE_DETAILS", payload: formattedData });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-7 space-y-6">
        <div className="border-b border-zinc-100 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                Step 0{stepNumber} of 4 • {currentCategoryConfig.name}
              </span>
            </div>
            <h2 className="text-lg font-bold text-zinc-900">{title}</h2>
            <p className="text-xs text-zinc-500 mt-0.5">{description}</p>
          </div>
          <span className="px-2.5 py-1 rounded bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-800 self-start sm:self-auto">
            {currentCategoryConfig.name}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {fields.map((field) => {
            const isFullWidth =
              field.type === "textarea" || field.type === "multiselect";

            const containerClasses = isFullWidth
              ? "md:col-span-2"
              : "md:col-span-1";

            if (field.type === "multiselect") {
              return (
                <div key={field.name} className={containerClasses}>
                  <Controller
                    name={field.name}
                    control={control}
                    rules={field.validation}
                    render={({ field: controllerField }) => (
                      <MultiSelect
                        id={field.name}
                        label={field.label}
                        options={field.options}
                        value={controllerField.value}
                        onChange={controllerField.onChange}
                        required={!!field.validation?.required}
                        error={errors[field.name]?.message}
                        helperText={field.helperText}
                      />
                    )}
                  />
                </div>
              );
            }

            if (field.type === "select") {
              return (
                <div key={field.name} className={containerClasses}>
                  <Select
                    id={field.name}
                    label={field.label}
                    options={field.options}
                    placeholder={field.placeholder}
                    required={!!field.validation?.required}
                    error={errors[field.name]?.message}
                    helperText={field.helperText}
                    {...register(field.name, field.validation)}
                  />
                </div>
              );
            }

            if (field.type === "textarea") {
              return (
                <div key={field.name} className={containerClasses}>
                  <Input
                    id={field.name}
                    type="textarea"
                    label={field.label}
                    placeholder={field.placeholder}
                    rows={4}
                    maxLength={field.validation?.maxLength?.value || 500}
                    required={!!field.validation?.required}
                    error={errors[field.name]?.message}
                    helperText={field.helperText}
                    {...register(field.name, field.validation)}
                  />
                </div>
              );
            }

            return (
              <div key={field.name} className={containerClasses}>
                <Input
                  id={field.name}
                  type={field.type || "text"}
                  label={field.label}
                  placeholder={field.placeholder}
                  required={!!field.validation?.required}
                  error={errors[field.name]?.message}
                  helperText={field.helperText}
                  {...register(field.name, field.validation)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-between pt-1">
        <Button
          type="button"
          variant="outline"
          size="lg"
          icon={ArrowLeft}
          iconPosition="left"
          onClick={handleBack}
        >
          Back
        </Button>

        <Button
          type="submit"
          variant="primary"
          size="lg"
          icon={ArrowRight}
          iconPosition="right"
        >
          {stepNumber === 2 ? "Continue to Step 3" : "Review Requirement"}
        </Button>
      </div>
    </form>
  );
}
