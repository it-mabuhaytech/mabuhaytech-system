"use server";
import { cookies } from "next/headers";
import { fetchUserRoleById } from "./userStore";

//Function to check login user if admin
export async function checkUserRoleAdmin() {
  const loginUserId = (await cookies()).get("userid");

  if (!loginUserId) return false;

  const userRole = await fetchUserRoleById(parseInt(loginUserId.value));

  if (userRole === "Admin") return true;

  return false;
}
