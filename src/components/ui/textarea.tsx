import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md px-3 py-2 text-base md:text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 focus-visible:outline-none outline-none ring-0 focus:ring-0 focus-visible:ring-0",
        className,
      )}
      style={{
        border: "1px solid rgba(168, 192, 168, 0.35)",
        backgroundColor: "rgba(12, 70, 81, 0.35)",
        color: "hsl(var(--foreground))",
      }}
      onFocus={(e) => {
        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(168, 192, 168, 0.6)";
      }}
      onBlur={(e) => {
        (e.target as HTMLTextAreaElement).style.borderColor = "rgba(168, 192, 168, 0.35)";
      }}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
