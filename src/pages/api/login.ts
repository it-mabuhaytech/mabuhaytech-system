import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db/db';
import { eq } from 'drizzle-orm';
import { usersTable } from '../../db/schema/users';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username_input, password } = req.body;
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username_input));

    if (user.length === 0 || password !== user[0].password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Handle successful login (e.g., set session)
    return res.status(200).json({ message: 'Login successful' });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}