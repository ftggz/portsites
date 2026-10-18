import * as React from "react";

import { cn } from "@/lib/utils";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "field-sizing-content min-h-32 w-full rounded-site border-0 bg-input px-4 py-3 text-body text-foreground transition-[background-color] duration-(--t-hover) placeholder:text-muted-foreground aria-invalid:outline-2 aria-invalid:outline-offset-3 aria-invalid:outline-ring aria-invalid:outline-dashed disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
