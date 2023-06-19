import { Layout } from "antd";
import Siderbar from "components/Shared/Siderbar/Siderbar";
import MHeader from "components/Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "components/Shared/Footer/MFooter";
import { useEffect, useState } from "react";
import { fethAllPlaylistAccount } from "services/playlistApi";
import { fetchAllFavoriteMusicbyParams } from "services/favoriteApi";
import usePlaylist from "hooks/usePlaylist";
import useMusic from "hooks/useMusic";
import {
    setAllPlaylistAccount,
    setPlaylistDetailAcccount,
} from "store/usePlaylist.slice";
import { fetchAllNewsMusicByParams } from "services/newMusicApi";
import { AxiosResponse } from "axios";
import { color } from "theme/variable";
import { isCheckedAccessToken, removeAccessToken } from "utils/helpers";

import FooterMobile from "components/Shared/Footer/FooterMobile";
import HeaderMobile from "components/Shared/Header/HeaderMobile";
import { setAllFavoriteAccount } from "store/useFavorite.slice";
import useUSer from "hooks/useUser";

function Mainlayout() {
    const { getAllPlaylistAccount } = usePlaylist();
    const { fetchListFavorite, fetchListNewsMusic } = useMusic();
    const [widthApp, setWidthApp] = useState<number>(window.innerWidth);
    const { getLogoutAccount } = useUSer();
    useEffect(() => {
        getLogoutAccount();
        isCheckedAccessToken() &&
            fethAllPlaylistAccount().then((res: AxiosResponse) => {
                getAllPlaylistAccount(res.data.data);
            });
        fetchAllFavoriteMusicbyParams(24, 3).then((res: AxiosResponse) => {
            if (res.status === 200 || res.status === 204) {
                fetchListFavorite(res.data.data);
            }
        });
        fetchAllNewsMusicByParams(27, 2).then((res: AxiosResponse) => {
            if (res.status === 200 || res.status === 204) {
                fetchListNewsMusic(res.data.data);
            }
        });
    }, []);
    return (
        <>
            <Layout>
                {widthApp >= 1080 ? <Siderbar /> : <></>}
                <Layout style={{ background: color.main_cl }}>
                    {widthApp >= 1080 ? <MHeader /> : <HeaderMobile />}
                    <Outlet />
                    <div className="outlet-footer h-[70px]"></div>
                    {widthApp >= 1080 ? <MFooter /> : <FooterMobile />}
                </Layout>
            </Layout>
        </>
    );
}

export default Mainlayout;
