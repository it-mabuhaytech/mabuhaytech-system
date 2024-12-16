"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  PayslipData,
  PayslipField,
  compensationFields,
  deductionFields,
  employeeFields,
  initialPayslipData,
  netPayField,
  yearToDateFields,
} from "@/components/payslips/payslip";

import { FieldsRenderer } from "./FieldsRenderer";
import {
  ErrorType,
  noEarlyEndDate,
  noLateStartDate,
  nonEmptyString,
  nonNegativeNumber,
} from "./validation";
import { calculateTotals } from "./calculations";

const AddPayslips: React.FC = () => {
  const router = useRouter();

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

    const newPayslipData = {
      ...payslipData,
      [field.name]: value,
    };

    const totals = calculateTotals(newPayslipData);

    setPayslipData({
      ...newPayslipData,
      totalCompensations: totals.totalCompensations,
      totalDeductions: totals.totalDeductions,
      netPay: totals.netPay,
      yearlyTax: totals.yearlyTax,
      yearlySSS: totals.yearlySSS,
    });

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

    if (Object.keys(newErrors).length > 0) return;

    const response = await fetch("/api/payslips/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payslipData),
    });

    if (response.ok) {
      router.push("/payslips");
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="flex flex-row gap-6">
        <div className="flex flex-row gap-4 bg-white shadow-lg border rounded-lg p-5">
          <div className="space-y-2">
            <div className="flex flex-row justify-between">
              <div>
                <h2 className="text-lg font-semibold mb-2 col-span-2">
                  Employee Information
                </h2>
                <FieldsRenderer
                  fields={employeeFields}
                  styles={"grid grid-cols-2 gap-4"}
                  payslipData={payslipData}
                  errors={errors}
                  setPayslipData={setPayslipData}
                  handleFieldValidation={handleFieldValidation}
                />
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Compensation</h2>
                <FieldsRenderer
                  fields={compensationFields}
                  styles={"grid grid-cols-2 gap-4"}
                  payslipData={payslipData}
                  errors={errors}
                  setPayslipData={setPayslipData}
                  handleFieldValidation={handleFieldValidation}
                />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div>
                <h2 className="text-lg font-semibold mb-2">Deductions</h2>
                <FieldsRenderer
                  fields={deductionFields}
                  styles={"grid grid-cols-2 gap-4"}
                  payslipData={payslipData}
                  errors={errors}
                  setPayslipData={setPayslipData}
                  handleFieldValidation={handleFieldValidation}
                />
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Year-to-date</h2>
                <FieldsRenderer
                  fields={yearToDateFields}
                  styles={"grid grid-cols-2 gap-4"}
                  payslipData={payslipData}
                  errors={errors}
                  setPayslipData={setPayslipData}
                  handleFieldValidation={handleFieldValidation}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
            >
              Save changes
            </button>
          </div>
        </div>
      </form>
      <div className="absolute left-full ml-4 top-0 w-max h-fit bg-white shadow-lg border rounded-lg p-5">
        <h2 className="text-lg font-semibold mb-2 w-fit">Net Pay</h2>
        <FieldsRenderer
          fields={netPayField}
          styles={""}
          payslipData={payslipData}
          errors={errors}
          setPayslipData={setPayslipData}
          handleFieldValidation={handleFieldValidation}
        />
      </div>
    </div>
  );
};

export default AddPayslips;
