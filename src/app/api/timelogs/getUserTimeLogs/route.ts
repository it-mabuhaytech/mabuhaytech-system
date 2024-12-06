import { db } from "@/db/db";
import { eq, and, lte, gte } from "drizzle-orm";
import { timeLogs } from "@/db/schema/time-logs";
import { dateToYYYYMMDD, transformQueryDateParam } from "@/utils/dates";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    // const { id } = req.query;
    console.log("New Call!");

    const query = req.nextUrl.searchParams;

    const id = query.get("id");
    const startDate = query.get("startDate");
    const endDate = query.get("endDate");
    console.log(startDate);
    console.log(endDate);

    const sDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(startDate ?? undefined))
    );
    const eDate = dateToYYYYMMDD(
        new Date(transformQueryDateParam(endDate ?? undefined))
    );

    console.log(sDate);
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
        console.log("API");
        console.log(userTimeLogs);
        return NextResponse.json(userTimeLogs, { status: 200 });
    } else {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }
}
