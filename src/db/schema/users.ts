import { sql, relations, InferSelectModel } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { employeesTable } from "./employees";

export type Users = InferSelectModel<typeof usersTable>;

export const usersTable = sqliteTable("users_table", {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    username: text("username").notNull().unique(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
    created_at: text("created_at")
        .default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`)
        .notNull(),
    updated_at: text("updated_at")
        .default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`)
        .notNull(),
});

export const usersTableRelations = relations(usersTable, ({ one }) => ({
    employees: one(employeesTable),
}));
