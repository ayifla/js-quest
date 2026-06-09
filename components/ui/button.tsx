import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl font-bold transition-all focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-brand px-5 py-3 text-white shadow-button hover:-translate-y-0.5 hover:bg-brand-dark active:translate-y-1 active:shadow-none",
        secondary: "border-2 border-slate-200 bg-white px-5 py-3 text-ink hover:border-brand/30 hover:bg-brand-light",
        ghost: "px-4 py-2 text-slate-600 hover:bg-slate-100 hover:text-ink",
        dark: "bg-ink px-5 py-3 text-white shadow-[0_5px_0_#05080b] hover:-translate-y-0.5 active:translate-y-1 active:shadow-none"
      },
      size: {
        default: "h-12 text-sm",
        sm: "h-10 rounded-xl px-4 text-sm",
        lg: "h-14 px-7 text-base"
      }
    },
    defaultVariants: { variant: "default", size: "default" }
  }
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  }
);
Button.displayName = "Button";
