import axiosConfig from "./axiosconfig";

export const getAllTopViewbyParams = async (
    limit: number,
    page: number,
    type: string,
) => {
    return await axiosConfig.get(
        `/music/top-views?_limit=${limit}&_page=${page}&_type=${type}`,
    );
};
