import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../../db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '../../../db/schema/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id);

  if (req.method === 'GET') {
    try {
      const user = await db
        .select()
        .from(usersTable)
        .where(eq(usersTable.id, Number(id)))
        .execute();

      if (user.length === 0) {
        return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
