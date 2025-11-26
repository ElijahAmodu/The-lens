// "use client";

// import { Search, Menu } from "lucide-react";
// import { Input } from "@/component/ui/input";
// import { Avatar, AvatarFallback } from "@/component/ui/avatar";

// interface DashboardHeaderProps {
//   onMenuClick: () => void;
// }

// export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
//   return (
//     <div>
//       <div className="flex items-center justify-between gap-4 bg-[#F0F3F9] md:bg-[#FAFAFA] pt-6 md:py-6 px-4 md:px-8">
//         {/* Search */}
//         <div className="hidden md:flex w-full">
//           <div className="border border-[#E3E3E3] rounded-md w-full px-2 py-2 flex">
//             <Search className="w-6 h-6 text-[#CCCBCB]" />
//             <Input
//               placeholder="Search"
//               className="pl-2 placeholder:text-gray-400 text-black w-full"
//             />
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <button
//           onClick={onMenuClick}
//           className="bg-[#FFFFFF] p-2 rounded-md md:hidden"
//           type="button"
//           aria-label="Open menu"
//         >
//           <Menu className="w-6 h-6 text-gray-600" />
//         </button>

//         {/* Right Section */}
//         <div className="flex items-center gap-6">
//           <div className="flex items-center gap-3">
//             <Avatar className="w-10 h-10 bg-blue-500">
//               <AvatarFallback className="bg-blue-500 text-white font-bold">
//                 JD
//               </AvatarFallback>
//             </Avatar>
//             <span className="font-medium text-gray-900 whitespace-nowrap">
//               John Doe
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="py-6 px-4 md:px-8">
//         <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2 md:hidden">
//           <Search className="w-6 h-6 text-[#CCCBCB]" />
//           <Input
//             placeholder="Search"
//             className="pl-2 placeholder:text-gray-400 text-black w-full"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { Search, Menu } from "lucide-react";
import { Input } from "@/component/ui/input";
import { Avatar, AvatarFallback } from "@/component/ui/avatar";

interface DashboardHeaderProps {
  onMenuClick: () => void;
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 bg-[#F0F3F9] md:bg-[#FAFAFA] pt-6 md:py-6 px-4 md:px-8">
        {/* Search */}
        <div className="hidden md:flex w-full">
          <div className="border border-[#E3E3E3] rounded-md w-full px-2 py-2 flex">
            <Search className="w-6 h-6 text-[#CCCBCB]" />
            <Input
              placeholder="Search"
              className="pl-2 placeholder:text-gray-400 text-black w-full"
            />
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={onMenuClick}
          className="bg-[#FFFFFF] p-2 rounded-md md:hidden"
          type="button"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6 text-gray-600" />
        </button>

        {/* Right Section */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 bg-blue-500">
              <AvatarFallback className="bg-blue-500 text-white font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-gray-900 whitespace-nowrap">
              John Doe
            </span>
          </div>
        </div>
      </div>

      <div className="py-6 px-4 md:px-8">
        <div className="flex border border-[#E3E3E3] rounded-md w-full px-2 py-2 md:hidden">
          <Search className="w-6 h-6 text-[#CCCBCB]" />
          <Input
            placeholder="Search"
            className="pl-2 placeholder:text-gray-400 text-black w-full"
          />
        </div>
      </div>
    </div>
  );
}
