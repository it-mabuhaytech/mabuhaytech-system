"use client";

import { cn } from "@/lib/utils";
import { useMemo, useRef, useState } from "react";
import { RegisterData } from "./utils/types";
import UserForm from "./user";
import { departmentOptions, roleOptions } from "./utils/constants";
import Employee from "./employee";
import { checkUserNavAndNextDisabled } from "./utils/checker";

const RegisterUser: React.FC = () => {
    const formRef = useRef<HTMLFormElement | null>(null);

    //register tab
    const [nav, setNav] = useState<"user" | "employee">("user");

    //Form data
    const [data, setData] = useState<RegisterData>({
        role: roleOptions[0].value,
        department: departmentOptions[0].value,
    });

    const navDisabled = useMemo(
        () => checkUserNavAndNextDisabled(data),
        [data]
    );

    const handleFormAction = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch("api/users/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (response.status === 200) {
            setData({
                role: roleOptions[0].value,
                department: departmentOptions[0].value,
            });
            setNav("user");
        }
    };

    return (
        <div className="flex flex-col gap-5 justify-center">
            <h1 className="text-3xl font-medium text-center">Register</h1>
            <p className="text-sm text-center">Add an Employee to the App</p>
            <nav className="flex items-center justify-center">
                <div
                    className={cn(
                        "border rounded-full py-2 px-4 flex items-center gap-3 cursor-pointer",
                        nav === "user" &&
                            "ring-2 ring-offset-2 ring-blue-500 cursor-default"
                    )}
                    onClick={() => setNav("user")}
                >
                    <div
                        className={cn(
                            "w-2 h-2 bg-slate-300 rounded-full",
                            nav === "user" && "bg-blue-500"
                        )}
                    ></div>
                    <p>User</p>
                </div>
                <div className="bg-muted w-20 h-[2px] -z-10"></div>
                <div
                    className={cn(
                        "border rounded-full py-2 px-4 flex items-center gap-3 cursor-pointer",
                        nav === "employee" &&
                            "ring-2 ring-offset-2 ring-blue-500 cursor-default",
                        navDisabled && "cursor-not-allowed"
                    )}
                    onClick={() => {
                        if (navDisabled) {
                            return;
                        }
                        setNav("employee");
                    }}
                >
                    <div
                        className={cn(
                            "w-2 h-2 bg-slate-300 rounded-full",
                            nav === "employee" && "bg-blue-500"
                        )}
                    ></div>
                    <p>Employee</p>
                </div>
            </nav>

            <form
                ref={formRef}
                onSubmit={handleFormAction}
                className="flex flex-col gap-2"
            >
                {nav === "user" && (
                    <UserForm data={data} setData={setData} setNav={setNav} />
                )}
                {nav === "employee" && (
                    <Employee data={data} setData={setData} />
                )}
            </form>
        </div>
    );
};

export default RegisterUser;
