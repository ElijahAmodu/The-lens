"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useRouter } from "next/navigation";
import { login } from "@/lib/auth-actions";

interface LoginPageProps {
  onSignupClick: () => void;
}

export default function LoginPage({ onSignupClick }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    console.log("Starting login process...");

    try {
      const loginData = { email, password };
      console.log("Login data prepared:", { email: loginData.email });

      const result = await login(loginData);
      console.log("Login result received:", result);

      if (result.success) {
        console.log("Login successful! Session:", result.data?.session);

        // Redirect immediately - no timeout needed
        router.push("/admin/dashboard");
      } else {
        console.error("Login failed:", result.error);
        setError(result.error || "Login failed. Please try again.");
        setIsLoading(false);
      }
    } catch (err: any) {
      console.error("Unexpected login error:", err);
      setError(
        err.message || "An unexpected error occurred. Please try again."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="md:hidden flex flex-col items-center gap-3 mb-[72px]">
        <div className="flex gap-4 justify-center items-center">
          <div className="w-12 h-12 rounded-lg bg-[#FAFAFA] flex items-center justify-center">
            <img src="/primary-lens.svg" alt="Lens" className="w-9 h-9" />
          </div>
          <h1 className="text-2xl font-bold text-[#FAFAFA] mt-1">THE LENS</h1>
        </div>
      </div>
      <Card className="w-full max-w-2xl bg-white/95 backdrop-blur shadow-2xl">
        <div className="p-8 sm:p-10">
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

            <div className="text-center">
              <p className="text-lg text-[#898384] tracking-wide font-normal">
                Admin Portal
              </p>
            </div>
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h2 className="text-lg md:text-[32px] text-[#00264C] font-bold">
              Admin Login
            </h2>
            <p className="text-sm md:text-lg text-[#898384] text-muted-foreground mt-2">
              Sign in to access the news dashboard
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[#00264C] mb-2"
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
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-[#151314] placeholder-[#CCCBCB] focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[#00264C] mb-2"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(null);
                  }}
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-gray-200 text-[#151314] placeholder-[#CCCBCB] focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => router.push("/admin/forgot-password")}
                className="text-lg font-medium text-[#003366] hover:text-[#254e71] transition disabled:opacity-50"
                disabled={isLoading}
              >
                Forgot Password?
              </button>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003366] hover:bg-[#254e71] text-white text-lg font-semibold py-6 rounded-xl transition disabled:opacity-70"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <span className="text-[#000000] text-lg font-medium">
              Don't have an account?{" "}
            </span>
            <button
              onClick={() => router.push("/admin/signup")}
              className="font-semibold text-[#1a3a52] hover:text-[#254e71] transition cursor-pointer disabled:opacity-50"
              disabled={isLoading}
            >
              Sign up for free
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
