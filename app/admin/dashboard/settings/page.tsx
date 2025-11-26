"use client";

import { useState, useCallback, memo } from "react";
import { Card } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import { Input } from "@/component/ui/input";
import { Lock, EyeOff, Eye } from "lucide-react";

const PasswordField = memo(function PasswordField({
  label,
  value,
  onChange,
  showPassword,
  toggleShow,
  isLoading,
}: {
  label: string;
  value: string;
  onChange: (val: string) => void;
  showPassword: boolean;
  toggleShow: () => void;
  isLoading: boolean;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-900 mb-2">
        {label}
      </label>

      <div className="relative">
        <Lock className="absolute left-3 top-3.5 h-5 w-5 text-[#CCCBCB]" />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="••••••••"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={isLoading}
          required
          className="w-full pl-10 pr-10 py-3 rounded-lg bg-white border border-gray-200 text-[#151314] placeholder-[#CCCBCB] 
          focus:outline-none focus:ring-2 focus:ring-[#1a3a52] focus:border-transparent transition"
        />

        <button
          type="button"
          onClick={toggleShow}
          disabled={isLoading}
          className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 disabled:opacity-50"
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>
    </div>
  );
});

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<"profile" | "security">("profile");

  // Profile state
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // Security state
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleShowPassword = () => setShowPassword((p) => !p);

  const updateProfileField = useCallback(
    (key: keyof typeof profile, value: string) =>
      setProfile((prev) => ({ ...prev, [key]: value })),
    []
  );

  const updatePasswordField = useCallback(
    (key: keyof typeof passwords, value: string) =>
      setPasswords((prev) => ({ ...prev, [key]: value })),
    []
  );

  return (
    <div className="flex flex-col gap-8 px-4 md:px-8">
      <div>
        <h1 className="text-[20px] md:text-3xl font-bold text-[#003366] mb-8">
          Settings
        </h1>

        {/* Tabs */}
        <div className="flex border-gray-200 mb-8">
          <button
            onClick={() => setActiveTab("profile")}
            className={`px-4 md:px-6 py-2 md:py-4 font-medium text-sm md:text-2xl transition-colors ${
              activeTab === "profile"
                ? "text-[#003366] bg-[#D6EBFF] rounded-lg"
                : "text-[#726C6C] hover:text-gray-900"
            }`}
          >
            Profile Settings
          </button>

          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 md:px-6 py-2 md:py-4 font-medium text-sm md:text-2xl transition-colors ${
              activeTab === "security"
                ? "text-[#003366] bg-[#D6EBFF] rounded-lg"
                : "text-[#726C6C] hover:text-gray-900"
            }`}
          >
            Security
          </button>
        </div>

        <Card className="bg-[#FAFAFA]">
          {activeTab === "profile" && (
            <div className="p-6">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      First Name
                    </label>
                    <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2">
                      <Input
                        placeholder="John"
                        className="placeholder:text-gray-400 text-black w-full"
                        value={profile.firstName}
                        onChange={(e) =>
                          updateProfileField("firstName", e.target.value)
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Last Name
                    </label>
                    <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2">
                      <Input
                        placeholder="Doe"
                        className="placeholder:text-gray-400 text-black w-full"
                        value={profile.lastName}
                        onChange={(e) =>
                          updateProfileField("lastName", e.target.value)
                        }
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2">
                    <Input
                      placeholder="fanawo@yahoo.com"
                      className="placeholder:text-gray-400 text-black w-full"
                      value={profile.email}
                      onChange={(e) =>
                        updateProfileField("email", e.target.value)
                      }
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-4 pt-6 border-gray-200">
                  <Button className="text-[#0A0A0B]">Cancel</Button>
                  <Button className="bg-[#003366] hover:bg-blue-800 text-white">
                    Save changes
                  </Button>
                </div>
              </form>
            </div>
          )}

          {activeTab === "security" && (
            <div className="p-6">
              <form className="space-y-6">
                <PasswordField
                  label="Current Password"
                  value={passwords.current}
                  onChange={(v) => updatePasswordField("current", v)}
                  showPassword={showPassword}
                  toggleShow={toggleShowPassword}
                  isLoading={isLoading}
                />

                <PasswordField
                  label="New Password"
                  value={passwords.new}
                  onChange={(v) => updatePasswordField("new", v)}
                  showPassword={showPassword}
                  toggleShow={toggleShowPassword}
                  isLoading={isLoading}
                />

                <PasswordField
                  label="Confirm New Password"
                  value={passwords.confirm}
                  onChange={(v) => updatePasswordField("confirm", v)}
                  showPassword={showPassword}
                  toggleShow={toggleShowPassword}
                  isLoading={isLoading}
                />

                <div className="flex justify-end gap-4 pt-6 border-gray-200">
                  <Button className="text-[#0A0A0B]">Cancel</Button>
                  <Button className="bg-[#003366] hover:bg-blue-800 text-white">
                    Update password
                  </Button>
                </div>
              </form>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
