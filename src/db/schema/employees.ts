import { sql, relations} from "drizzle-orm"
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core"
import { usersTable } from "./users";

export const employeesTable = sqliteTable("employees_table", {
    id: integer("id", {mode: "number"}).primaryKey({ autoIncrement: true }),
    userid: integer("userid").notNull().references (() => usersTable.id),
    employeeid: integer("employeeid").notNull(),
    first_name: text("first_name").notNull(),
    last_name: text("last_name").notNull(),
    age: integer("age").notNull(),
    email: text("email").notNull().unique(),
    role: text("role").notNull(),
    department: text("department").notNull(),
    hired_date: text("hired_date").default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`).notNull(),
    status: integer("status").notNull(),
    created_at: text("created_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`).notNull(),
    updated_at: text("updated_at").default(sql`(strftime('%Y-%m-%dT%H:%M:%S:%fZ', 'now'))`).notNull(),
  });

export const employeesTableRelations = relations(employeesTable, ({one}) => ({
  user: one(usersTable, {
    fields: [employeesTable.userid],
    references: [usersTable.id]
  })
}))