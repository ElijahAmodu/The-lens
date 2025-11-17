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
        <Check className="h-12 w-12 text-teal-500" strokeWidth={3} />
      </div>

      {/* Success Message */}
      <div className="space-y-3">
        <h2 className="text-3xl font-bold text-foreground">Setup Complete</h2>
        <p className="text-muted-foreground">
          Your admin account has been created successfully
        </p>
      </div>

      {/* Button */}
      <Button
        onClick={onBackToLogin}
        className="bg-[#1a3a52] hover:bg-[#254e71] text-white px-8 py-3 rounded-lg font-semibold mt-4"
      >
        Go to Dashboard
      </Button>
    </div>
  );
}
