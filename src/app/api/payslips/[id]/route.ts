import { db } from "@/db/db";
import { payslipsTable } from "@/db/schema/payslips";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { pathname } = new URL(req.url);
    const payslipId = pathname.split("/").pop();

    if (!payslipId) {
      return NextResponse.json(
        { message: "Missing payslipId parameter" },
        { status: 400 }
      );
    }

    const payslip = await db
      .select()
      .from(payslipsTable)
      .where(eq(payslipsTable.payslipId, payslipId))
      .limit(1);

    if (payslip.length === 0) {
      return NextResponse.json(
        { message: "Payslip not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(payslip[0], { status: 200 });
  } catch (error) {
    console.error("Error fetching payslip:", error);
    return NextResponse.json(
      {
        message: "Error fetching payslip",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};

export const DELETE = async (req: NextRequest) => {
  try {
    const { pathname } = new URL(req.url);
    const payslipId = pathname.split("/").pop();

    if (!payslipId) {
      return NextResponse.json(
        { message: "Missing payslipId parameter" },
        { status: 400 }
      );
    }

    await db
      .delete(payslipsTable)
      .where(eq(payslipsTable.payslipId, payslipId));

    return NextResponse.json(
      { message: "Payslip deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting payslip:", error);
    return NextResponse.json(
      {
        message: "Error deleting payslip",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
};
