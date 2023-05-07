import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAllPlaylistAccount, setPlaylistDetailAcccount } from "../store/usePlaylist.slice";

export default function usePlaylist() {
    const playlist = useSelector((state: RootState) => state.playlist);
    const dispatch = useDispatch();
    const getAllPlaylistAccount = (data: any) => {
        dispatch(setAllPlaylistAccount(data));
    };
    const getPlaylistDetailAccount = (data: any) => {
        dispatch(setPlaylistDetailAcccount(data));
    };
    return { playlist, getAllPlaylistAccount,getPlaylistDetailAccount };
}
