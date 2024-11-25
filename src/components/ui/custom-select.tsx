import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

//customize css
const selectVariants = cva();

export interface SelectProps
    extends React.SelectHTMLAttributes<HTMLSelectElement>,
        VariantProps<typeof selectVariants> {
    asChild?: boolean;
    containerClassName?: string;
    labelText: string;
    labelClassName?: string;
    data: { label: string; value: string }[];
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    (
        {
            className,
            containerClassName,
            labelText,
            labelClassName,
            data,
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
                <select
                    className={cn(selectVariants({ className }))}
                    ref={ref}
                    {...props}
                >
                    {data.map((dt) => (
                        <option key={dt.value} value={dt.value}>
                            {dt.label}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
);

Select.displayName = "Select";

export { Select, selectVariants };
