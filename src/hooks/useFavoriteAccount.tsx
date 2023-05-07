import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAllFavoriteAccount } from "../store/useFavorite.slice";

export default function useFavorite() {
    const favorite = useSelector((state: RootState) => state.favorite);
    const dispatch = useDispatch();
    const getAllListFavoriteAccount = (data: any) => {
        dispatch(setAllFavoriteAccount(data));
    };
    return { favorite, getAllListFavoriteAccount };
}
