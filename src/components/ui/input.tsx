import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "min-h-13 w-full min-w-0 rounded-site border-0 bg-input px-4 text-body text-foreground transition-[background-color] duration-(--t-hover) placeholder:text-muted-foreground aria-invalid:outline-2 aria-invalid:outline-offset-3 aria-invalid:outline-ring aria-invalid:outline-dashed disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
