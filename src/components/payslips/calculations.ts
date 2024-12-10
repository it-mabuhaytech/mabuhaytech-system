import { PayslipData } from "./payslip";

export const calculateTotals = (payslipData: PayslipData) => {
  const totalCompensations =
    payslipData.basicSalary +
    payslipData.overtime +
    payslipData.allowance +
    payslipData.holidayPay;

  const totalDeductions =
    payslipData.sss +
    payslipData.philhealth +
    payslipData.pagibig +
    payslipData.tax +
    payslipData.absent +
    payslipData.late +
    payslipData.undertime +
    payslipData.halfday;

  const netPay = totalCompensations - totalDeductions;

  const yearlyTax = payslipData.tax * 24;
  const yearlySSS = payslipData.sss * 24;

  return {
    totalCompensations: Number(totalCompensations.toFixed(2)),
    totalDeductions: Number(totalDeductions.toFixed(2)),
    netPay: Number(netPay.toFixed(2)),
    yearlyTax: Number(yearlyTax.toFixed(2)),
    yearlySSS: Number(yearlySSS.toFixed(2)),
  };
};
