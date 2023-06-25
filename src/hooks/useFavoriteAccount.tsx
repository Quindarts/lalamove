import { useDispatch, useSelector } from "react-redux";
import { apiGetFavouriteMusicAccount } from "services/favoriteApi";
import { RootState } from "store";
import { setAllFavoriteAccount } from "store/useFavorite.slice";
import { isCheckedAccessToken } from "utils/helpers";

export default function useFavorite() {
    const favorite = useSelector((state: RootState) => state.favorite);
    const dispatch = useDispatch();
    
    const getAllListFavoriteAccount = async () => {
        try {
            if (isCheckedAccessToken()) {
                const resultRes = await apiGetFavouriteMusicAccount();
                if (resultRes.status === 200 || resultRes.status === 204) {
                    dispatch(setAllFavoriteAccount(resultRes.data.data));
                }
            }
        } catch (err) {
            console.log(err);
        }
    };
    return { favorite, getAllListFavoriteAccount };
}
