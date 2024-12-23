import React, { Dispatch, SetStateAction } from "react";
import { Button } from "../ui/button";
import { InputText } from "../ui/inputText";
import { Select } from "../ui/custom-select";
import { RegisterData } from "./utils/types";
import {
    departmentOptions,
    employeeDataType,
    roleOptions,
} from "./utils/constants";

export default function Employee({
    data,
    setData,
}: {
    data: RegisterData;
    setData: Dispatch<SetStateAction<RegisterData>>;
}) {
    const handleEmployeeDataChange = (
        value: string | number | Date,
        inputType: employeeDataType
    ) => {
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
                <span className="text-slate-400 text-xs">Step 2</span>
                Employee Info
            </p>
            <div className="w-ful py-[1px] bg-muted"></div>
            <div className="flex flex-col gap-2">
                <div className="flex gap-3">
                    <InputText
                        labelText="First Name"
                        containerClassName="flex flex-col gap-1"
                        className="p-1 border rounded-md"
                        id="firstName"
                        value={data?.firstname ?? ""}
                        onChange={(e) =>
                            handleEmployeeDataChange(
                                e.target.value,
                                "firstname"
                            )
                        }
                        required
                    />
                    <InputText
                        labelText="Last Name"
                        containerClassName="flex flex-col gap-1"
                        className="p-1 border rounded-md"
                        id="lastname"
                        value={data?.lastname ?? ""}
                        onChange={(e) =>
                            handleEmployeeDataChange(e.target.value, "lastname")
                        }
                        required
                    />
                </div>
                <InputText
                    type="number"
                    min={1}
                    max={100}
                    labelText="Age"
                    containerClassName="flex flex-col gap-1"
                    className="p-1 border rounded-md"
                    id="age"
                    value={data?.age ?? ""}
                    onChange={(e) =>
                        handleEmployeeDataChange(e.target.value, "age")
                    }
                    required
                />
                <Select
                    containerClassName="flex flex-col gap-1"
                    className="border p-2 rounded-md"
                    labelText="Role"
                    id="role"
                    name="role"
                    data={roleOptions}
                    value={data.role}
                    onChange={(e) =>
                        handleEmployeeDataChange(e.target.value, "role")
                    }
                    required
                />
                <Select
                    containerClassName="flex flex-col gap-1"
                    className="border p-2 rounded-md"
                    labelText="Department"
                    id="department"
                    name="department"
                    data={departmentOptions}
                    value={data.department}
                    onChange={(e) =>
                        handleEmployeeDataChange(e.target.value, "department")
                    }
                    required
                />
                <InputText
                    type="date"
                    labelText="Hired Date"
                    containerClassName="flex flex-col gap-1"
                    className="p-1 border rounded-md"
                    id="age"
                    value={data?.hireddate?.toLocaleDateString("en-CA") ?? ""}
                    onChange={(e) =>
                        handleEmployeeDataChange(
                            new Date(e.target.value),
                            "hireddate"
                        )
                    }
                    required
                />
                <Button
                    type="submit"
                    className="w-fit ml-auto bg-blue-500 hover:bg-blue-600"
                >
                    Submit
                </Button>
            </div>
        </div>
    );
}
