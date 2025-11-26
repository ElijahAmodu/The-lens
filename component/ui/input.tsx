import * as React from "react";

import { cn } from "@/lib/utils";
import Image from "next/image";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  icon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isLoading, isSuccess, isError, icon, ...props }, ref) => {
    return (
      <div className="relative flex w-full">
        {icon && (
          <div className="absolute left-3 top-1/3 transform -translate-y-1/2">
            {icon}
          </div>
        )}
        <input
          type={type}
          className={cn(
            ` file:border-0 bg-black-1 file:text-sm file:font-medium focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
            className,
            icon ? "pl-8 " : ""
          )}
          ref={ref}
          {...props}
        />
        {isSuccess && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Image
              width={24}
              height={24}
              src="/icons/success.svg"
              alt="Success"
            />
          </div>
        )}
        {isError && (
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <Image width={24} height={24} src="/icons/error.svg" alt="Error" />
          </div>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
