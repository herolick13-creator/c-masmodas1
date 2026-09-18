import React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-semibold tracking-tight text-slate-700 dark:text-slate-200 select-none",
          className
        )}
        {...props}
      />
    );
  }
);

Label.displayName = "Label";
