import { NextRequest, NextResponse } from "next/server";
import { PayslipData } from "@/components/payslips/payslip";
import {
  nonEmptyString,
  nonNegativeNumber,
  noLateStartDate,
  noEarlyEndDate,
} from "@/components/payslips/validation";
import { db } from "@/db/db";

import { payslipsTable } from "@/db/schema/payslips";
import { desc, eq } from "drizzle-orm";

export const POST = async (req: NextRequest) => {
  if (req.method !== "POST") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    const payslipData: PayslipData = await req.json();

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
          {
            message: `${field}: ${error.message}`,
            type: error.type,
          },
          { status: 400 }
        );
      }
    }

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
          {
            message: `${field}: ${error.message}`,
            type: error.type,
          },
          { status: 400 }
        );
      }
    }

    const startDateError = noLateStartDate(
      payslipData.payBeginDate,
      payslipData.payEndDate
    );
    if (startDateError) {
      return NextResponse.json(
        {
          message: startDateError.message,
          type: startDateError.type,
        },
        { status: 400 }
      );
    }

    const endDateError = noEarlyEndDate(
      payslipData.payEndDate,
      payslipData.payBeginDate
    );
    if (endDateError) {
      return NextResponse.json(
        {
          message: endDateError.message,
          type: endDateError.type,
        },
        { status: 400 }
      );
    }

    await db.insert(payslipsTable).values({
      ...payslipData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return NextResponse.json(
      {
        message: "Payslip created successfully",
        data: payslipData,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing payslip:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const userid = searchParams.get("userid");

    const payslips = await db
      .select()
      .from(payslipsTable)
      .orderBy(desc(payslipsTable.createdAt))
      .where(userid ? eq(payslipsTable.employeeId, userid) : undefined);

    return NextResponse.json(payslips, { status: 200 });
  } catch (error) {
    console.error("Error fetching payslips:", error);
    return NextResponse.json(
      {
        message: "Error fetching payslips",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
