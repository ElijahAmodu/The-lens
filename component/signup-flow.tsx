"use client";

import { useState } from "react";
import { ChevronRight } from "lucide-react";
import StepIndicator from "./step-indicator";
import PersonalInfoStep from "./steps/personal-info-step";
import SecurityStep from "./steps/security-step";
import VerifyStep from "./steps/verify-step";
import CompleteStep from "./steps/complete-step";

interface SignupFlowProps {
  onBackToLogin: () => void;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupFlow({ onBackToLogin }: SignupFlowProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const steps = [
    { number: 1, title: "Personal Info" },
    { number: 2, title: "Security" },
    { number: 3, title: "Verify" },
    { number: 4, title: "Complete" },
  ];

  const handleContinue = (newData: Partial<FormData>) => {
    setFormData({ ...formData, ...newData });
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBackToLogin();
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 2:
        return (
          <SecurityStep
            formData={formData}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 3:
        return (
          <VerifyStep
            formData={formData}
            onContinue={handleContinue}
            onBack={handleBack}
          />
        );
      case 4:
        return <CompleteStep onBackToLogin={onBackToLogin} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-8 sm:p-12">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-[#1a3a52] flex items-center justify-center">
            <span className="text-white font-bold text-lg">🔍</span>
          </div>
          <h1 className="text-2xl font-bold text-[#1a3a52]">THE LENS</h1>
          <p className="text-sm text-muted-foreground">
            Create your administrator account
          </p>
        </div>

        {/* Step Indicator */}
        <StepIndicator steps={steps} currentStep={currentStep} />

        {/* Step Content */}
        <div className="mt-12">{renderStep()}</div>
      </div>
    </div>
  );
}
