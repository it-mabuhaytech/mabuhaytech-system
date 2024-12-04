import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
    if (req.method === "GET") {
        // Handle successful login (e.g., set session)
        const cookiesStore = await cookies();
        cookiesStore.delete("authenticated");

        return NextResponse.json(
            {
                message: "Logout successful",
            },
            { status: 200 }
        );
    }

    return NextResponse.json(
        { message: "Method not allowed" },
        { status: 405 }
    );
}
