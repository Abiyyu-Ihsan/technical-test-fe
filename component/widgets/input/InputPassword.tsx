import { cn } from "@libs/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC, useState } from "react";
import { inputTextVariants } from "./InputText";
import { Eye, EyeClosed } from "lucide-react";

interface InputPasswordProps
  extends React.HTMLAttributes<HTMLInputElement>,
  VariantProps<typeof inputTextVariants> {
  icon?: React.ReactNode;
  className?: string;
  err?: boolean;
  icons?: string;
  errMessage?: string;
  title: string;
  name: string;
  placeholder?: string;
  value?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
}

export const InputPassword = React.forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(
  (
    {
      className,
      typeInput,
      icons,
      icon,
      title,
      name,
      value,
      placeholder = " ",
      err,
      errMessage,
      onChange,
      onFocus,
      disabled = false,
      ...props
    },
    ref
  ) => {
    const [passwordType, setPasswordType] = useState("password");
    const togglePassword = (
      e: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
      e.preventDefault();
      if (passwordType === "password") {
        setPasswordType("text");
        return;
      }
      setPasswordType("password");
    };

    return (
      <div className="">
        <div className="relative form-floating">
          <div className="flex items-center mb-1">
            <p className="text-[#000F46] text-sm font-medium leading-5">{title} </p>
            <img src={icons} />
          </div>
          <input
            type={passwordType}
            name={name}
            id={name}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            className={cn(inputTextVariants({ typeInput, className }))}
            placeholder={placeholder}
            ref={ref}
            disabled={disabled}
            {...props}
          />
          <label
            htmlFor={name}
            className={`
              ${!err ? `peer-focus:text-primary` : `peer-focus:text-danger`}
              peer-placeholder-shown:scale-100
              peer-placeholder-shown:translate-y-0
              peer-placeholder-shown:pt-0
              peer-focus:scale-75
              peer-focus:-translate-y-4
              peer-focus:pt-1`}
          >
          </label>
          <div
            className="absolute inset-y-0 mt-5 right-4 flex items-center pl-3 cursor-pointer text-gray-300"
            onClick={togglePassword}
          >
            {passwordType === "password" ? (
              <EyeClosed width={28} height={28} />
            ) : (
              <Eye width={28} height={28} />
            )}
          </div>
        </div>
        {err && <span className="text-xs text-danger pl-2">{errMessage}</span>}
      </div>
    );
  }
);
InputPassword.displayName = "InputPassword";
