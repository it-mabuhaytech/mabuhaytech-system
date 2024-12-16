import { customAlphabet } from "nanoid";

export interface PayslipField {
  name: string;
  label: string;
  type: "text" | "number" | "date";
  auto: boolean;
}

export interface PayslipFormField extends PayslipField {
  value: string | number;
  onChange: (value: string | number) => void;
}

export const employeeFields: PayslipField[] = [
  { name: "employeeName", label: "Employee Name", type: "text", auto: false },
  { name: "employeeId", label: "Employee ID", type: "text", auto: false },
  { name: "department", label: "Department", type: "text", auto: false },
  { name: "position", label: "Position", type: "text", auto: false },
  { name: "payBeginDate", label: "Pay Begin Date", type: "date", auto: false },
  { name: "payEndDate", label: "Pay End Date", type: "date", auto: false },
];

export const compensationFields: PayslipField[] = [
  { name: "basicSalary", label: "Basic Salary", type: "number", auto: false },
  { name: "allowance", label: "Allowance", type: "number", auto: false },
  { name: "overtime", label: "Overtime", type: "number", auto: false },
  { name: "holidayPay", label: "Holiday Pay", type: "number", auto: false },
  {
    name: "totalCompensations",
    label: "Total Compensations",
    type: "number",
    auto: true,
  },
  {
    name: "totalDeductions",
    label: "Total Deductions",
    type: "number",
    auto: true,
  },
];

export const deductionFields: PayslipField[] = [
  { name: "sss", label: "SSS", type: "number", auto: false },
  { name: "absent", label: "Absent", type: "number", auto: false },
  { name: "philhealth", label: "Philhealth", type: "number", auto: false },
  { name: "late", label: "Late", type: "number", auto: false },
  { name: "pagibig", label: "Pag-ibig", type: "number", auto: false },
  { name: "undertime", label: "Undertime", type: "number", auto: false },
  { name: "tax", label: "Tax", type: "number", auto: false },
  { name: "halfday", label: "Halfday", type: "number", auto: false },
];

export const yearToDateFields: PayslipField[] = [
  { name: "taxableGross", label: "Taxable Gross", type: "number", auto: false },
  { name: "phic", label: "PHIC", type: "number", auto: false },
  { name: "yearlyTax", label: "Tax", type: "number", auto: true },
  { name: "hdmf", label: "HDMF", type: "number", auto: false },
  { name: "yearlySSS", label: "SSS", type: "number", auto: true },
  { name: "grossIncome", label: "Gross Income", type: "number", auto: false },
  { name: "absentDays", label: "Days absent", type: "number", auto: false },
  { name: "lateMinutes", label: "Late minutes", type: "number", auto: false },
];

export const calculatedFields: PayslipField[] = [
  { name: "netPay", label: "Net Pay", type: "number", auto: true },
];

export const netPayField: PayslipField = {
  name: "netPay",
  label: "Net Pay",
  type: "number",
  auto: true,
};
export interface PayslipData {
  payslipId: string;

  employeeId: string;
  employeeName: string;
  department: string;
  position: string;

  payBeginDate: string;
  payEndDate: string;

  basicSalary: number;
  allowance: number;
  overtime: number;
  holidayPay: number;

  sss: number;
  philhealth: number;
  pagibig: number;
  tax: number;

  absent: number;
  late: number;
  undertime: number;
  halfday: number;

  taxableGross: number;
  yearlyTax: number;
  yearlySSS: number;
  phic: number;
  hdmf: number;
  grossIncome: number;

  deductions: number;
  totalCompensations: number;
  totalDeductions: number;
  netPay: number;

  absentDays: number;
  lateMinutes: number;
}

export const generatePayslipId = (): string => {
  const set = "abcdefghijklmnopqrstuvwxyz0123456789";
  const segment = customAlphabet(set, 8);

  return `${segment()}-${segment()}-${segment()}-${segment()}`;
};

export const determinePayDates = (
  currentDate: Date = new Date()
): { payBeginDate: string; payEndDate: string } => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

  let payBeginDate = "";
  let payEndDate = "";

  if (day <= 15) {
    payBeginDate = `${year}-${String(month).padStart(2, "0")}-01`;
    payEndDate = `${year}-${String(month).padStart(2, "0")}-15`;
  } else {
    payBeginDate = `${year}-${String(month).padStart(2, "0")}-16`;

    const nextMonth = new Date(year, month, 0);
    payEndDate = `${year}-${String(month).padStart(
      2,
      "0"
    )}-${nextMonth.getDate()}`;
  }

  return { payBeginDate, payEndDate };
};

export const initialPayslipData: PayslipData = {
  payslipId: generatePayslipId(),

  employeeId: "",
  employeeName: "",
  department: "",
  position: "",

  basicSalary: 0,
  allowance: 0,
  overtime: 0,
  holidayPay: 0,

  sss: 0,
  philhealth: 0,
  pagibig: 0,
  tax: 0,

  absent: 0,
  late: 0,
  undertime: 0,
  halfday: 0,

  taxableGross: 0,
  yearlyTax: 0,
  yearlySSS: 0,
  phic: 0,
  hdmf: 0,
  grossIncome: 0,

  deductions: 0,
  totalCompensations: 0,
  totalDeductions: 0,
  netPay: 0,

  ...determinePayDates(),

  absentDays: 0,
  lateMinutes: 0,
};
