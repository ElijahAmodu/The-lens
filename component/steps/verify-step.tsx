// "use client";

// import { Button } from "../ui/button";
// import { FormData } from "../signup-flow";
// import { ChevronRight } from "lucide-react";

// interface VerifyStepProps {
//   formData: FormData;
//   onContinue: (data: Partial<FormData>) => void;
//   onBack: () => void;
// }

// export default function VerifyStep({
//   formData,
//   onContinue,
//   onBack,
// }: VerifyStepProps) {
//   return (
//     <div className="space-y-8">
//       <div className="hidden md:block">
//         <h2 className="text-2xl md:text-[32px] font-semibold text-[#00264C] mb-2 md:mb-10">
//           Verify Information
//         </h2>
//       </div>

//       {/* Info Summary */}
//       <div className="space-y-4">
//         <div className="bg-gray-200 rounded-lg p-6 space-y-4">
//           <div className="flex justify-between items-start pb-4 border-b border-gray-200">
//             <div>
//               <p className="text-xs font-semibold text-[#003366] uppercase">
//                 Name
//               </p>
//               <p className="text-black font-medium mt-1">
//                 {formData.firstName} {formData.lastName}
//               </p>
//             </div>
//           </div>

//           <div className="flex justify-between items-start pb-4 border-b border-gray-200">
//             <div>
//               <p className="text-xs font-semibold text-[#003366] uppercase">
//                 Email
//               </p>
//               <p className="text-black font-medium mt-1">{formData.email}</p>
//             </div>
//           </div>

//           <div>
//             <p className="text-xs font-semibold text-[#003366] uppercase">
//               Security
//             </p>
//             <p className="text-black font-medium mt-1">
//               Password set and confirmed
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Buttons */}
//       <div className="flex justify-between gap-4">
//         <Button onClick={onBack} variant="outline" className="bg-[#003366]">
//           Back
//         </Button>
//         <Button
//           onClick={() => onContinue({})}
//           className=" flex gap-6 bg-[#003366] hover:bg-[#254e71] text-white px-10"
//         >
//           Complete Setup
//           <ChevronRight className=" left-3 top-3.5 h-5 w-5 text-[#FAFAFA]" />
//         </Button>
//       </div>
//     </div>
//   );
// }

"use client";

import { Button } from "../ui/button";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { FormData } from "../signup-flow";

interface VerifyStepProps {
  formData: FormData;
  onContinue: (data: Partial<FormData>) => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export default function VerifyStep({
  formData,
  onContinue,
  onBack,
  isLoading = false,
  error = null,
}: VerifyStepProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onContinue({});
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-[#00264C] mb-4">
          Review Your Information
        </h2>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-red-800">Signup Failed</p>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Personal Information */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-[#00264C]">Personal Information</h3>
          </div>
          <div className="pl-7 space-y-2">
            <div>
              <p className="text-sm text-[#898384]">Name</p>
              <p className="text-[#00264C] font-medium">
                {formData.firstName} {formData.lastName}
              </p>
            </div>
            <div>
              <p className="text-sm text-[#898384]">Email</p>
              <p className="text-[#00264C] font-medium">{formData.email}</p>
            </div>
          </div>
        </div>

        {/* Security Information */}
        <div className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <h3 className="font-medium text-[#00264C]">Security</h3>
          </div>
          <div className="pl-7">
            <p className="text-sm text-[#898384]">Password</p>
            <p className="text-[#00264C] font-medium">••••••••</p>
          </div>
        </div>

        {/* Information Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> Your email must be whitelisted by a super
            admin to create an account. If signup fails, please contact your
            administrator.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4 pt-4">
        <Button
          type="button"
          onClick={onBack}
          variant="outline"
          className="flex-1 py-6 text-lg font-semibold border-2 border-[#003366] text-[#003366] hover:bg-[#003366] hover:text-white transition"
          disabled={isLoading}
        >
          Back
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="flex-1 bg-[#003366] hover:bg-[#254e71] text-white text-lg font-semibold py-6 rounded-xl transition disabled:opacity-70"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
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
              Creating Account...
            </span>
          ) : (
            "Create Account"
          )}
        </Button>
      </div>
    </form>
  );
}
