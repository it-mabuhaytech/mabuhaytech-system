import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/db';
import { timeLogs } from '../../../db/schema/time-logs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userid, logType, logTime, logDate} = req.body;
    await db.insert(timeLogs).values(
        { userid:userid,
        logType: logType,
        logTime: logTime,
        logDate: logDate,
        logDateInt: dateToYYYYMMDD(new Date(logDate))
  });
    return res.status(200).json({ message: 'time log added in DB' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}

function dateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day

  return parseInt(`${year}${month}${day}`, 10); // Convert to integer
}