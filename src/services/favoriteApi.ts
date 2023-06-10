import axiosConfig from "./axiosconfig";
type MusicInFavoriteType = {
    idMusic: String;
};
export const getAllFavoriteMusicbyParams = async (
    limit: number,
    page: number,
) => {
    return await axiosConfig.get(
        `/music/favorite?_limit=${limit}&_page=${page}`,
    );
};
export const createMuisicToFavoriteList = async (data: MusicInFavoriteType) => {
    return await axiosConfig.post(`/favorite/create`, data);
};
export const getAllFavoriteMusicAccount = async () => {
    return await axiosConfig.get("/favorite/get-authorization-token?Params");
};
