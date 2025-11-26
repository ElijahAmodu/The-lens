"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { FormData } from "../signup-flow";
import { Mail, ChevronRight } from "lucide-react";

interface PersonalInfoStepProps {
  formData: FormData;
  onContinue: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function PersonalInfoStep({
  formData,
  onContinue,
  onBack,
}: PersonalInfoStepProps) {
  const [firstName, setFirstName] = useState(formData.firstName);
  const [lastName, setLastName] = useState(formData.lastName);
  const [email, setEmail] = useState(formData.email);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue({ firstName, lastName, email });
    }
  };

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <h2 className="text-2xl md:text-[32px] font-semibold text-[#00264C] mb-2 md:mb-10">
          Personal Information
        </h2>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
      >
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="firstName"
              className="block text-sm md:text-lg font-medium text-[#00264C] mb-2"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.firstName
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition`}
            />
            {errors.firstName && (
              <p className="text-xs text-red-500 mt-1">{errors.firstName}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="lastName"
              className="block text-sm md:text-lg font-medium text-[#00264C] mb-2"
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border ${
                errors.lastName
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition`}
            />
            {errors.lastName && (
              <p className="text-xs text-red-500 mt-1">{errors.lastName}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm md:text-lg font-medium text-[#00264C] mb-2"
          >
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 h-5 w-5 text-[#CCCBCB]" />
            <input
              id="email"
              type="email"
              placeholder="johndoe@yahoo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.email
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition`}
            />
          </div>

          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          {/* <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="bg-[#003366] hover:bg-[#254e71]"
          >
            Back
          </Button> */}
          <Button
            type="submit"
            className="flex gap-6 bg-[#003366] hover:bg-[#254e71] text-white px-10"
          >
            Continue
            <ChevronRight className=" left-3 top-3.5 h-5 w-5 text-[#FAFAFA]" />
          </Button>
        </div>
      </form>
    </div>
  );
}
