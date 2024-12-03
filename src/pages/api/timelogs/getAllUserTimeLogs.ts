import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/db";
import { eq, and, gte, lte } from "drizzle-orm";
import { timeLogs } from "../../../db/schema/time-logs";
import { dateToYYYYMMDD, transformQueryDateParam } from "@/utils/dates";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id, startDate, endDate } = req.query;

    const sDate = dateToYYYYMMDD(new Date(transformQueryDateParam(startDate)));
    const eDate = dateToYYYYMMDD(new Date(transformQueryDateParam(endDate)));

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
        res.status(200).json(userTimeLogs);
    } else {
        return res.status(405).json({ message: "Method not allowed" });
    }
}
