import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/db';
import { eq, and } from 'drizzle-orm';
import { timeLogs } from '../../../db/schema/time-logs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { id } = req.query;
    console.log("New Call!");
    const { id } = req.query;

  if (req.method === 'GET') {
    const userTimeLogs = await db.select().from(timeLogs).where(
      and(eq(timeLogs.userid, Number(id))
      ));
    console.log("API");
    console.log(userTimeLogs);
    res.status(200).json(userTimeLogs);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}