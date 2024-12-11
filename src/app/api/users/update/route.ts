"use server";
import { db } from "@/db/db";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        try {
            const { password } = await req.json();

            const cookiesStore = await cookies();

            const id = cookiesStore.get("userid")?.value;

            if (!id) {
                return NextResponse.json(
                    { error: "Internal Server Error" },
                    { status: 500 }
                );
            }

            if (password) {
                await db
                    .update(usersTable)
                    .set({
                        password: password,
                    })
                    .where(eq(usersTable.id, parseInt(id)));
            }

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
