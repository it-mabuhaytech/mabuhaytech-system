import MainPage from "@/components/main-page";
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
        redirect("/login");
    }

    return (
        <div>
            <MainPage>{children}</MainPage>
        </div>
    );
}
