import { db } from "@/db/db";
import { timeLogs } from "@/db/schema/time-logs";
import { dateToYYYYMMDD } from "@/utils/dates";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        const { userid, logType, logTime, logDate } = await req.json();
        await db.insert(timeLogs).values({
            userid: userid,
            logType: logType,
            logTime: logTime,
            logDate: logDate,
            logDateInt: dateToYYYYMMDD(new Date(logDate)),
        });
        return NextResponse.json(
            { message: "time log added in DB" },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}
