import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const timeLogs = sqliteTable("time_logs", {
    id: integer().primaryKey({ autoIncrement: true }),
    userid: integer().notNull(),
    logType: integer({ mode: 'timestamp' }).notNull(),
    logTime: integer({ mode: 'timestamp' }).notNull(),
    email: text().notNull().unique(),
    created_at: integer({ mode: 'timestamp' }).notNull(),
    updated_at: integer({ mode: 'timestamp' }).notNull(),
  });