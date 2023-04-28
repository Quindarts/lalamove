import axiosConfig from "./axiosconfig";

export const login = async (data: any) => {
    return await axiosConfig.post("/account/login", data);
};
