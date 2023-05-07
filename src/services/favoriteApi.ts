import axiosConfig from "./axiosconfig";

export const getAllFavoriteMusicbyParams = async (
    limit: number,
    page: number,
) => {
    return await axiosConfig.get(
        `/music/favorite?_limit=${limit}&_page=${page}`,
    );
};
export const createMuisicToFavoriteList = async (idMusic: any) => {
    return await axiosConfig.post(`/favorite/create`, idMusic);
};
export const getAllFavoriteMusicAccount = async () => {
    return await axiosConfig.get("/favorite/get-authorization-token?Params");
};
