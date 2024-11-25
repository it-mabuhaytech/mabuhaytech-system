export const emailPatternRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/;

export const roleOptions = [
    { value: "admin", label: "Admin" },
    { value: "it-head", label: "IT-Head" },
    { value: "it-srdev", label: "IT-SrDev" },
    { value: "it-jrdev", label: "IT-JrDev" },
    { value: "head-designer", label: "Head Designer" },
    { value: "senior-designer", label: "Senior Designer" },
    { value: "junior-designer", label: "Junior Designer" },
    { value: "public-relation", label: "Public Relation" },
    { value: "human-resource", label: "Human Resource" },
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
