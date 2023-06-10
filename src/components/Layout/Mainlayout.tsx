import { Layout } from "antd";
import Siderbar from "../Shared/Siderbar/Siderbar";
import MHeader from "../Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "../Shared/Footer/MFooter";
import { useEffect, useState } from "react";
import { fethAllPlaylistAccount } from "../../services/playlistApi";
import { getAllFavoriteMusicbyParams } from "../../services/favoriteApi";
import usePlaylist from "../../hooks/usePlaylist";
import useMusic from "../../hooks/useMusic";
import { getAllNewsMusicByParams } from "../../services/newMusicApi";

function Mainlayout() {
    const { getAllPlaylistAccount } = usePlaylist();

    const [typeTopView, setTypeTopView] = useState<String>("million");
    const { musics, updateMusic, fetchAllTopViewType ,fetchListNewsMusic} = useMusic();
    const [loading, setLoading] = useState(false);
    window.addEventListener("load", function () {
        localStorage.removeItem("access_token");
    });
    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            fethAllPlaylistAccount().then((res: any) => {
                getAllPlaylistAccount(res.data.data);
            });
        }

        getAllFavoriteMusicbyParams(20, 2).then((res: any) => {
            if (res.status === 200 || res.status === 204) {
                updateMusic(res.data.data);
            }
        });
        getAllNewsMusicByParams(24, 2).then((res: any) => {
            if (res.status === 200 || res.status === 204) {
                fetchListNewsMusic(res.data.data);
            }
        });
    }, []);
    return (
        <>
            <Layout>
                <Siderbar />
                <Layout style={{ background: "#171719" }}>
                    <MHeader />
                    <Outlet />
                    <div className="outlet-footer h-[70px]"></div>
                </Layout>
            </Layout>
            <MFooter />
        </>
    );
}

export default Mainlayout;
