import { cn } from "@libs/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React from "react";
import IconLoading from "../../../public/icons/IconLoading";

const buttonVariants = cva("btn font-medium", {
  variants: {
    btnWidth: {
      full: "w-full",
      fit: "w-fit",
    },
    btnColor: {
      primary: "bg-primary text-white normal-case",
      primaryHover: "bg-primary text-white hover:bg-white hover:text-primary",
      secondary: "bg-white text-primary hover:bg-primary hover:text-white",
      danger: "bg-danger text-white",
      success: "bg-success text-white",
      cancel:
        "bg-white text-danger border-2 border-slate-400 hover:bg-danger hover:text-white normal-case",
        white: "bg-white text-slate-800 border-2 border-slate-300"
    },
    btnSize: {
      lg: "py-3 px-8 text-base normal-case",
      md: "py-2 px-5 text-sm sm:py-3 sm:px-8 sm:text-base normal-case",
      sm: "py-2 px-3 text-xs normal-case",
      dashboard: "py-[6px] px-[8px] text-base",
    },
  },
  defaultVariants: {
    btnWidth: "fit",
    btnColor: "primary",
    btnSize: "md",
  },
});

interface ButtonProps
  extends React.HTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  isLoading?: boolean;
  title?: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => any;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      children,
      type = "button",
      isLoading = false,
      btnWidth,
      btnColor,
      btnSize,
      title,
      icon,
      disabled = false,
      onClick,
      ...props
    },
    ref
  ) => {
    return (
      <button
        className={cn(
          buttonVariants({ btnWidth, btnColor, btnSize, className })
        )}
        disabled={isLoading ? true : disabled}
        {...props}
        type={type}
        onClick={onClick}
        ref={ref}
      >
        {isLoading ? <IconLoading width={20} height={20} /> : icon}
        {children ? children : title}
      </button>
    );
  }
);
Button.displayName = "Button";

export default Button;
