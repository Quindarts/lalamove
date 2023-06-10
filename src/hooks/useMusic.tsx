import { RootState } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import {
    searchByQuery,
    setListNews,
    setListTopView,
    setMusic,
    setPlayMusic,
    updateHistory,
} from "../store/useMusic.slice";
import { MusicItemType } from "../types/musicType";
import { TopViewMusicType } from "../types/topViewsType";

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
    const fetchAllTopViewType = (data: TopViewMusicType) => {
        dispatch(setListTopView(data));
    };
    const fetchListNewsMusic = (data: TopViewMusicType) => {
        dispatch(setListNews(data));
    };
    return {
        musics,
        updateMusic,
        playMusic,
        searchMusicByQuery,
        updateMusicHistory,
        fetchAllTopViewType,
        fetchListNewsMusic,
    };
}
