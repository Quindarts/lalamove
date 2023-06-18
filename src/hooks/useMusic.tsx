import { RootState } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import {
    searchByQuery,
    setListFavorite,
    setListNews,
    setListTopView,
    setMusic,
    setPlayMusic,
    updateHistory,
} from "../store/useMusic.slice";
import { MusicItemType } from "../types/musicType";


export default function useMusic() {
    const musics = useSelector((state: RootState) => state.musics);
    const dispatch = useDispatch();

    const updateMusic = (data: MusicItemType[]) => {
        dispatch(setMusic(data));
    };
    const playMusic = (data: MusicItemType ) => {
        dispatch(setPlayMusic(data));
    };
    const searchMusicByQuery = (data: MusicItemType[]) => {
        dispatch(searchByQuery(data));
    };
    const updateMusicHistory = (data: any) => {
        dispatch(updateHistory(data));
    };
    const fetchAllTopViewType = (data: MusicItemType[]) => {
        dispatch(setListTopView(data));
    };
    const fetchListNewsMusic = (data: any) => {
        dispatch(setListNews(data));
    };
    const fetchListFavorite = (data: MusicItemType[]) => {
        dispatch(setListFavorite(data));
    };
    return {
        musics,
        updateMusic,
        playMusic,
        searchMusicByQuery,
        updateMusicHistory,
        fetchAllTopViewType,
        fetchListNewsMusic,
        fetchListFavorite,
    };
}
