"use server";
import { db } from "@/db/db";
import { employeesTable } from "@/db/schema/employees";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const { profilePictureUrl } = await req.json();

            const cookiesStore = await cookies();

            const id = cookiesStore.get("userid")?.value;

            if (!id) {
                return NextResponse.json(
                    { error: "Internal Server Error" },
                    { status: 500 }
                );
            }

            await db
                .update(employeesTable)
                .set({
                    employeeImage: profilePictureUrl,
                })
                .where(eq(employeesTable.userid, parseInt(id)));

            revalidatePath("/");
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
