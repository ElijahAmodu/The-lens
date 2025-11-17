"use client";

import { useState } from "react";
import { ChevronRight, Mail } from "lucide-react";
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
    <div className="w-full max-w-[1616px]">
      <div className="flex md:hidden flex-col items-center gap-3 mt-14 mb-16">
        <div className="flex gap-4 justify-center items-center">
          <div className="w-12 h-12 rounded-lg bg-[#003366] flex items-center justify-center">
            <img src="/lens.svg" alt="Lens" className="w-6 h-" />
          </div>
          <h1 className="text-2xl font-bold text-[#003366] mt-1">THE LENS</h1>
        </div>
      </div>

      <div className="w-full max-w-[1616px]">
        <div className="bg-white/95 backdrop-blur rounded-xl shadow-2xl p-8 sm:p-12 md:m-14">
          {/* Logo and Title */}
          <div className="hidden md:flex flex-col items-center gap-3 mb-8">
            <div className="flex gap-4 justify-center items-center">
              <div className="w-12 h-12 rounded-lg bg-[#003366] flex items-center justify-center">
                <img src="/lens.svg" alt="Lens" className="w-6 h-" />
              </div>
              <h1 className="text-2xl font-bold text-[#003366] mt-1">
                THE LENS
              </h1>
            </div>
            <p className="text-sm text-[#898384]">
              Create your administrator account
            </p>
          </div>

          <div className="md:hidden pb-8">
            {steps.map(
              (step) =>
                step.number === currentStep && (
                  <h1
                    key={step.number}
                    className="text-lg font-semibold text-[#00264C] mb-2 md:mb-10"
                  >
                    {step.title}
                  </h1>
                )
            )}
          </div>

          {/* Step Indicator */}
          <StepIndicator steps={steps} currentStep={currentStep} />

          {/* Step Content */}
          <div className="mt-20">{renderStep()}</div>
        </div>
      </div>
    </div>
  );
}
