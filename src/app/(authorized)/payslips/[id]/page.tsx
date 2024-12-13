"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  PayslipData,
  PayslipField,
  compensationFields,
  deductionFields,
  employeeFields,
  generatePayslipId,
  initialPayslipData,
  yearToDateFields,
} from "@/components/payslips/payslip";
import {
  ErrorType,
  noEarlyEndDate,
  noLateStartDate,
  nonEmptyString,
  nonNegativeNumber,
} from "@/components/payslips/validation";
import { calculateTotals } from "@/components/payslips/calculations";
import { FieldsRenderer } from "@/components/payslips/FieldsRenderer";

import BackButton from "@/components/ui/backButton";
import DeleteButton from "@/components/ui/deleteButton";
import { checkUserRoleAdmin } from "@/utils/checkAccess";

const PayslipDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [payslipData, setPayslipData] =
    useState<PayslipData>(initialPayslipData);

  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [errors, setErrors] = useState<Record<string, ErrorType>>({});

  useEffect(() => {
    const setRole = async () => {
      const isAdmin = await checkUserRoleAdmin();
      setIsAdmin(isAdmin);
      setIsLoading(false);
    };
    setRole();
  }, []);

  useEffect(() => {
    const fetchPayslip = async () => {
      const response = await fetch(`/api/payslips/${params.id}`);
      if (response.status === 404) setNotFound(true);
      const data = await response.json();
      setPayslipData(data);
      setIsLoading(false);
    };
    fetchPayslip();
  }, [params.id]);

  if (notFound) return <div>Payslip not found</div>;
  if (isLoading) return <div>Loading...</div>;

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

    setPayslipData({
      ...payslipData,
      payslipId: generatePayslipId(),
    });

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
    <div className="max-w-fit mx-auto space-y-3 justify-end">
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
                  auto={true}
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
                  auto={true}
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
                  auto={true}
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
                  auto={true}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <BackButton />
        {!isLoading && isAdmin && (
          <DeleteButton
            itemId={payslipData.payslipId}
            itemType="payslip"
            apiEndpoint="/api/payslips"
            confirmMessage="Are you sure you want to delete this payslip? This action cannot be undone."
          />
        )}
      </div>
    </div>
  );
};

export default PayslipDetail;
