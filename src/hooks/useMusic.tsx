import { RootState } from "store/index";
import { useSelector, useDispatch } from "react-redux";
import {
    searchByQuery,
    setListFavorite,
    setListNews,
    setListTopView,
    setMusic,
    setPlayMusic,
    updateHistory,
} from "store/useMusic.slice";
import { MusicItemType } from "types/musicType";
import { apiGetListNewsMusic } from "services/newMusicApi";
import { AxiosResponse } from "axios";
import { apiGetRankingLoveMusic } from "services/favoriteApi";
import { getAllTopViewbyParams } from "services/topViewApi";

export default function useMusic() {
    const musics = useSelector((state: RootState) => state.musics);
    const dispatch = useDispatch();

    const updateMusic = (data: MusicItemType[]) => {
        dispatch(setMusic(data));
    };
    const playMusic = (data: MusicItemType) => {
        dispatch(setPlayMusic(data));
    };
    const searchMusicByQuery = (data: MusicItemType[]) => {
        dispatch(searchByQuery(data));
    };
    const updateMusicHistory = (data: any) => {
        dispatch(updateHistory(data));
    };
    const getTopViewByType = async (
        limit: number,
        page: number,
        type: string,
    ) => {
        try {
            const resultRes = await getAllTopViewbyParams(limit, page, type);
            if (resultRes.status === 200 || resultRes.status === 204) {
                dispatch(setListTopView(resultRes.data.data));
            }
        } catch (err) {
            console.log(err);
        }
    };

    const getListNewsMusic = async (limit: number, page: number) => {
        try {
            const resultRes = await apiGetListNewsMusic(limit, page);
            if (resultRes.status === 200 || resultRes.status === 204) {
                dispatch(setListNews(resultRes.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const getRankingLoveMusic = async (limit: number, page: number) => {
        try {
            const resultRes = await apiGetRankingLoveMusic(limit, page);
            if (resultRes.status === 200 || resultRes.status === 204) {
                dispatch(setListFavorite(resultRes.data.data));
            }
        } catch (err) {
            console.log(err);
        }
    };
    return {
        musics,
        updateMusic,
        playMusic,
        searchMusicByQuery,
        updateMusicHistory,
        getTopViewByType,
        getListNewsMusic,
        getRankingLoveMusic,
    };
}
