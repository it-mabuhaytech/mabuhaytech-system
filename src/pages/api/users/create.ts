import type { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../db/db";
import { employeesTable } from "../../../db/schema/employees";
import { usersTable } from "@/db/schema";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
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
            } = req.body;

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
                return res.status(500).json({ error: "Internal Server Error" });
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

            res.status(200).json("Success");
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else {
        res.setHeader("Allow", ["POST"]);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
