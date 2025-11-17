"use client";

import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface LoginPageProps {
  onSignupClick: () => void;
}

export default function LoginPage({ onSignupClick }: LoginPageProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("login details", { email, password });
    // Simulate login
    setTimeout(() => setIsLoading(false), 1000);
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
                  placeholder="fanawo@yahoo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-[#151314] placeholder-[#CCCBCB] focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
                  required
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
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-gray-200 text-[#151314] placeholder-[#CCCBCB] focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
                  required
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
            </div>

            {/* Forgot Password Link */}
            <div className="flex justify-end">
              <a
                href="#"
                className="text-lg font-medium text-[#003366] hover:text-[#254e71] transition"
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#003366] hover:bg-[#254e71] text-white text-lg font-semibold py-6 rounded-xl transition disabled:opacity-70"
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>

          {/* Signup Link */}
          <div className="mt-6 text-center">
            <span className="text-[#000000] text-lg font-medium">
              Don't have an account?{" "}
            </span>
            <button
              onClick={onSignupClick}
              className="font-semibold text-[#1a3a52] hover:text-[#254e71] transition cursor-pointer"
            >
              Sign up for free
            </button>
          </div>
        </div>
      </Card>
    </div>
  );
}
