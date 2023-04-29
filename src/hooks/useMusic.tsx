import { RootState } from "../store/index";
import { useSelector, useDispatch } from "react-redux";
import { MusicItemType, setMusic, setPlayMusic } from "../store/useMusic.slice";
export default function useMusic() {
    const musics  = useSelector((state: RootState) => state.musics);
    const dispatch = useDispatch();

    const updateMusic = (data: MusicItemType[]) => {
        dispatch(setMusic(data));
    };
    const playMusic = (data: MusicItemType) => {
        dispatch(setPlayMusic(data));
    };
    return { musics, updateMusic,playMusic };
}
