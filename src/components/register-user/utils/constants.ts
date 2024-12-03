export const emailPatternRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

export const roleOptions = [
    { value: "Admin", label: "Admin" },
    { value: "IT-Head", label: "IT-Head" },
    { value: "It-Srdev", label: "IT-SrDev" },
    { value: "It-Jrdev", label: "IT-JrDev" },
    { value: "Head-Designer", label: "Head Designer" },
    { value: "Senior-Designer", label: "Senior Designer" },
    { value: "Junior-Designer", label: "Junior Designer" },
    { value: "Public-Relation", label: "Public Relation" },
    { value: "Human-Resource", label: "Human Resource" },
];

export const departmentOptions = [
    { value: "admininstration-team", label: "Admininstration Team" },
    { value: "engineering-team", label: "Engineering Team" },
    { value: "designer-team", label: "Designer Team" },
    { value: "human-resource-team", label: "Human Resource Team" },
];

export const userDataTypeArray = ["username", "email", "password"] as const;

export type userDataType = (typeof userDataTypeArray)[number];

export const employeeDataTypeArray = [
    "firstname",
    "lastname",
    "age",
    "role",
    "department",
    "hireddate",
] as const;

export type employeeDataType = (typeof employeeDataTypeArray)[number];
