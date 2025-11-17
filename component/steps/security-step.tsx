"use client";

import { useState } from "react";
import { Eye, EyeOff, AlertCircle, Lock, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import { FormData } from "../signup-flow";

interface SecurityStepProps {
  formData: FormData;
  onContinue: (data: Partial<FormData>) => void;
  onBack: () => void;
}

export default function SecurityStep({
  formData,
  onContinue,
  onBack,
}: SecurityStepProps) {
  const [password, setPassword] = useState(formData.password);
  const [confirmPassword, setConfirmPassword] = useState(
    formData.confirmPassword
  );
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      onContinue({ password, confirmPassword });
    }
  };

  return (
    <div className="space-y-6">
      <div className="hidden md:block">
        <h2 className="text-2xl md:text-[32px] font-semibold text-[#00264C] mb-2 md:mb-10">
          Security Settings
        </h2>
      </div>

      <form
        className="space-y-5"
        onSubmit={(e) => {
          e.preventDefault();
          handleContinue();
        }}
      >
        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm md:text-lg font-normal text-[#00264C] mb-2"
          >
            Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-[#CCCBCB]" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 rounded-lg border ${
                errors.password
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {!errors.password && password && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <span>✓</span> Password strength:{" "}
              {password.length >= 12
                ? "Strong"
                : password.length >= 10
                ? "Good"
                : "Fair"}
            </p>
          )}
          {errors.password && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label
            htmlFor="confirmPassword"
            className="block text-sm md:text-lg font-normal text-[#00264C]"
          >
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 h-5 w-5 text-[#CCCBCB]" />
            <input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full pl-10 pr-4 py-3  rounded-lg border ${
                errors.confirmPassword
                  ? "border-red-500 bg-red-50"
                  : "border-gray-200 bg-white"
              } text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition`}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
              <AlertCircle className="h-3 w-3" /> {errors.confirmPassword}
            </p>
          )}
          {!errors.confirmPassword &&
            confirmPassword &&
            password === confirmPassword && (
              <p className="text-xs text-green-600 mt-2">✓ Passwords match</p>
            )}
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
          <p className="text-xs text-blue-800">
            ℹ Password must be at least 8 characters long and include a mix of
            uppercase, lowercase, and numbers.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-4 pt-6">
          <Button
            type="button"
            onClick={onBack}
            variant="outline"
            className="bg-[#003366]"
          >
            Back
          </Button>
          <Button
            type="submit"
            className=" flex gap-6 bg-[#003366] hover:bg-[#254e71] text-white px-10"
          >
            Continue
            <ChevronRight className=" left-3 top-3.5 h-5 w-5 text-[#FAFAFA]" />
          </Button>
        </div>
      </form>
    </div>
  );
}
