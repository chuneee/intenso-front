import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "./utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[background-color,color,box-shadow,border-color] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-intenso-teal text-white [a&]:hover:bg-intenso-teal-hover",
        secondary:
          "border-intenso-border bg-intenso-teal-soft text-intenso-teal-active [a&]:hover:bg-intenso-teal-soft/80",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border-intenso-border bg-transparent text-intenso-text [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",

        muted:
          "border-intenso-border bg-muted text-muted-foreground [a&]:hover:bg-muted/80",
        purple:
          "border-transparent bg-intenso-purple text-white [a&]:hover:bg-intenso-purple/90",
        pink: "border-transparent bg-intenso-pink text-white [a&]:hover:bg-intenso-pink/90",
        yellow:
          "border-transparent bg-intenso-yellow text-intenso-text [a&]:hover:bg-intenso-yellow/90",
        draft:
          "border-intenso-yellow/40 bg-intenso-yellow/15 text-intenso-text [a&]:hover:bg-intenso-yellow/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
