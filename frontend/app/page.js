"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Mic,
  Users,
  ArrowRight,
  Check,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 flex flex-col">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold tracking-tight text-zinc-900 text-base">
              GoPratle
            </span>
            <span className="text-xs text-zinc-500">Events</span>
          </div>

          <Link href="/post-requirement">
            <Button variant="primary" size="sm">
              Post Requirement
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500">
            Event Requirement Flow
          </span>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
            Post Structured Requirements for Your Event
          </h1>

          <p className="text-sm sm:text-base text-zinc-600 leading-relaxed">
            A guided four-step form tailored specifically for hiring Event Planners, Performers, or Crew. Enter event basics, fill category-specific details, review, and submit directly to our database.
          </p>

          <div className="pt-2">
            <Link href="/post-requirement">
              <Button
                variant="primary"
                size="lg"
                icon={ArrowRight}
                iconPosition="right"
                className="w-full sm:w-auto"
              >
                Start Requirement Posting
              </Button>
            </Link>
          </div>
        </div>

        <div className="bg-white border border-zinc-200 rounded-xl p-6 sm:p-8 space-y-6">
          <div className="border-b border-zinc-100 pb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              How the Flow Works
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Four structured steps with validation and dynamic field adaptation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-xs font-bold text-zinc-900 block">Step 1</span>
              <h3 className="text-xs font-semibold text-zinc-800">Event Basics</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Name, type, single or date range, city, venue, and hiring category.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-xs font-bold text-zinc-900 block">Step 2</span>
              <h3 className="text-xs font-semibold text-zinc-800">Category Details</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Dynamic fields based on category (budget, performer lineup, or crew roles).
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-xs font-bold text-zinc-900 block">Step 3</span>
              <h3 className="text-xs font-semibold text-zinc-800">Additional Details</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Services, stage duration, equipment rider, shift hours, and notes.
              </p>
            </div>

            <div className="p-4 rounded-lg bg-zinc-50 border border-zinc-200 space-y-1">
              <span className="text-xs font-bold text-zinc-900 block">Step 4</span>
              <h3 className="text-xs font-semibold text-zinc-800">Review & Submit</h3>
              <p className="text-[11px] text-zinc-500 leading-relaxed">
                Full summary with inline Edit links, validation, and confirmation ID.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="text-left">
            <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-900">
              Supported Categories
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Each category adapts its form fields to capture relevant details.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900">Event Planner</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Budget planning (min/max), expected guest headcount, coordination services, and theme preferences.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1 pt-2 border-t border-zinc-100">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Guest count & budget caps</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Planning services multi-select</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
                  <Mic className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900">Performer</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Artist type (Singer, DJ, Band, MC), genre, performer count, stage slot duration, and equipment rider.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1 pt-2 border-t border-zinc-100">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Type, genre & artist count</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Duration & sound equipment</span>
                </li>
              </ul>
            </div>

            <div className="bg-white border border-zinc-200 rounded-xl p-5 space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 text-zinc-800 flex items-center justify-center">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-zinc-900">Crew</h3>
                <p className="text-xs text-zinc-600 leading-relaxed">
                  Operational roles (Sound, Lighting, Security, Stage hands), total headcount, number of days, and shift hours.
                </p>
              </div>
              <ul className="text-[11px] text-zinc-500 space-y-1 pt-2 border-t border-zinc-100">
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Roles multi-select & crew count</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Check className="w-3 h-3 text-zinc-800" />
                  <span>Days & daily shift hours</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-500 mt-auto">
        <p>GoPratle Technical Assignment • Event Requirement Posting Flow</p>
      </footer>
    </div>
  );
}
