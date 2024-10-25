import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users_table", {
    id: integer().primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    email: text().notNull().unique(),
    password: text().notNull(),
    created_at: integer({ mode: 'timestamp' }).notNull(),
    updated_at: integer({ mode: 'timestamp' }).notNull(),
  });