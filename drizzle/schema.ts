import { sqliteTable, AnySQLiteColumn, uniqueIndex, integer, text } from "drizzle-orm/sqlite-core"
  import { sql } from "drizzle-orm"

export const usersTable = sqliteTable("users_table", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	username: text().notNull(),
	email: text().notNull(),
	password: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => {
	return {
		usernameUnique: uniqueIndex("users_table_username_unique").on(table.username),
		emailUnique: uniqueIndex("users_table_email_unique").on(table.email),
	}
});

export const timeLogs = sqliteTable("time_logs", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	userid: integer().notNull(),
	logType: integer().notNull(),
	logTime: integer().notNull(),
	email: text().notNull(),
	createdAt: integer("created_at").notNull(),
	updatedAt: integer("updated_at").notNull(),
},
(table) => {
	return {
		emailUnique: uniqueIndex("time_logs_email_unique").on(table.email),
	}
});

