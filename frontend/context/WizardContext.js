"use client";

import React, { createContext, useContext, useReducer, useEffect } from "react";

const INITIAL_STATE = {
  currentStep: 1,
  formData: {
    category: "planner",
    event: {
      name: "",
      type: "Corporate",
      dateMode: "single",
      startDate: "",
      endDate: "",
      location: "",
      venue: "",
    },
    details: {},
  },
  categoryChangedNotice: null,
  submissionStatus: "idle",
  submissionResult: null,
  submissionError: null,
};

const WizardContext = createContext(null);

function wizardReducer(state, action) {
  switch (action.type) {
    case "SET_STEP":
      return {
        ...state,
        currentStep: Math.max(1, Math.min(5, action.payload)),
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(4, state.currentStep + 1),
      };

    case "PREV_STEP":
      return {
        ...state,
        currentStep: Math.max(1, state.currentStep - 1),
      };

    case "UPDATE_EVENT":
      return {
        ...state,
        formData: {
          ...state.formData,
          event: {
            ...state.formData.event,
            ...action.payload,
          },
        },
      };

    case "SET_CATEGORY": {
      const newCategory = action.payload;
      if (newCategory === state.formData.category) {
        return state;
      }

      const hadDetails = Object.keys(state.formData.details || {}).length > 0;

      return {
        ...state,
        formData: {
          ...state.formData,
          category: newCategory,
          details: {},
        },
        categoryChangedNotice: hadDetails
          ? `Switched category to ${newCategory}. Category-specific fields have been reset.`
          : null,
      };
    }

    case "CLEAR_CATEGORY_NOTICE":
      return {
        ...state,
        categoryChangedNotice: null,
      };

    case "UPDATE_DETAILS":
      return {
        ...state,
        formData: {
          ...state.formData,
          details: {
            ...state.formData.details,
            ...action.payload,
          },
        },
      };

    case "SUBMIT_START":
      return {
        ...state,
        submissionStatus: "submitting",
        submissionError: null,
      };

    case "SUBMIT_SUCCESS":
      return {
        ...state,
        submissionStatus: "success",
        submissionResult: action.payload,
        submissionError: null,
        currentStep: 5,
      };

    case "SUBMIT_FAILURE":
      return {
        ...state,
        submissionStatus: "error",
        submissionError: action.payload,
      };

    case "RESET_WIZARD":
      return {
        ...INITIAL_STATE,
      };

    default:
      return state;
  }
}

export function WizardProvider({ children }) {
  const [state, dispatch] = useReducer(wizardReducer, INITIAL_STATE);

  useEffect(() => {
    if (state.categoryChangedNotice) {
      const timer = setTimeout(() => {
        dispatch({ type: "CLEAR_CATEGORY_NOTICE" });
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [state.categoryChangedNotice]);

  const value = {
    state,
    dispatch,
    currentStep: state.currentStep,
    formData: state.formData,
    category: state.formData.category,
    event: state.formData.event,
    details: state.formData.details,
    submissionStatus: state.submissionStatus,
    submissionResult: state.submissionResult,
    submissionError: state.submissionError,
    categoryChangedNotice: state.categoryChangedNotice,
  };

  return (
    <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
  );
}

export function useWizard() {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
