import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    if (req.method === "POST") {
        const { urls } = await req.json();

        if (!urls || !Array.isArray(urls)) {
            return NextResponse.json(
                { error: "Invalid input. Provide an array of URLs." },
                { status: 400 }
            );
        }

        try {
            const results = await Promise.all(
                urls.map(async (url: string) => {
                    try {
                        const response = await axios.get(url);
                        return {
                            url,
                            healthy: response.status === 200,
                            status: response.status,
                        };
                    } catch (error) {
                        if (error instanceof Error)
                            return {
                                url,
                                healthy: false,
                                status: error.message ? error.message : "N/A",
                            };
                    }
                })
            );

            return NextResponse.json(results, { status: 200 });
        } catch (error) {
            if (error instanceof Error)
                return NextResponse.json(
                    {
                        error: "Failed to check URLs: " + error.message,
                    },
                    { status: 500 }
                );
        }
    } else {
        return NextResponse.json(`Method ${req.method} Not Allowed`, {
            status: 405,
        });
    }
}
