import { useEffect, useState } from "react";
import withAuthAdmin from "@/hoc/withAuthAdmin";

import {
  PayslipData,
  PayslipField,
  compensationFields,
  deductionFields,
  employeeFields,
  initialPayslipData,
  summaryFields,
  yearToDateFields,
} from "@/components/add-payslip/payslip";

const FormField = ({
  name,
  label,
  type,
  value,
  onChange,
}: {
  name: string;
  label: string;
  type: string;
  value: string | number;
  onChange: (value: any) => void;
}) => (
  <div>
    <label className="block text-sm font-medium">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) =>
        onChange(type === "number" ? Number(e.target.value) : e.target.value)
      }
      className="w-full border rounded-lg p-2"
      required
    />
  </div>
);

const PayslipsPage: React.FC = () => {
  const [payslipData, setPayslipData] =
    useState<PayslipData>(initialPayslipData);

  const renderFields = (
    fields: PayslipField[],
    data: PayslipData,
    setData: React.Dispatch<React.SetStateAction<PayslipData>>
  ) => (
    <div className="grid grid-cols-2 gap-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          {...field}
          value={data[field.name as keyof PayslipData]}
          onChange={(value) =>
            setData((prev) => ({
              ...prev,
              [field.name]: value,
            }))
          }
        />
      ))}
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
  };

  return (
    <div className="max-w-fit mx-auto p-6">
      <form onSubmit={handleSubmit} className="flex flex-row gap-6">
        <div className="flex flex-row gap-4 bg-white shadow-lg border rounded-lg p-8">
          <div className="space-y-6">
            <div className="flex flex-row gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2 col-span-2">
                  Employee Information
                </h2>
                {renderFields(employeeFields, payslipData, setPayslipData)}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Compensation</h2>
                {renderFields(compensationFields, payslipData, setPayslipData)}
              </div>
            </div>

            <div className="flex flex-row gap-4">
              <div>
                <h2 className="text-lg font-semibold mb-2">Deductions</h2>
                {renderFields(deductionFields, payslipData, setPayslipData)}
              </div>

              <div>
                <h2 className="text-lg font-semibold mb-2">Year-to-Date</h2>
                {renderFields(yearToDateFields, payslipData, setPayslipData)}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6 bg-white shadow-lg border rounded-lg p-8 max-h-fit">
          <div className="flex flex-row gap-4">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold mb-2">Summary</h2>
              <div>
                {renderFields(
                  summaryFields.slice(0, 2),
                  payslipData,
                  setPayslipData
                )}
              </div>
              <div>
                {renderFields(
                  summaryFields.slice(2, 4),
                  payslipData,
                  setPayslipData
                )}
              </div>
              <div className="w-full">
                <FormField
                  name="netPay"
                  label="Net Pay"
                  type="number"
                  value={payslipData.netPay}
                  onChange={(value) =>
                    setPayslipData((prev: any) => ({ ...prev, netPay: value }))
                  }
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Generate Payslip
          </button>
        </div>
      </form>
    </div>
  );
};

export default withAuthAdmin(PayslipsPage);
