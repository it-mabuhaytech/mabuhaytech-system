import { emailPatternRegex } from "./constants";
import { RegisterData } from "./types";

export function checkUserNavAndNextDisabled(data: RegisterData) {
    if (
        !data.username ||
        !data.email ||
        !data.password ||
        !emailPatternRegex.test(data.email!)
    ) {
        return true;
    }
    return false;
}
