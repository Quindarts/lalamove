import {
    UserLoginFormDataType,
    UserRegisterFormDataType,
} from "./../types/userType";
import axiosConfig from "./axiosconfig";

export const login = async (data: UserLoginFormDataType) => {
    return await axiosConfig.post("/account/login", data);
};

export const register = async (data: UserRegisterFormDataType) => {
    return await axiosConfig.post("/account/register", data);
};
