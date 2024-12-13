import { PayslipData } from "@/components/payslips/payslip";
import {
  noEarlyEndDate,
  noLateStartDate,
  nonEmptyString,
  nonNegativeNumber,
} from "@/components/payslips/validation";
import { db } from "@/db/db";
import { payslipsTable } from "@/db/schema/payslips";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { pathname } = new URL(req.url);
    const payslipId = pathname.split("/").pop();
    const payslipData: PayslipData = await req.json();

    if (!payslipId) {
      return NextResponse.json(
        { message: "Missing payslipId parameter" },
        { status: 400 }
      );
    }

    // Validate string fields
    const stringFields = [
      "employeeId",
      "employeeName",
      "department",
      "position",
    ];
    for (const field of stringFields) {
      const error = nonEmptyString(
        payslipData[field as keyof PayslipData] as string
      );
      if (error) {
        return NextResponse.json(
          { message: `${field}: ${error.message}`, type: error.type },
          { status: 400 }
        );
      }
    }

    // Validate number fields
    const numberFields = [
      "basicSalary",
      "allowance",
      "overtime",
      "holidayPay",
      "sss",
      "philhealth",
      "pagibig",
      "tax",
      "absent",
      "late",
      "undertime",
      "halfday",
      "taxableGross",
      "yearlyTax",
      "yearlySSS",
      "phic",
      "hdmf",
      "grossIncome",
      "deductions",
      "totalCompensations",
      "totalDeductions",
      "netPay",
      "absentDays",
      "lateMinutes",
    ];

    for (const field of numberFields) {
      const error = nonNegativeNumber(
        payslipData[field as keyof PayslipData] as number
      );
      if (error) {
        return NextResponse.json(
          { message: `${field}: ${error.message}`, type: error.type },
          { status: 400 }
        );
      }
    }

    // Validate dates
    const startDateError = noLateStartDate(
      payslipData.payBeginDate,
      payslipData.payEndDate
    );
    if (startDateError) {
      return NextResponse.json(
        { message: startDateError.message, type: startDateError.type },
        { status: 400 }
      );
    }

    const endDateError = noEarlyEndDate(
      payslipData.payEndDate,
      payslipData.payBeginDate
    );
    if (endDateError) {
      return NextResponse.json(
        { message: endDateError.message, type: endDateError.type },
        { status: 400 }
      );
    }

    await db
      .update(payslipsTable)
      .set({
        ...payslipData,
        updatedAt: Date.now(),
      })
      .where(eq(payslipsTable.payslipId, payslipData.payslipId));

    return NextResponse.json(
      { message: "Payslip updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating payslip:", error);
    return NextResponse.json(
      {
        message: "Error updating payslip",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
