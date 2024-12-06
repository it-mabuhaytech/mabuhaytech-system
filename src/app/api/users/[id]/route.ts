import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { employeesTable } from "@/db/schema/employees";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    if (req.method === "GET") {
        try {
            const user = await db
                .select()
                .from(employeesTable)
                .where(eq(employeesTable.userid, Number(id)))
                .execute();

            if (user.length === 0) {
                return NextResponse.json(
                    { message: "User not found" },
                    { status: 404 }
                );
            }

            return NextResponse.json(user[0], { status: 200 });
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
