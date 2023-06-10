import { Layout } from "antd";
import Siderbar from "../Shared/Siderbar/Siderbar";
import MHeader from "../Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "../Shared/Footer/MFooter";
import { useEffect } from "react";
import { fethAllPlaylistAccount } from "../../services/playlistApi";
import { getAllFavoriteMusicbyParams } from "../../services/favoriteApi";
import usePlaylist from "../../hooks/usePlaylist";
import useMusic from "../../hooks/useMusic";
import { getAllNewsMusicByParams } from "../../services/newMusicApi";
import { AxiosResponse } from "axios";

function Mainlayout() {
    const { getAllPlaylistAccount } = usePlaylist();
    const { fetchListFavorite, fetchListNewsMusic } = useMusic();
    window.addEventListener("load", function () {
        localStorage.removeItem("access_token");
    });
    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            fethAllPlaylistAccount().then((res: AxiosResponse) => {
                getAllPlaylistAccount(res.data.data);
            });
        }

        getAllFavoriteMusicbyParams(20, 2).then((res: AxiosResponse) => {
            if (res.status === 200 || res.status === 204) {
                fetchListFavorite(res.data.data);
                console.log(res.data);
                
            }
        });
        getAllNewsMusicByParams(24, 2).then((res: AxiosResponse) => {
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
