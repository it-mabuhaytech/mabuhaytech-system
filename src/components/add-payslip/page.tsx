"use client";

import { useState } from "react";

import {
  ErrorType,
  PayslipData,
  PayslipField,
  compensationFields,
  deductionFields,
  employeeFields,
  initialPayslipData,
  noEarlyEndDate,
  noLateStartDate,
  nonEmptyString,
  nonNegativeNumber,
  payDateFields,
  summaryFields,
  yearToDateFields,
} from "@/components/add-payslip/payslip";

const FormField = ({
  label,
  type,
  value,
  onChange,
  error,
  showBorderError = false,
}: {
  label: string;
  type: string;
  value: string | number;
  onChange: (value: string | number) => void;
  error?: ErrorType;
  showBorderError?: boolean;
}) => {
  const displayValue = type === "number" ? value.toString() : value;
  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={displayValue}
        onChange={(e) => {
          const inputValue = e.target.value;
          if (type === "number") {
            const numValue = inputValue === "" ? 0 : Number(inputValue);
            onChange(numValue);
          } else {
            onChange(inputValue);
          }
        }}
        className={`w-full border rounded-lg p-2 ${
          error || showBorderError ? "border-red-500" : ""
        }`}
      />
      <label className="block text-sm text-red-500 font-medium min-h-5">
        {error?.message}
      </label>
    </div>
  );
};

const AddPayslipsPage: React.FC = () => {
  const [payslipData, setPayslipData] =
    useState<PayslipData>(initialPayslipData);
  const [errors, setErrors] = useState<Record<string, ErrorType>>({});

  const validateDateField = (
    fieldName: string,
    value: string,
    payslipData: PayslipData
  ): ErrorType | null => {
    if (fieldName === "payBeginDate") {
      return noLateStartDate(value, payslipData.payEndDate);
    } else if (fieldName === "payEndDate") {
      return noEarlyEndDate(value, payslipData.payBeginDate);
    }
    return null;
  };

  const handleFieldValidation = (
    field: PayslipField,
    value: string | number
  ) => {
    let error: ErrorType | null;

    if (field.type === "date") {
      error = validateDateField(field.name, value as string, payslipData);
    } else if (field.type === "number") {
      error = nonNegativeNumber(value as number);
    } else {
      error = nonEmptyString(value as string);
    }

    setErrors((prev) => {
      if (error) {
        return { ...prev, [field.name]: error };
      }
      const newErrors = { ...prev };
      delete newErrors[field.name];
      return newErrors;
    });

    return error;
  };

  interface FieldsRendererProps {
    fields: PayslipField[];
    styles: string;
  }

  const FieldsRenderer: React.FC<FieldsRendererProps> = ({
    fields,
    styles,
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
                setPayslipData((prev) => ({
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, ErrorType> = {};

    const startDateError = noLateStartDate(
      payslipData.payBeginDate,
      payslipData.payEndDate
    );

    const endDateError = noEarlyEndDate(
      payslipData.payEndDate,
      payslipData.payBeginDate
    );

    if (startDateError) {
      newErrors.payBeginDate = startDateError;
    } else if (endDateError) {
      newErrors.payEndDate = endDateError;
    }

    Object.entries(payslipData).forEach(
      ([key, value]: [string, string | number]) => {
        const error =
          typeof value === "string"
            ? nonEmptyString(value)
            : nonNegativeNumber(value);
        if (error) {
          newErrors[key] = error;
        }
      }
    );

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const response = await fetch("/api/payslips/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payslipData),
      });

      if (response.ok) {
        setPayslipData(initialPayslipData);
      }
    }
  };

  return (
    <div className="max-w-fit mx-auto">
      <form onSubmit={handleSubmit} className="flex flex-row gap-6">
        <div className="flex flex-row gap-4 bg-white shadow-lg border rounded-lg p-8">
          <div className="space-y-2">
            <div className="flex flex-row gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2 col-span-2">
                  Employee Information
                </h2>
                <FieldsRenderer
                  fields={employeeFields}
                  styles={"grid grid-cols-2 gap-4"}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Compensation</h2>
                <FieldsRenderer
                  fields={compensationFields}
                  styles={"grid grid-cols-2 gap-4"}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Pay Cycle</h2>
              <FieldsRenderer
                fields={payDateFields.map((field) => ({
                  ...field,
                  showBorderError:
                    (field.name === "payBeginDate" && errors.payEndDate) ||
                    (field.name === "payEndDate" && errors.payBeginDate)
                      ? true
                      : false,
                }))}
                styles={"grid grid-cols-2 gap-4"}
              />
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">Deductions</h2>
              <FieldsRenderer
                fields={deductionFields}
                styles={"grid grid-cols-4 gap-4"}
              />
            </div>

            <div className="flex flex-col gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Summary</h2>
                <FieldsRenderer
                  fields={summaryFields}
                  styles={"grid grid-cols-2 gap-4"}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Add Payslip
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddPayslipsPage;
