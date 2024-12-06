"use client";

import React, { useState } from "react";
import TopNav from "./top-nav";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { useRouter } from "next/navigation";
import { navDataMap } from "@/utils/map";
import { LINKS } from "@/constants";

export default function MainPage({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const loadComponent = (component: string) => {
        const link = navDataMap(component);
        console.log(component);
        if (link) {
            router.push(link);
            if (isOpen) {
                setIsOpen(false);
            }
        } else {
            router.push(LINKS.home);
        }
    };

    return (
        <div className="flex h-screen w-screen flex-col bg-background">
            <TopNav toggleSidebar={toggleSidebar} />
            <div className="flex-grow p-4 relative">
                <Sidebar
                    isOpen={isOpen}
                    toggleSidebar={toggleSidebar}
                    loadComponent={loadComponent}
                />
                <main className="flex h-full w-full flex-1 flex-col items-center overflow-hidden">
                    {children}
                </main>
            </div>
            <Footer />
        </div>
    );
}
