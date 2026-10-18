import * as React from "react";

import { cn } from "@/lib/utils";

function Label({ className, htmlFor, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      htmlFor={htmlFor}
      className={cn(
        "flex items-center gap-2 text-small leading-none font-medium select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}

export { Label };
