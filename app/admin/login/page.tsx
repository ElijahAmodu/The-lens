"use client";

import { useState } from "react";
import LoginPage from "@/component/login-page";

export default function page() {
  const [isSignup, setIsSignup] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/login-background.svg')",
      }}
    >
      <LoginPage onSignupClick={() => setIsSignup(true)} />
    </div>
  );
}
