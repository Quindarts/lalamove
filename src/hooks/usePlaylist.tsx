import { useDispatch, useSelector } from "react-redux";
import { apiGetPlaylistAccount } from "services/playlistApi";
import { RootState } from "store";
import {
    setAllPlaylistAccount,
    setPlaylistDetailAcccount,
} from "store/usePlaylist.slice";
import { isCheckedAccessToken } from "utils/helpers";

export default function usePlaylist() {
    const playlist = useSelector((state: RootState) => state.playlist);
    const dispatch = useDispatch();

    const getAllPlaylistAccount = async () => {
        try {
            if (isCheckedAccessToken()) {
                const resultRes = await apiGetPlaylistAccount();
                if (resultRes.status === 200 || resultRes.status === 204)
                    dispatch(setAllPlaylistAccount(resultRes.data.data));
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const getPlaylistDetailAccount = (data: any) => {
        dispatch(setPlaylistDetailAcccount(data));
    };
    return { playlist, getAllPlaylistAccount, getPlaylistDetailAccount };
}
