import "server only"

import { db } from "../db"
import { usersTable } from "../schema"

export async function addUser() {
    // TODO: Create try catch to handle errors
    db.insert(usersTable).values({ 
        username: "test",
        email: "test",
        password: "test",
        created_at: "test",
        updated_at: "test"
    });
}