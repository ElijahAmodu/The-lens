"use client";

import { useState } from "react";
import SignupFlow from "@/component/signup-flow";

export default function page() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F3F9] flex items-center justify-center p-4">
      <SignupFlow onBackToLogin={() => setIsSignup(false)} />
    </div>
  );
}
