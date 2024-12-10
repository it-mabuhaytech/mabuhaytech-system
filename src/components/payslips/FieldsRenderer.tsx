import { SetStateAction } from "react";
import { FormField } from "./FormField";
import { PayslipData, PayslipField } from "./payslip";
import { ErrorType } from "./validation";

interface FieldsRendererProps {
  fields: PayslipField[];
  styles: string;
  payslipData: PayslipData;
  errors: Record<string, ErrorType>;
  setPayslipData: (value: SetStateAction<PayslipData>) => void;
  handleFieldValidation: (
    field: PayslipField,
    value: string | number
  ) => ErrorType | null;
}

export const FieldsRenderer: React.FC<FieldsRendererProps> = ({
  fields,
  styles,
  payslipData,
  errors,
  setPayslipData,
  handleFieldValidation,
}) => {
  return (
    <div className={styles}>
      {fields.map((field) => {
        return (
          <FormField
            key={field.name}
            {...field}
            value={payslipData[field.name as keyof PayslipData]}
            onChange={(value: string | number) => {
              setPayslipData((prev: PayslipData) => ({
                ...prev,
                [field.name]: value,
              }));
              handleFieldValidation(field, value);
            }}
            error={errors[field.name]}
          />
        );
      })}
    </div>
  );
};
