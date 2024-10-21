import { int, sqliteTable, text } from "drizzle-orm/sqlite-core";
export const usersTable = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  age: int().notNull(),
  email: text().notNull().unique(),
});

export const timeLogs = sqliteTable("users_table", {
  id: int().primaryKey({ autoIncrement: true }),
  userId: int().notNull(),
  logType: text().notNull(),
  time: int().notNull(),
  email: text().notNull().unique(),
});