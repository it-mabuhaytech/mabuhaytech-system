import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { employeesTable } from "@/db/schema/employees";
import { NextRequest, NextResponse } from "next/server";
import { usersTable } from "@/db/schema";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (req.method === "GET") {
        try {
            const user = await db
                .select()
                .from(usersTable)
                .leftJoin(
                    employeesTable,
                    eq(employeesTable.userid, usersTable.id)
                )
                .where(eq(usersTable.id, Number(id)))
                .execute();

            if (!user || user.length === 0 || !user[0].employees_table) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            const userObject = {
                id: user[0].employees_table.id,
                password: user[0].users_table.password,
                email: user[0].employees_table.email,
                created_at: user[0].employees_table.created_at,
                updated_at: user[0].employees_table.updated_at,
                userid: user[0].employees_table.userid,
                employeeid: user[0].employees_table.employeeid,
                employeeImage: user[0].employees_table.employeeImage,
                first_name: user[0].employees_table.first_name,
                last_name: user[0].employees_table.last_name,
                age: user[0].employees_table.age,
                role: user[0].employees_table.role,
                department: user[0].employees_table.department,
                hired_date: user[0].employees_table.hired_date,
                goverment_ids: user[0].employees_table.goverment_ids,
                status: user[0].employees_table.status,
            };

            return NextResponse.json(userObject, { status: 200 });
        } catch (error) {
            console.error(error);
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 }
            );
        }
    } else {
        return NextResponse.json(`Method ${req.method} Not Allowed`, {
            status: 405,
        });
    }
}
