"use client";

import { Button } from "../ui/button";
import { FormData } from "../signup-flow";
import { ChevronRight } from "lucide-react";

interface VerifyStepProps {
  formData: FormData;
  onContinue: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function VerifyStep({
  formData,
  onContinue,
  onBack,
}: VerifyStepProps) {
  return (
    <div className="space-y-8">
      <div className="hidden md:block">
        <h2 className="text-2xl md:text-[32px] font-semibold text-[#00264C] mb-2 md:mb-10">
          Verify Information
        </h2>
      </div>

      {/* Info Summary */}
      <div className="space-y-4">
        <div className="bg-gray-200 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-[#003366] uppercase">
                Name
              </p>
              <p className="text-black font-medium mt-1">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-[#003366] uppercase">
                Email
              </p>
              <p className="text-black font-medium mt-1">{formData.email}</p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-[#003366] uppercase">
              Security
            </p>
            <p className="text-black font-medium mt-1">
              Password set and confirmed
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <Button onClick={onBack} variant="outline" className="">
          Back
        </Button>
        <Button
          onClick={() => onContinue({})}
          className=" flex gap-6 bg-[#003366] hover:bg-[#254e71] text-white px-10"
        >
          Complete Setup
          <ChevronRight className=" left-3 top-3.5 h-5 w-5 text-[#FAFAFA]" />
        </Button>
      </div>
    </div>
  );
}
