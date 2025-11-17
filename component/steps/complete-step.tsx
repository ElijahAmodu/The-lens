"use client";

import { Check } from "lucide-react";
import { Button } from "../ui/button";

interface CompleteStepProps {
  onBackToLogin: () => void;
}

export default function CompleteStep({ onBackToLogin }: CompleteStepProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center space-y-8">
      {/* Success Icon */}
      <div className="w-24 h-24 rounded-full bg-teal-100 flex items-center justify-center animate-pulse">
        {/* <Check className="h-12 w-12 text-[#A4F4E7]" strokeWidth={3} /> */}
        <img
          src="/green-check-mark.svg"
          alt="check-mark"
          className="h-12 w-12 md:w-20 md:h-20"
        />
      </div>

      {/* Success Message */}
      <div className="space-y-3">
        <h2 className="text-[32px] font-semibold text-[#00264C]">
          Setup Complete
        </h2>
        <p className="text-[#898384] text-lg md:text-2xl">
          Your admin account has been created successfully
        </p>
      </div>

      {/* Button */}
      <Button
        onClick={onBackToLogin}
        className="bg-[#003366] hover:bg-[#254e71] text-[#FAFAFA] px-10 py-6 rounded-lg md:text-2xl mt-4"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
