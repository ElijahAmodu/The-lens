"use client";

import { useState } from "react";
import LoginPage from "@/component/login-page";
import SignupFlow from "@/component/signup-flow";

export default function page() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <>
      {isSignup ? (
        <div className="min-h-screen bg-[#F0F3F9] flex items-center justify-center p-4">
          <SignupFlow onBackToLogin={() => setIsSignup(false)} />
        </div>
      ) : (
        <div
          className="min-h-screen flex items-center justify-center p-4"
          style={{
            backgroundImage: "url('/login-background.svg')",
          }}
        >
          <LoginPage onSignupClick={() => setIsSignup(true)} />
        </div>
      )}
    </>
  );
}
