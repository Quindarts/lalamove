import { Layout } from "antd";
import Siderbar from "components/Shared/Siderbar/Siderbar";
import MHeader from "components/Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "components/Shared/Footer/MFooter";
import { useEffect, useState } from "react";
import usePlaylist from "hooks/usePlaylist";
import useMusic from "hooks/useMusic";
import { color } from "theme/variable";
import FooterMobile from "components/Shared/Footer/FooterMobile";
import HeaderMobile from "components/Shared/Header/HeaderMobile";
import useUSer from "hooks/useUser";
import useFavorite from "hooks/useFavoriteAccount";

function Mainlayout() {
    const { getAllPlaylistAccount } = usePlaylist();
    const { getRankingLoveMusic, getListNewsMusic } = useMusic();
    const { getLogoutAccount } = useUSer();
    const { getAllListFavoriteAccount } = useFavorite();
    const [widthApp, setWidthApp] = useState<number>(window.innerWidth);

    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidthApp(window.innerWidth);
        });
        getLogoutAccount();
        getAllPlaylistAccount();
        getAllListFavoriteAccount();
        getRankingLoveMusic(24, 3);
        getListNewsMusic(27, 2);
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
