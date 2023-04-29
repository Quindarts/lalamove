import axiosConfig from "./axiosconfig";

export const getAllFavoriteMusicbyParams = async (
    limit: number,
    page: number,
) => {
    return await axiosConfig.get(
        `/music/favorite?_limit=${limit}&_page=${page}`,
    );
};
