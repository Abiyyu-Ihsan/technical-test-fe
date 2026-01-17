import { cn } from "@libs/utils/cn";
import { VariantProps, cva } from "class-variance-authority";
import React, { FC } from "react";

export const inputTextVariants = cva("peer", {
    variants: {
        typeInput: {
            err: "border-danger bg-[#FFF9F9]",
            default: "border-slate-300 bg-white focus:border-primary",
        },
    },
    defaultVariants: {
        typeInput: "default",
    },
});

interface InputNumberProps
    extends React.HTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputTextVariants> {
    icon?: React.ReactNode;
    className?: string;
    disabled?: boolean;
    err?: boolean;
    errMessage?: any;
    title: string;
    onlyNumber?: boolean
    icons?: string;
    pattern?: string;
    name: string;
    placeholder?: string;
    value?: string | undefined;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => any;
    onFocus?: (event: React.FocusEvent<HTMLInputElement>) => any;
}

export const InputNumber = React.forwardRef<HTMLInputElement, InputNumberProps>(
    (
        {
            className,
            typeInput,
            icon,
            title,
            name,
            value,
            placeholder = "",
            icons,
            err,
            errMessage,
            onChange,
            onFocus,
            disabled = false,
            ...props
        },
        ref
    ) => {
        return (
            <div className="">
                <div className="relative form-floating">
                    <div className="flex items-center mb-1">

                        <p className="text-[#000F46] text-sm font-medium leading-5">{title} </p>
                        <img src={icons} />
                    </div>

                    <input
                     type={props.onlyNumber ? "number" : "text"}
                        name={name}
                        id={name}
                        value={value}
                        onChange={(e) => {
                            if (props.onlyNumber) {
                                e.target.value = e.target.value.replace(/[^0-9]/g, "")
                            }
                            onChange?.(e)
                        }}
                        onFocus={onFocus}
                        className={cn(inputTextVariants({ typeInput, className }))}
                        placeholder={placeholder}
                        disabled={disabled}
                        ref={ref}
                        inputMode={props.onlyNumber ? "numeric" : undefined}
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
                    <div className="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none text-gray-300">
                        {icon}
                    </div>
                </div>
                {err && <span className="text-xs text-danger pl-2 ">{errMessage}</span>}
            </div>
        );
    }
);
InputNumber.displayName = "InputNumber";
