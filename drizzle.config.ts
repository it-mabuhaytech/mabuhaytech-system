import { defineConfig } from 'drizzle-kit';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

console.log(url);
if (!url) throw new Error("TURSO CONNECTION URL is not set");
if (!authToken) throw new Error("TURSO AUTH TOKEN is not set");

export default defineConfig({
  dialect: "turso",
  schema: "./src/db/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    url: url,
    authToken: authToken,
  }
});