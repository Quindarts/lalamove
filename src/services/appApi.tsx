import axiosConfig from "./axiosconfig";

export async function apiSearchMusicByQuery(data: any) {
    return await axiosConfig.get(`/search/?query=${data}`);
}
