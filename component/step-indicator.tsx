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
              className={`w-12 h-12 rounded-full flex items-center justify-center font-normal transition-all ${
                step.number < currentStep
                  ? "bg-[#15B097] text-white"
                  : step.number === currentStep
                  ? "bg-[#003366] text-white"
                  : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number < currentStep ? (
                <img src="/check-mark.svg" alt="Lens" className="w-9 h-9" />
              ) : (
                step.number
              )}
            </div>
            <p
              className={`text-xs md:text-2xl mt-3 font-normal ${
                step.number <= currentStep ? "text-[#898384]" : "text-[#a19b9c]"
              }`}
            >
              {step.title}
            </p>

            {/* Progress Bar */}
            {/* {index < steps.length - 1 && (
              <div className="absolute left-1/2 top-6 w-[calc(100%-3rem)] h-1 bg-gray-200 -translate-x-1/2">
                <div
                  className={`h-full ${
                    step.number < currentStep ? "w-full bg-[#1a3a52]" : "w-0"
                  } transition-all`}
                />
              </div>
            )} */}
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="relative h-2.5 bg-gray-200 rounded-full overflow-hidden mb-8">
        <div
          className="h-2.5 bg-[#003366] rounded-full transition-all duration-500"
          style={{ width: `${(currentStep / 4) * 100}%` }}
        />
      </div>
    </div>
  );
}
