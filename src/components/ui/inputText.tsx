import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

//customize css
const inputVariants = cva();

export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement>,
        VariantProps<typeof inputVariants> {
    asChild?: boolean;
    containerClassName?: string;
    labelText: string;
    labelClassName?: string;
}

const InputText = React.forwardRef<HTMLInputElement, InputProps>(
    (
        {
            className,
            containerClassName,
            labelText,
            labelClassName,
            id,
            ...props
        },
        ref
    ) => {
        return (
            <div className={containerClassName}>
                <label htmlFor={id} className={labelClassName}>
                    {labelText}
                </label>
                <input
                    className={cn(inputVariants({ className }))}
                    ref={ref}
                    {...props}
                />
            </div>
        );
    }
);

InputText.displayName = "Input";

export { InputText, inputVariants };
