"use client";

import { useEffect, useRef, useState } from "react";
import { checkUserRoleAdmin } from "@/utils/checkAccess";
import { utils as XLSXUtils, writeFile as XLSXWriteFile } from "xlsx";

import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";

type Payslip = {
  employeeId: string;
  employeeName: string;
  payBeginDate: string;
  payEndDate: string;
  basicSalary: number;
  totalDeductions: number;
  netPay: number;
};

const tableConfig = [
  { header: "Employee ID", key: "employeeId" },
  { header: "Employee Name", key: "employeeName" },
  { header: "Pay Begin Date", key: "payBeginDate" },
  { header: "Pay End Date", key: "payEndDate" },
  { header: "Basic Salary", key: "basicSalary" },
  { header: "Deductions", key: "totalDeductions" },
  { header: "Net Pay", key: "netPay" },
] as const;

const formatCell = (key: keyof Payslip, value: any): string => {
  if (["basicSalary", "totalDeductions", "netPay"].includes(key)) {
    return `₱${value}`;
  }
  return `${value}`;
};

const ViewPayslips: React.FC = () => {
  const payslipsTable = useRef<HTMLTableElement | null>(null);
  const [payslips, setPayslips] = useState<Payslip[]>([]);
  const [filteredPayslips, setFilteredPayslips] = useState<Payslip[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [userRoleIsAdmin, setUserRoleIsAdmin] = useState<boolean>();

  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 10;

  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredPayslips.slice(
    indexOfFirstEntry,
    indexOfLastEntry
  );
  const totalPages = Math.ceil(filteredPayslips.length / entriesPerPage);

  useEffect(() => {
    const setRole = async () => {
      const checkIfAdmin = await checkUserRoleAdmin();
      setUserRoleIsAdmin(checkIfAdmin);
    };
    setRole();
  }, []);

  useEffect(() => {
    const fetchPayslips = async () => {
      try {
        const response = await fetch(`/api/payslips/add`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        setPayslips(data);
        setFilteredPayslips(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching payslips:", error);
      }
    };

    fetchPayslips();
  }, []);

  const handleFilter = () => {
    if (startDate && endDate) {
      const filtered = payslips.filter((payslip) => {
        return (
          payslip.payBeginDate >= startDate && payslip.payEndDate <= endDate
        );
      });
      setFilteredPayslips(filtered);
      setCurrentPage(1);
    } else if (!startDate && !endDate) {
      setFilteredPayslips(payslips);
      setCurrentPage(1);
    }
  };

  const handleGenerateReport = () => {
    const ws = XLSXUtils.table_to_sheet(payslipsTable.current);
    const wb = XLSXUtils.book_new();
    XLSXUtils.book_append_sheet(wb, ws, "Payslips");
    XLSXWriteFile(wb, `payslips_${startDate}_to_${endDate}.xlsx`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">Payslips Summary</h1>

      <div className="mb-4 flex space-x-4">
        <div>
          <label
            htmlFor="startDate"
            className="block text-sm font-medium text-gray-700"
          >
            Start Date
          </label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label
            htmlFor="endDate"
            className="block text-sm font-medium text-gray-700"
          >
            End Date
          </label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 px-4 py-2 border rounded-md"
          />
        </div>

        <button
          onClick={handleFilter}
          className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Filter
        </button>
        {userRoleIsAdmin && (
          <button
            disabled={filteredPayslips.length === 0}
            onClick={handleGenerateReport}
            className="mt-5 py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-500/50"
          >
            Generate Payslip Report
          </button>
        )}
      </div>

      <table
        ref={payslipsTable}
        className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md"
      >
        <thead>
          <tr>
            {tableConfig.map(({ header }) => (
              <th key={header} className="px-4 py-2 border-b text-center">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {currentEntries.map((payslip, index) => (
            <tr key={index} className="hover:bg-gray-100">
              {tableConfig.map(({ key }) => (
                <td key={key} className="px-4 py-2 border-b text-center">
                  {["basicSalary", "totalDeductions", "netPay"].includes(key)
                    ? `₱${payslip[key]}`
                    : payslip[key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex justify-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors duration-200"
        >
          <MdOutlineArrowBackIos />
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="px-3 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-50 transition-colors duration-200"
        >
          <MdOutlineArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default ViewPayslips;
