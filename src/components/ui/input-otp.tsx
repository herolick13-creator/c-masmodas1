import React, { createContext, useContext, useRef } from "react";
import { cn } from "@/lib/utils";

interface OTPContextType {
  value: string;
  onChange: (val: string) => void;
  maxLength: number;
  inputRef: React.RefObject<HTMLInputElement | null>;
}

const OTPContext = createContext<OTPContextType | null>(null);

export interface InputOTPProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  maxLength?: number;
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

export function InputOTP({
  maxLength = 6,
  value,
  onChange,
  children,
  className,
  autoFocus,
  ...props
}: InputOTPProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, "").slice(0, maxLength);
    onChange(rawVal);
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text/plain").replace(/\D/g, "").slice(0, maxLength);
    if (pasted) {
      onChange(pasted);
    }
  };

  return (
    <OTPContext.Provider value={{ value, onChange, maxLength, inputRef }}>
      <div className={cn("relative inline-block cursor-text select-none", className)}>
        {/* Hidden but focused real input to receive mobile numeric keyboards and desktop keystrokes seamlessly */}
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          maxLength={maxLength}
          value={value}
          onChange={handleInputChange}
          onPaste={handlePaste}
          autoFocus={autoFocus}
          className="absolute inset-0 h-full w-full opacity-0 z-10 cursor-pointer pointer-events-auto"
          {...props}
        />
        <div className="relative flex items-center">{children}</div>
      </div>
    </OTPContext.Provider>
  );
}

export function InputOTPGroup({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("flex items-center gap-2 sm:gap-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function InputOTPSlot({
  index,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { index: number }) {
  const context = useContext(OTPContext);
  if (!context) {
    throw new Error("InputOTPSlot must be used within InputOTP");
  }

  const { value } = context;
  const char = value[index] || "";
  const isCurrent = value.length === index || (index === context.maxLength - 1 && value.length === context.maxLength);
  const isFilled = Boolean(char);

  return (
    <div
      className={cn(
        "relative flex h-12 w-11 sm:h-14 sm:w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-lg sm:text-xl font-bold tracking-tight text-slate-900 shadow-xs transition-all duration-150 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100",
        isCurrent && "border-blue-600 ring-2 ring-blue-500/20 dark:border-blue-400 dark:ring-blue-400/20 scale-105",
        isFilled && "border-slate-400 bg-blue-50/30 dark:border-slate-600 dark:bg-slate-800/60 text-blue-700 dark:text-blue-300",
        className
      )}
      {...props}
    >
      {char}
      {!char && isCurrent && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-5 w-0.5 animate-pulse bg-blue-600 dark:bg-blue-400" />
        </div>
      )}
    </div>
  );
}
