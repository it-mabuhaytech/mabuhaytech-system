import { db } from "@/db/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { timeLogs } from "@/db/schema/time-logs";
import { employeesTable, usersTable } from "@/db/schema";
import { dateToYYYYMMDD, transformQueryDateParam } from "@/utils/dates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;

    const startDate = query.get("startDate");
    const endDate = query.get("endDate");

    const sDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(startDate ?? undefined))
    );
    const eDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(endDate ?? undefined))
    );

    if (req.method === "GET") {
        const timeLogsData = await db
            .select({
                userid: timeLogs.userid,
                logType: timeLogs.logType,
                logDate: timeLogs.logDate,
                logTime: timeLogs.logTime,
            })
            .from(timeLogs)
            .leftJoin(usersTable, eq(timeLogs.userid, usersTable.id))
            .leftJoin(employeesTable, eq(usersTable.id, employeesTable.userid))
            .where(
                and(
                    gte(timeLogs.logDateInt, sDate),
                    lte(timeLogs.logDateInt, eDate)
                )
            );

        return NextResponse.json(timeLogsData, { status: 200 });
    } else {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
}
