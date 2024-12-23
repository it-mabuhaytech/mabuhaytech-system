import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/db';
import { eq, and, lte, gte } from 'drizzle-orm';
import { timeLogs } from '../../../db/schema/time-logs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // const { id } = req.query;
    console.log("New Call!");
    const id = req.query?.id;
    const startDate = req.query?.startDate;
    const endDate = req.query?.endDate;
    console.log(startDate);
    console.log(endDate);

    
    const sDate = dateToYYYYMMDD(new Date(transformQueryDateParam(startDate)));  
    const eDate = dateToYYYYMMDD(new Date(transformQueryDateParam(endDate)));

    console.log(sDate);
  if (req.method === 'GET') {
    const userTimeLogs = await db.select().from(timeLogs).where(
      and(eq(timeLogs.userid, Number(id)),
        gte(timeLogs.logDateInt, sDate),
        lte(timeLogs.logDateInt, eDate)
      ));
    console.log("API");
    console.log(userTimeLogs);
    res.status(200).json(userTimeLogs);
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}

function dateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day

  return parseInt(`${year}${month}${day}`, 10); // Convert to integer
}

// Function to transform `string | string[] | undefined` to `string | number | Date`
const transformQueryDateParam = (param: string | string[] | undefined): string | number | Date => {
  // If the param is undefined, return undefined (you can also return a default value here)
  if (param === undefined) {
    return Date.now();
  }

  // If the param is an array, use the first element (or join them if you prefer)
  if (Array.isArray(param)) {
    // You could join the array into a single string if needed
    return param[0]; // Use the first element as a string
  }

  // If it's a string, try to parse it to a number or Date if possible

  // Try to parse it as a number
  const parsedNumber = Number(param);
  if (!isNaN(parsedNumber)) {
    return parsedNumber; // Return as a number if it's a valid number
  }

  // Try to parse it as a Date
  const parsedDate = new Date(param);
  if (!isNaN(parsedDate.getTime())) {
    return parsedDate; // Return as a Date if it's a valid date
  }

  // Otherwise, return it as a string
  return param; // Return the string as-is if no parsing is needed
};