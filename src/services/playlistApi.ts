import axiosConfig from "./axiosconfig";

export const fethAllPlaylistAccount = async () => {
    return await axiosConfig.get("/list-music/get-list?Params");
};
export const removePlaylistAccount = async (_id: String) => {
    return await axiosConfig.delete(`/list-music/delete-list-music?_id=${_id}`);
};
export const fetchAllPlaylistDetailAccount = async (_id: string) => {
    return await axiosConfig.get(`/list-music/get-by-id?_id=${_id}`);
};
export const createNewPlayListAccount = async (data: any) => {
    return await axiosConfig.post("/list-music/create", data);
};

export const addNewMusicToPlayListAccount = async (data: any) => {
    return await axiosConfig.put("/list-music/add-list-music", data);
};
