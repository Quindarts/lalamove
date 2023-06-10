import axiosConfig from "./axiosconfig";

export async function getMusicTrendingParams(limit: number, page: number) {
    return await axiosConfig.get(
        `/music/trending?_limit=${limit}&_page=${page}`,
    );
}
