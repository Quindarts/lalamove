import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { APP_API } from "../types/constants";

const axiosConfig = axios.create({
    baseURL: APP_API,
    timeout: 10000,
    headers: {
        "Context-Type": "application/json",
    },
});

axiosConfig.interceptors.request.use(
    function (request: any) {
        const access_token: string = localStorage.getItem("access_token") || "";
        if (request.headers) {
            request.headers["Authorization"] = `Bearer ${access_token}`;
        }
        return request;
    },
    function (error: AxiosError) {
        return error;
    },
);

axiosConfig.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error: AxiosError) {
        return error.response;
    },
);
export default axiosConfig;
