import axios, { AxiosError } from "axios";
const APP_API = "https://api-kaito-music.vercel.app/api";
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
    function (error) {
        return error.response;
    },
);
export default axiosConfig;
