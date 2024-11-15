// utils/userStore.ts
import { usersTable } from '../db/schema/users';
import { eq } from 'drizzle-orm';
import { db } from '../db/db'; // Your database connection

let currentUser: any = null;

export const setCurrentUser = (user: any) => {
  currentUser = user;
};

export const getCurrentUser = () => {
  return currentUser;
};

// Fetch user details from the database
export const fetchUserById = async (id: number) => {
  const user = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return user;
};