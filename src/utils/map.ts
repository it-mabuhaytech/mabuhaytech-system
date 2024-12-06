import { LINKS } from "@/constants";

export const navDataMap = (navName: string) => {
    const data: { [key: string]: string } = {
        home: LINKS.home,
        healthcheck: LINKS.healthcheck,
        timelogshistory: LINKS.timelogshistory,
        registeruser: LINKS.registeruser,
    };

    return data[navName] || undefined;
};
