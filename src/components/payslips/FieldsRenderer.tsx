import { SetStateAction } from "react";
import { FormField } from "./FormField";
import { PayslipData, PayslipField } from "./payslip";
import { ErrorType } from "./validation";

interface FieldsRendererProps {
  fields: PayslipField | PayslipField[];
  styles: string;
  payslipData: PayslipData;
  errors: Record<string, ErrorType>;
  setPayslipData: (value: SetStateAction<PayslipData>) => void;
  handleFieldValidation: (
    field: PayslipField,
    value: string | number
  ) => ErrorType | null;
  viewOnly?: boolean;
}

export const FieldsRenderer: React.FC<FieldsRendererProps> = ({
  fields,
  styles,
  payslipData,
  errors,
  setPayslipData,
  handleFieldValidation,
  viewOnly,
}) => {
  return (
    <div className={styles}>
      {Array.isArray(fields) ? (
        fields.map((field) => (
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
            auto={viewOnly || field.auto}
          />
        ))
      ) : (
        <FormField
          {...fields}
          value={payslipData[fields.name as keyof PayslipData]}
          onChange={(value: string | number) => {
            setPayslipData((prev: PayslipData) => ({
              ...prev,
              [fields.name]: value,
            }));
            handleFieldValidation(fields, value);
          }}
          auto={fields.auto}
        />
      )}
      {/* {fields.map((field) => {
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
            auto={viewOnly || field.auto}
          />
        );
      })} */}
    </div>
  );
};
