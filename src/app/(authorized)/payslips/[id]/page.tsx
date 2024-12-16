"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PayslipData, initialPayslipData } from "@/components/payslips/payslip";
import DeleteButton from "@/components/ui/deleteButton";
import { checkUserRoleAdmin } from "@/utils/checkAccess";

import { MdEdit } from "react-icons/md";

const PayslipDetail: React.FC = () => {
  const router = useRouter();
  const params = useParams();

  const [payslipData, setPayslipData] =
    useState<PayslipData>(initialPayslipData);

  const [isAdmin, setIsAdmin] = useState<boolean>();
  const [isLoading, setIsLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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

  return (
    <div className="relative">
      <div className="w-[800px] space-y-4 ">
        <div className="flex flex-row">
          <div className="grid grid-cols-2 w-full">
            {[
              {
                label: "Employee Name",
                key: "employeeName",
                noBorderBottom: true,
              },
              { label: "Employee Number", key: "employeeId" },
              { label: "Department", key: "department" },
              { label: "Pay Begin Date", key: "payBeginDate" },
              { label: "Pay End Date", key: "payEndDate" },
              { label: "Position", key: "position" },
            ].map((item) => (
              <React.Fragment key={item.label}>
                <div
                  className={`bg-gray-800 text-white p-2 font-semibold border-l border-gray-500 ${
                    !item.noBorderBottom ? "border-b" : "border-y"
                  }`}
                >
                  {item.label}
                </div>
                <div
                  className={`p-2 border-x border-gray-500 ${
                    !item.noBorderBottom ? "border-b" : "border-y"
                  }`}
                >
                  {payslipData[item.key as keyof PayslipData]}
                </div>
              </React.Fragment>
            ))}
          </div>{" "}
          <div className="w-full">
            <div className="bg-gray-800 text-white p-2 font-semibold border-r border-y border-gray-500 text-center">
              Compensation
            </div>
            <div className="grid grid-cols-2">
              {[
                { label: "Basic Salary", key: "basicSalary" },
                { label: "Allowance", key: "allowance" },
                { label: "Overtime", key: "overtime" },
                { label: "Holiday", key: "holidayPay" },
              ].map((item) => (
                <React.Fragment key={item.label}>
                  <div className="p-2 font-medium bg-gray-200 border-b border-r border-gray-500">
                    {item.label}
                  </div>
                  <div className="p-2 border-r border-b border-gray-500">
                    {payslipData[item.key as keyof PayslipData]}
                  </div>
                </React.Fragment>
              ))}
              <div className="p-2 font-semibold bg-gray-200 border-b border-r border-gray-500">
                Total:
              </div>
              <div className="p-2 border-b border-r border-gray-500">
                {payslipData.totalCompensations}
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-row">
          <div className="w-full ">
            <div className="bg-gray-800 text-white p-2 font-semibold border border-gray-500 text-center">
              Deductions
            </div>
            <div className="grid grid-cols-2">
              {[
                { label: "SSS", key: "sss" },
                { label: "Philhealth", key: "philhealth" },
                { label: "Pag-ibig", key: "pagibig" },
                { label: "Tax", key: "tax" },
                { label: "Absent", key: "absent" },
                { label: "Late", key: "late" },
                { label: "Undertime", key: "undertime" },
                { label: "Halfday", key: "halfday" },
              ].map((item) => (
                <React.Fragment key={item.label}>
                  <div className="p-2 font-medium bg-gray-200 border-b border-x border-gray-500">
                    {item.label}
                  </div>
                  <div className="p-2 border-b border-r border-gray-500">
                    {payslipData[item.key as keyof PayslipData]}
                  </div>
                </React.Fragment>
              ))}
              <div className="p-2 font-semibold bg-gray-200 border-b border-x border-gray-500">
                Total:
              </div>
              <div className="p-2 border-b border-r border-gray-500">
                {payslipData.totalDeductions}
              </div>
            </div>
          </div>

          <div className="w-full">
            <div className="bg-gray-800 text-white p-2 font-semibold border-y border-gray-500 text-center">
              Year-to-Date
            </div>
            <div className="grid grid-cols-2">
              {[
                { label: "Taxable Gross", key: "taxableGross" },
                { label: "Tax", key: "yearlyTax" },
                { label: "SSS", key: "yearlySSS" },
                { label: "PHIC", key: "phic" },
                { label: "HDMF", key: "hdmf" },
                { label: "Gross Income", key: "grossIncome" },
              ].map((item) => (
                <React.Fragment key={item.label}>
                  <div className="p-2 font-medium -y bg-gray-200 border-b border-gray-500">
                    {item.label}
                  </div>
                  <div className="p-2 border-b border-x border-gray-500">
                    {payslipData[item.key as keyof PayslipData]}
                  </div>
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex w-full bg-gray-800 text-white font-semibold">
            <div className="p-2 w-1/2 text-center border border-gray-500">
              Days
            </div>
            <div className="p-2 w-1/2 text-center border-y border-r border-gray-500">
              Net Pay
            </div>
          </div>
          <div className="flex w-full">
            <div className="flex flex-col w-1/2">
              <div className="flex">
                <div className="p-2 font-semibold bg-gray-200 w-1/2 border-x border-b border-gray-500">
                  Absent
                </div>
                <div className="p-2 font-semibold w-1/2 border-b border-r border-gray-500">
                  {payslipData.absentDays}
                </div>
              </div>
              <div className="flex">
                <div className="p-2 font-semibold bg-gray-200 w-1/2 border-x border-b border-gray-500">
                  Minutes of lates
                </div>
                <div className="p-2 font-semibold  w-1/2 border-b border-r border-gray-500">
                  {payslipData.lateMinutes}
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center w-1/2 bg-gray-100 font-semibold text-center border-b border-r border-gray-500">
              {payslipData.netPay}
            </div>
          </div>
        </div>
      </div>
      {!isLoading && isAdmin && (
        <div className="flex flex-col space-y-2 absolute -right-8 top-2">
          <div
            className="cursor-pointer hover:scale-110 transition-transform duration-200 w-fit h-fit"
            title="Edit"
          >
            <MdEdit
              className="text-gray-800 hover:text-blue-900"
              size={25}
              onClick={() => router.push(`/payslips/${params.id}/edit`)}
            />
          </div>
          <div
            className="cursor-pointer hover:scale-110 transition-transform duration-200 w-fit h-fit"
            title="Delete"
          >
            <DeleteButton
              itemId={payslipData.payslipId}
              itemType="payslip"
              apiEndpoint="/api/payslips"
              confirmMessage="Are you sure you want to delete this payslip? This action cannot be undone."
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PayslipDetail;
