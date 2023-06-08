import { RootState } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import {
    MusicItemType,
    searchByQuery,
    setMusic,
    setPlayMusic,
    updateHistory,
} from "../store/useMusic.slice";

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
    return {
        musics,
        updateMusic,
        playMusic,
        searchMusicByQuery,
        updateMusicHistory,
    };
}
