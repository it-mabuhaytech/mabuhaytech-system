import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const usersTable = sqliteTable("users_table", {
    id: integer().primaryKey({ autoIncrement: true }),
    first_name: text().notNull(),
    last_name: text().notNull(),
    age: integer().notNull(),
    email: text().notNull().unique(),
    role: text().notNull(),
    department: text().notNull(),
    hired_date: integer({ mode: 'timestamp' }).notNull(),
    status: integer().notNull(),
    created_at: integer({ mode: 'timestamp' }).notNull(),
    updated_at: integer({ mode: 'timestamp' }).notNull(),
  });