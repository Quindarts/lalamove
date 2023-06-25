import axiosConfig from "./axiosconfig";

export const apiGetListNewsMusic = async (
    limit: number,
    page: number,
) => {
    return await axiosConfig.get(
        `/music/new-music?_limit=${limit}&_page=${page}`,
    );
};
