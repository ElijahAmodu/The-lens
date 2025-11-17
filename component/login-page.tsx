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
    // Simulate login
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Card className="w-full max-w-md bg-white/95 backdrop-blur shadow-2xl">
      <div className="p-8 sm:p-10">
        {/* Logo and Title */}
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-lg bg-[#1a3a52] flex items-center justify-center">
            <span className="text-white font-bold text-lg">🔍</span>
          </div>
          <div className="text-center">
            <p className="text-xs text-gray-500 tracking-wide font-semibold">
              Admin Portal
            </p>
            <h1 className="text-2xl font-bold text-[#1a3a52] mt-1">THE LENS</h1>
          </div>
        </div>

        {/* Heading */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground">Admin Login</h2>
          <p className="text-sm text-muted-foreground mt-2">
            Sign in to access the news dashboard
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="email"
                type="email"
                placeholder="fanawo@yahoo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white border border-gray-200 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
                required
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground mb-2"
            >
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-gray-200 text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
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
              className="text-sm font-medium text-[#1a3a52] hover:text-[#254e71] transition"
            >
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#1a3a52] hover:bg-[#254e71] text-white font-semibold py-3 rounded-lg transition disabled:opacity-70"
          >
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>

        {/* Signup Link */}
        <div className="mt-6 text-center text-sm">
          <span className="text-muted-foreground">Don't have an account? </span>
          <button
            onClick={onSignupClick}
            className="font-semibold text-[#1a3a52] hover:text-[#254e71] transition"
          >
            Sign up for free
          </button>
        </div>
      </div>
    </Card>
  );
}
