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
import { Copy, Pencil, X } from "lucide-react";
import { GovermentIds } from "@/db/schema";
import { cn } from "@/lib/utils";

interface Employee {
    userid: number;
    employeeid: number;
    first_name: string;
    last_name: string;
    age: number;
    email: string;
    password: string;
    role: string;
    department: string;
    hired_date: string;
    employeeImage: string[];
    goverment_ids?: Partial<GovermentIds>;
}

function CopyText({ text }: { text: string | number }) {
    function copy(text: string) {
        navigator.clipboard.writeText(text);
    }
    return (
        <Copy
            className="text-slate-400 hover:text-black cursor-pointer"
            onClick={() => copy(text.toString())}
        />
    );
}

const ProfileText = ({
    label,
    value,
    withCopyText = false,
    name,
    withEdit = false,
    fetchUser,
}: {
    label: string;
    value: string | number | undefined | null;
    withCopyText?: boolean;
    name?: string;
    withEdit?: boolean;
    fetchUser?: () => void;
}) => {
    const [edit, setEdit] = useState<boolean>(false);

    const [data, setData] = useState<string | number | undefined | null>(value);

    const handleFormAction = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name) {
            const response = await fetch("/api/users/update", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ [name]: data }),
            });

            if (response.ok && fetchUser) {
                fetchUser();
            }

            console.log(response.status);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <p className="text-slate-400">{label}</p>
            <div className="flex gap-7 items-center">
                {edit ? (
                    <form
                        onSubmit={handleFormAction}
                        className="border-2 rounded-md p-1 flex"
                    >
                        <input
                            type="text"
                            value={data?.toString()}
                            onChange={(e) => setData(e.target.value)}
                            className="border-none focus:outline-0"
                        />
                        <X
                            onClick={() => setEdit(false)}
                            className="cursor-pointer"
                        />
                    </form>
                ) : (
                    <>
                        <p>{value}</p>
                        {withCopyText && <CopyText text={value ?? "-"} />}
                    </>
                )}

                {withEdit !== false && !edit && (
                    <Pencil
                        onClick={() => setEdit(true)}
                        className="cursor-pointer"
                    />
                )}
            </div>
        </div>
    );
};

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
                <ProfileText
                    label="Full Name"
                    value={`${employee?.first_name} ${employee?.last_name}`}
                />
                <ProfileText label="Age" value={employee?.age} />
                <ProfileText
                    label="Email"
                    value={employee?.email}
                    withCopyText={true}
                />
                <ProfileText
                    label="Password"
                    value={employee?.password}
                    withCopyText={true}
                    name="password"
                    withEdit={true}
                    fetchUser={() => fetchUser()}
                />
                <div className="flex flex-col gap-2">
                    <p className="text-slate-400">Password</p>
                    <div className="flex gap-7">
                        <p>{`${employee?.password}`}</p>
                    </div>
                </div>
                <Separator />
                <div className="flex justify-between">
                    <ProfileText
                        label="Employee ID"
                        value={employee?.employeeid}
                    />
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
                                            <ProfileText
                                                key={key}
                                                label={key}
                                                value={val}
                                                withCopyText={true}
                                            />
                                        ))}
                                </div>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
                <ProfileText label="Role" value={employee?.role} />
                <ProfileText label="Department" value={employee?.department} />
                <ProfileText label="Hired Date" value={employee?.hired_date} />
                {/* Back Button */}
                <div className="mt-6 mb-4">
                    <BackButton />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
