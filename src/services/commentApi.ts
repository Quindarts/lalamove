import axiosConfig from "./axiosconfig";

export async function fetchAllCommentByMusicID(
    _id: string,
    _limit?: number,
    _page?: number,
) {
    return axiosConfig.get(
        `/comment/get-by-id-music?_id=${_id}&_limit=${_limit}&_page=${_page}`,
    );
}
export async function createCommentAccount(content: string, id_music: string) {
    return axiosConfig.post("/comment/create", {
        content: content,
        id_music: id_music,
    });
}
