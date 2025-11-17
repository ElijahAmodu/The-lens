"use client";

import { Check } from "lucide-react";

interface Step {
  number: number;
  title: string;
}

interface StepIndicatorProps {
  steps: Step[];
  currentStep: number;
}

export default function StepIndicator({
  steps,
  currentStep,
}: StepIndicatorProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.number} className="flex flex-col items-center flex-1">
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                step.number < currentStep
                  ? "bg-teal-500 text-white"
                  : step.number === currentStep
                  ? "bg-[#1a3a52] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number < currentStep ? (
                <Check className="w-6 h-6" />
              ) : (
                step.number
              )}
            </div>
            <p
              className={`text-xs mt-3 font-medium ${
                step.number <= currentStep
                  ? "text-foreground"
                  : "text-muted-foreground"
              }`}
            >
              {step.title}
            </p>

            {/* Progress Bar */}
            {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-6 w-[calc(100%-3rem)] h-1 bg-gray-200 -translate-x-1/2">
                <div
                  className={`h-full ${
                    step.number < currentStep ? "w-full bg-[#1a3a52]" : "w-0"
                  } transition-all`}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-full bg-[#1a3a52] transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}
