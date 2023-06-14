import axiosConfig from "./axiosconfig";

export interface NewMusicPlaylistAccountType {
    _id: String;
    _id_music: String;
    nameList: String;
}
export const fethAllPlaylistAccount = async () => {
    return await axiosConfig.get("/list-music/get-list?Params");
};

export const removePlaylistAccount = async (_id: String) => {
    return await axiosConfig.delete(`/list-music/delete-list-music?_id=${_id}`);
};

export const fetchAllPlaylistDetailAccount = async (_id: any) => {
    return await axiosConfig.get(`/list-music/get-by-id?_id=${_id}`);
};

export const createNewPlayListAccount = async (data: any) => {
    return await axiosConfig.post("/list-music/create", data);
};

export const addNewMusicToPlayListAccount = async (
    data: NewMusicPlaylistAccountType,
) => {
    return await axiosConfig.put("/list-music/add-list-music", data);
};
