import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 font-sans font-medium whitespace-nowrap no-underline transition-[transform,background-color,color] duration-(--t-hover) ease-out select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),black_14%)]",
        inverse: "bg-primary-foreground text-primary hover:bg-[color-mix(in_oklch,var(--primary-foreground),white_30%)]",
        secondary: "bg-surface text-foreground hover:bg-[color-mix(in_oklch,var(--surface),var(--foreground)_8%)]",
        link: "px-0 text-current underline decoration-[0.07em] underline-offset-[0.18em]",
      },
      size: {
        default: "min-h-12 px-6 text-body",
        sm: "min-h-11 px-4 text-small",
        lg: "min-h-14 px-7 text-body",
      },
      shape: {
        site: "rounded-site",
        pill: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      shape: "site",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> & VariantProps<typeof buttonVariants>;

function Button({ className, variant, size, shape, type = "button", ...props }: ButtonProps) {
  return <button type={type} className={cn(buttonVariants({ variant, size, shape }), className)} {...props} />;
}

export { Button, buttonVariants };
