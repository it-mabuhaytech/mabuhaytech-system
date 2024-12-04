import { LINKS } from "@/constants";
import { checkUserRoleAdmin } from "@/utils/checkAccess";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    const cookiesStore = await cookies();
    const isAuthenticated = cookiesStore.get("authenticated");
    if (!isAuthenticated) {
        redirect(LINKS.login);
    }

    const checkIfAdmin = await checkUserRoleAdmin();

    if (!checkIfAdmin) {
        redirect(LINKS.home);
    }

    return <div>{children}</div>;
}
