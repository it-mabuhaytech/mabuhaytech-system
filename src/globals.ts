let globalUserData: string[] = [];

export const setGlobalUserData = (data: string[]) => {
    globalUserData = data;
};

export const getGlobalUserData = () => {
    return globalUserData;
};
