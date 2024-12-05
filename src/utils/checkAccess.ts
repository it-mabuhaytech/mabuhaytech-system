import { fetchUserRoleById } from "./userStore";

//Function to check login user if admin
export async function checkUserRoleAdmin() {
  const loginUserId = localStorage.getItem("userid");

  if (!loginUserId) return false;

  const userRole = await fetchUserRoleById(parseInt(loginUserId));

  if (userRole === "Admin") return true;

  return false;
}
