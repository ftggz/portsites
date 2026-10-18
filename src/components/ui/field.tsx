import * as React from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field-group" className={cn("flex w-full flex-col gap-s4", className)} {...props} />;
}

function Field({ className, ...props }: React.ComponentProps<"div">) {
  return <div data-slot="field" className={cn("flex w-full flex-col gap-s2", className)} {...props} />;
}

function FieldLabel({ className, ...props }: React.ComponentProps<typeof Label>) {
  return <Label data-slot="field-label" className={cn("w-fit leading-snug", className)} {...props} />;
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p data-slot="field-description" className={cn("m-0 text-small leading-normal text-muted-foreground", className)} {...props} />
  );
}

function FieldError({ className, children, ...props }: React.ComponentProps<"p">) {
  if (!children) return null;
  return (
    <p data-slot="field-error" className={cn("m-0 text-small leading-snug font-medium", className)} {...props}>
      {children}
    </p>
  );
}

export { Field, FieldDescription, FieldError, FieldGroup, FieldLabel };
