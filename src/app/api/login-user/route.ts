import { db } from "@/db/db";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema/users";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        const { username_input, password } = await req.json();
        const user = await db
            .select()
            .from(usersTable)
            .where(eq(usersTable.username, username_input));

        if (user.length === 0 || password !== user[0].password) {
            return NextResponse.json(
                { message: "Invalid credentials" },
                { status: 401 }
            );
        }

        // Handle successful login (e.g., set session)
        const cookiesStore = await cookies();
        cookiesStore.set("authenticated", "true");
        cookiesStore.set("userid", user[0].id.toString());

        return NextResponse.json(
            {
                message: "Login successful",
                id: user[0].id,
            },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}
