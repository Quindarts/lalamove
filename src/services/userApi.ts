import axiosConfig from "./axiosconfig";

export const login = async (data: any) => {
    return await axiosConfig.post("/account/login", data);
};

export const register = async (data: any) => {
    return await axiosConfig.post("/account/register", data);
};