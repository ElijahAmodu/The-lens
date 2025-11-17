"use client";

import { Button } from "../ui/button";
import { FormData } from "../signup-flow";

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
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Verify Information
        </h2>
        <p className="text-muted-foreground">
          Please review your information before completing setup
        </p>
      </div>

      {/* Info Summary */}
      <div className="space-y-4">
        <div className="bg-gray-50 rounded-lg p-6 space-y-4">
          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Name
              </p>
              <p className="text-foreground font-medium mt-1">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
          </div>

          <div className="flex justify-between items-start pb-4 border-b border-gray-200">
            <div>
              <p className="text-xs font-semibold text-muted-foreground uppercase">
                Email
              </p>
              <p className="text-foreground font-medium mt-1">
                {formData.email}
              </p>
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase">
              Security
            </p>
            <p className="text-foreground font-medium mt-1">
              Password set and confirmed
            </p>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <Button onClick={onBack} variant="outline" className="flex-1">
          Back
        </Button>
        <Button
          onClick={() => onContinue({})}
          className="flex-1 bg-[#1a3a52] hover:bg-[#254e71] text-white"
        >
          Complete Setup
        </Button>
      </div>
    </div>
  );
}
