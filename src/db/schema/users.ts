import { sql } from "drizzle-orm"
import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users_table", {
    id: integer().primaryKey({ autoIncrement: true }),
    name: text().notNull(),
    age: integer().notNull(),
    email: text().notNull().unique(),
  });