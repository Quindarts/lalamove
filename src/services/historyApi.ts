import axiosConfig from "./axiosconfig";

export async function createHistoryApi(data: string) {
    return axiosConfig.post("/play-history/create", {"idMusic":`${data}`});
}
export async function getAllHistoryApi() {
    return axiosConfig.get("/play-history/get-by-token?Params");
}