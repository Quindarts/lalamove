import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setLogin } from "../store/useUser.slice";

export default function useUSer() {
    const user = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();
    const getLoginAccount = (data: any) => {
        dispatch(setLogin(data));
    };
    const getLogoutAccount = () => {
        dispatch(setLogin({}));
    };
    return { user, getLoginAccount,getLogoutAccount };

}
