import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { timeLogs } from "../../../db/schema/time-logs";
import { employeesTable, usersTable } from "@/db/schema";
import { dateToYYYYMMDD, transformQueryDateParam } from "@/utils/dates";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;

    const sDate = dateToYYYYMMDD(new Date(transformQueryDateParam(startDate)));
    const eDate = dateToYYYYMMDD(new Date(transformQueryDateParam(endDate)));

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

        res.status(200).json(timeLogsData);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
