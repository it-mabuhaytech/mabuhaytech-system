import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
import { env } from 'node:process';

import * as dotenv from 'dotenv';
dotenv.config();

const url = env.TURSO_DATABASE_URL;
const authToken = env.TURSO_AUTH_TOKEN;
if (!url) throw new Error("TURSO CONNECTION URL is not set");
if (!authToken) throw new Error("TURSO AUTH TOKEN is not set");

const client = createClient({ url, authToken});

export const db = drizzle(client);