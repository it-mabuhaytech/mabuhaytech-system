import { sql } from "drizzle-orm"
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const timeLogs = sqliteTable("time_logs", {
    id: integer().primaryKey({ autoIncrement: true }),
    userid: integer().notNull(),
    logType: integer().notNull(),
    logTime: integer().notNull(),
    email: text().notNull().unique(),
  });