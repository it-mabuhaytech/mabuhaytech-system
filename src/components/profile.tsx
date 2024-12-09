"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import BackButton from "../components/ui/backButton";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import UploadButtonPopover from "./upload-button";
import { Separator } from "./ui/separator";
import { Copy } from "lucide-react";
import { GovermentIds } from "@/db/schema";
import { cn } from "@/lib/utils";

function CopyText({ text }: { text: string }) {
    function copy(text: string) {
        navigator.clipboard.writeText(text);
    }
    return (
        <Copy
            className="text-slate-400 hover:text-black cursor-pointer"
            onClick={() => copy(text)}
        />
    );
}

interface Employee {
    userid: number;
    employeeid: number;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    role: string;
    department: string;
    hired_date: string;
    employeeImage: string[];
    goverment_ids?: Partial<GovermentIds>;
}

const ProfilePage = () => {
    const router = useRouter();
    const [employee, setEmployee] = useState<Employee | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    function fetchUser() {
        const userid = localStorage.getItem("userid");
        const fetchUserProfile = async () => {
            try {
                // Replace with your API endpoint
                const response = await fetch("/api/users/" + userid, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data: Employee = await response.json();
                setEmployee(data);
            } catch (error) {
                console.error(error);
                setError("Error");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }

    useEffect(() => {
        fetchUser();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (loading) {
        return <div className="text-center p-6">Loading...</div>;
    }

    if (error) {
        return (
            <div className="text-center p-6 text-red-600">Error: {error}</div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-lg p-8 space-y-3">
                <div className="flex flex-col gap-3">
                    <p className="font-medium text-slate-500">
                        Profile Picture
                    </p>

                    <div className="flex gap-5">
                        {employee?.employeeImage ? (
                            <img
                                src={employee.employeeImage[0]}
                                alt=""
                                className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover object-top"
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-slate-200">
                                <p className="text-3xl">
                                    {`${employee?.first_name.trim()[0]} ${
                                        employee?.last_name.trim()[0]
                                    }`}
                                </p>
                            </div>
                        )}
                        <div className="flex justify-center items-center gap-5">
                            <UploadButtonPopover
                                fetchData={() => fetchUser()}
                            />
                        </div>
                    </div>
                </div>
                <Separator />
                <div className="flex flex-col gap-1">
                    <p className="text-slate-400">Full Name</p>
                    <p>{`${employee?.first_name} ${employee?.last_name}`}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Age</p>
                    <p>{`${employee?.age}`}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Email</p>
                    <div className="flex gap-7">
                        <p>{`${employee?.email}`}</p>
                        <CopyText text={employee?.email ?? "-"} />
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <div className="flex flex-col gap-2">
                        <p className="text-slate-400">Employee ID</p>
                        <p>{`${employee?.employeeid}`}</p>
                    </div>
                    <Dialog>
                        <DialogTrigger
                            className={cn(
                                "bg-yellow-500 p-2 text-white rounded-md h-fit",
                                !employee?.goverment_ids && "bg-yellow-500/50"
                            )}
                            disabled={!employee?.goverment_ids}
                        >
                            {`Goverment ID's`}
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{`Goverment ID's`}</DialogTitle>
                                <DialogDescription>
                                    List of
                                    {`goverment ID's`}
                                </DialogDescription>
                                <div className="grid grid-cols-2 gap-3">
                                    {employee?.goverment_ids &&
                                        Object.entries(
                                            employee?.goverment_ids
                                        ).map(([key, val]) => (
                                            <div
                                                className="flex flex-col gap-2"
                                                key={key}
                                            >
                                                <p className="text-slate-400">
                                                    {key}
                                                </p>
                                                <p className="flex gap-4">
                                                    {val}
                                                    <span>
                                                        <CopyText text={val} />
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Role</p>
                    <p>{`${employee?.role}`}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Department</p>
                    <p>{`${employee?.department}`}</p>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Hired Date</p>
                    <p>{`${employee?.hired_date}`}</p>
                </div>

                {/* Back Button */}
                <div className="mt-6 mb-4">
                    <BackButton />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
