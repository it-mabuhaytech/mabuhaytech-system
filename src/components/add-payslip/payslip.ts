export interface PayslipField {
  name: string;
  label: string;
  type: "text" | "number" | "date";
}

export interface PayslipFormField extends PayslipField {
  value: string | number;
  onChange: (value: string | number) => void;
}

export const employeeFields: PayslipField[] = [
  { name: "employeeName", label: "Employee Name", type: "text" },
  { name: "employeeId", label: "Employee ID", type: "text" },
  { name: "department", label: "Department", type: "text" },
  { name: "position", label: "Position", type: "text" },
];

export const payDateFields: PayslipField[] = [
  { name: "payBeginDate", label: "Pay Begin Date", type: "date" },
  { name: "payEndDate", label: "Pay End Date", type: "date" },
];

export const compensationFields: PayslipField[] = [
  { name: "basicSalary", label: "Basic Salary", type: "number" },
  { name: "allowance", label: "Allowance", type: "number" },
  { name: "overtime", label: "Overtime", type: "number" },
  { name: "holidayPay", label: "Holiday Pay", type: "number" },
  // { name: "totalCompensations", label: "Total Compensations", type: "number" },
];

export const deductionFields: PayslipField[] = [
  { name: "sss", label: "SSS", type: "number" },
  { name: "absent", label: "Absent", type: "number" },
  { name: "philhealth", label: "Philhealth", type: "number" },
  { name: "late", label: "Late", type: "number" },
  { name: "pagibig", label: "Pag-ibig", type: "number" },
  { name: "undertime", label: "Undertime", type: "number" },
  { name: "tax", label: "Tax", type: "number" },
  { name: "halfday", label: "Halfday", type: "number" },
  // { name: "totalDeductions", label: "Total Deductions", type: "number" },
];

export const yearToDateFields: PayslipField[] = [
  { name: "taxableGross", label: "Taxable Gross", type: "number" },
  { name: "phic", label: "PHIC", type: "number" },
  { name: "yearlyTax", label: "Tax", type: "number" },
  { name: "hdmf", label: "HDMF", type: "number" },
  { name: "yearlySSS", label: "SSS", type: "number" },
  { name: "grossIncome", label: "Gross Income", type: "number" },
];

export const summaryFields: PayslipField[] = [
  { name: "absentDays", label: "Days absent", type: "number" },
  { name: "lateMinutes", label: "Late minutes", type: "number" },
  // { name: "netPay", label: "Net Pay", type: "number" },
];

export interface PayslipData {
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

export const initialPayslipData: PayslipData = {
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

  payBeginDate: "",
  payEndDate: "",
  absentDays: 0,
  lateMinutes: 0,
};
