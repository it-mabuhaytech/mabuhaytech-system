let globalUserData: any[] = [];

export const setGlobalUserData = (data: any[]) => {
  globalUserData = data;
};

export const getGlobalUserData = () => {
  
  return globalUserData;
};