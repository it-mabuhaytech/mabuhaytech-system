import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
// import { env } from 'node:process';

import * as dotenv from 'dotenv';
dotenv.config();

const url = process.env.NEXT_PUBLIC_TURSO_DATABASE_URL;
const authToken = process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN;
console.log(url);
if (!url) throw new Error("TURSO CONNECTION URL is not set");
if (!authToken) throw new Error("TURSO AUTH TOKEN is not set");

const client = createClient({ url, authToken});

export const db = drizzle(client);