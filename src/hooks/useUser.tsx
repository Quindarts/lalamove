import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setAllFavoriteAccount } from "store/useFavorite.slice";
import { setAllPlaylistAccount } from "store/usePlaylist.slice";
import { setLogin, setRegister } from "store/useUser.slice";
import { removeAccessToken } from "utils/helpers";

export default function useUSer() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    const getLoginAccount = (data: any) => {
        dispatch(setLogin(data));
    };
    
    const getLogoutAccount = () => {
        dispatch(setLogin({}));
        dispatch(setAllFavoriteAccount([]));
        dispatch(setAllPlaylistAccount([]));
        removeAccessToken()
    };
    const getRegisterAccount = (data: any) => {
        dispatch(setRegister(data));
    };
    return { user, getLoginAccount, getLogoutAccount, getRegisterAccount };
}
