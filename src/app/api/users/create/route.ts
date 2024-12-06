import { db } from "@/db/db";
import { employeesTable } from "@/db/schema/employees";
import { usersTable } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const {
                username,
                email,
                password,
                firstname,
                lastname,
                age,
                role,
                department,
                hireddate,
            } = await req.json();

            // create a user data
            const user = await db
                .insert(usersTable)
                .values({
                    username: username,
                    email: email,
                    password: password,
                })
                .returning({ id: usersTable.id });

            if (!user) {
                return NextResponse.json(
                    { error: "Internal Server Error" },
                    { status: 500 }
                );
            }

            // create employees data
            await db.insert(employeesTable).values({
                userid: user[0].id,
                first_name: firstname,
                last_name: lastname,
                email: email,
                age: age,
                role: role,
                department: department,
                employeeid: Math.floor(Math.random() * (1000 - 1 + 1) + 1),
                status: 1,
                hired_date: new Date(hireddate).toISOString(),
            });

            return NextResponse.json("Success", { status: 200 });
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
