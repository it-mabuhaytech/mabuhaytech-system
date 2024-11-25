import { Dispatch, SetStateAction } from "react";
import { InputText } from "../ui/inputText";
import { RegisterData } from "./utils/types";
import { Button } from "../ui/button";

import React from "react";
import { emailPatternRegex, userDataType } from "./utils/constants";
import { checkUserNavAndNextDisabled } from "./utils/checker";

export default function UserForm({
    data,
    setData,
    setNav,
}: {
    data: RegisterData;
    setData: Dispatch<SetStateAction<RegisterData>>;
    setNav: Dispatch<SetStateAction<"user" | "employee">>;
}) {
    const handleUserDataChange = (value: string, inputType: userDataType) => {
        setData((prevData) => {
            return prevData
                ? {
                      ...prevData,
                      [inputType]: value,
                  }
                : { [inputType]: value };
        });
    };

    return (
        <div className="border p-2 rounded-md space-y-1">
            <p className="text-center flex items-start flex-col">
                <span className="text-slate-400 text-xs">Step 1</span>
                User Information
            </p>
            <div className="w-ful py-[1px] bg-muted"></div>
            <div className="flex flex-col gap-2">
                <InputText
                    labelText="Username"
                    containerClassName="flex flex-col gap-1"
                    className="p-1 border rounded-md"
                    id="username"
                    name="username"
                    value={data?.username ?? ""}
                    onChange={(e) =>
                        handleUserDataChange(e.target.value, "username")
                    }
                    required
                />
                <InputText
                    labelText="Email"
                    containerClassName="flex flex-col gap-1"
                    className="p-1 border rounded-md"
                    type="email"
                    id="email"
                    value={data?.email ?? ""}
                    onChange={(e) =>
                        handleUserDataChange(e.target.value, "email")
                    }
                    required
                />
                <InputText
                    labelText="Password"
                    containerClassName="flex flex-col gap-1"
                    className="p-1 border rounded-md"
                    id="password"
                    name="password"
                    value={data?.password ?? ""}
                    onChange={(e) =>
                        handleUserDataChange(e.target.value, "password")
                    }
                    required
                />
                <Button
                    type={
                        emailPatternRegex.test(data.email!)
                            ? "button"
                            : "submit"
                    }
                    className="w-fit ml-auto bg-blue-500 hover:bg-blue-600"
                    onClick={() => {
                        if (emailPatternRegex.test(data.email!))
                            setNav("employee");
                    }}
                    disabled={checkUserNavAndNextDisabled(data)}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
