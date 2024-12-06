import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/db';
import { leavesTable } from '../../../db/schema/leaves';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { userid, leaveType, currentDate, isFullDay, status, reason} = req.body;
        console.log(req.body);
        if (req.method === 'POST') {
            await db.insert(leavesTable).values({
                userid: userid,
                leave_type: leaveType,
                leave_date: currentDate,
                is_full_day: isFullDay,
                status: status,
                reason: reason,
                leave_date_int: dateToYYYYMMDD(new Date(currentDate))
              });
        }
        const data = {
            message: "Leave request successfully added",
            success: true
        }
        res.status(200).json(data);
    } catch (error) {
      console.error("Error submitting leave request:", error);
      const data = {
        message: error,
        success: false
      }
      res.status(500).json(data);
    }
}

function dateToYYYYMMDD(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Ensure two-digit month
  const day = String(date.getDate()).padStart(2, '0'); // Ensure two-digit day

  return parseInt(`${year}${month}${day}`, 10); // Convert to integer
}