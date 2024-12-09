import { sql, relations } from "drizzle-orm";
import { integer, sqliteTable, text, unique } from "drizzle-orm/sqlite-core";
import { usersTable } from "./users";
export const leavesTable = sqliteTable(
  "leaves_table",
  {
    id: integer("id", { mode: "number" }).primaryKey({
      autoIncrement: true,
    }),
    userid: integer("userid")
      .notNull()
      .references(() => usersTable.id),
    leave_type: text("leave_type").notNull(),
    leave_date: text("leave_date")
      .default(sql`(strftime('%Y-%m-%dT:%fZ', 'now'))`)
      .notNull(),
    is_full_day: integer("is_full_day").notNull(),
    status: integer("status").notNull(),
    reason: text("reason").notNull(),
    created_at: text("created_at")
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`)
      .notNull(),
    updated_at: text("updated_at")
      .default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`)
      .notNull(),
    leave_date_int: integer("logDateInt")
      .default(sql`(strftime('%Y%m%d', 'now'))`)
      .notNull(),
  },
  (leavesTable) => {
    return {
      uniqueUserLeaveDate: unique().on(
        leavesTable.userid,
        leavesTable.leave_date
      ), // Composite unique constraint
    };
  }
);
