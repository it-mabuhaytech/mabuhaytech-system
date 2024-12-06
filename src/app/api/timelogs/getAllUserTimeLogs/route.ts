import { db } from "@/db/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { timeLogs } from "@/db/schema/time-logs";
import { dateToYYYYMMDD, transformQueryDateParam } from "@/utils/dates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const query = req.nextUrl.searchParams;

    const { id, startDate, endDate } = {
        id: query.get("id"),
        startDate: query.get("startDate"),
        endDate: query.get("endDate"),
    };

    const sDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(startDate ?? undefined))
    );
    const eDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(endDate ?? undefined))
    );

    if (req.method === "GET") {
        const userTimeLogs = await db
            .select()
            .from(timeLogs)
            .where(
                and(
                    eq(timeLogs.userid, Number(id)),
                    gte(timeLogs.logDateInt, sDate),
                    lte(timeLogs.logDateInt, eDate)
                )
            );
        return NextResponse.json(userTimeLogs, { status: 200 });
    } else {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
}
