import { sql } from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users";

export const timeLogs = sqliteTable("time_logs", {
    id: integer("id", {mode: "number"}).primaryKey({ autoIncrement: true }),
    userid: integer("userid").notNull().references(()=> usersTable.id),
    logType: integer("logType").notNull(),
    logTime: text("logTime").default(sql`(strftime('%H:%M:%S:%fZ', 'now'))`).notNull(),
    logDate: text("logDate").default(sql`(strftime('%Y-%m-%dT:%fZ', 'now'))`).notNull(),
    logDateInt: integer("logDateInt").default(sql`(strftime('%Y%m%d', 'now'))`).notNull(),
    created_at: text("created_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`).notNull(),
    updated_at: text("updated_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`).notNull(),
  });