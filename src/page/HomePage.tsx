import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
import { getAllTopViewbyParams } from "../services/topViewApi";
import sl1 from "../assets/image/sl1.jpg";
import sl2 from "../assets/image/sl2.jpg";
import sl3 from "../assets/image/sl3.jpg";
import sl4 from "../assets/image/sl4.jpg";
import "../styles/pages/homepage.css";
import { Autoplay, Navigation, Virtual } from "swiper";
import { Image, Spin } from "antd";
import { getAllFavoriteMusicbyParams } from "../services/favoriteApi";
import useMusic from "../hooks/useMusic";
import MusicItem from "../components/UI/Music/MusicItem";
import { getAllNewsMusicByParams } from "../services/newMusicApi";
import { fethAllPlaylistAccount } from "../services/playlistApi";
import usePlaylist from "../hooks/usePlaylist";
function HomePage() {
    const listSlide = [sl1, sl2, sl3, sl4];
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const [listView, setlistView] = useState({ data: [], panigation: {} });
    const [listNewsMusic, setlistNewsMusic] = useState({
        data: [],
        panigation: {},
    });

    const { musics, updateMusic } = useMusic();
    const [loading, setLoading] = useState(false);
    const toggle = (checked: boolean) => {
        setLoading(checked);
    };
    useEffect(() => {
        fethAllPlaylistAccount().then((res: any) => {
            getAllPlaylistAccount(res.data.data);
        });
        getAllTopViewbyParams(12, 1, "million")
            .then((res: any) => {
                if (res.status === 200) {
                    setlistView(res.data);
                    setLoading(true);
                }
                if (res.status === 400) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        getAllFavoriteMusicbyParams(20, 2)
            .then((res: any) => {
                if (res.status === 200) {
                    updateMusic(res.data.data);
                    setLoading(true);
                }
                if (res.status === 400) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
        getAllNewsMusicByParams(20, 1)
            .then((res: any) => {
                if (res.status === 200) {
                    setlistNewsMusic(res.data);
                    setLoading(true);
                }
                if (res.status === 400) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className="homePage">
            <Swiper
                slidesPerView={2}    
                modules={[Autoplay]}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                }}
                className="homeSlide-top my-3"
            >
                {listSlide.map((slideContent, index) => (
                    <SwiperSlide key={slideContent} virtualIndex={index}>
                        <Image width={820} height={500} src={`${slideContent}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <h1 className="my-5 font-bold text-[25px]">Top View</h1>
            <div className="top_views_slide flex flex-wrap gap-2 justify-center align-middle">
                {loading ? (
                    listView?.data.map((music, index) => (
                        <MusicGridItem key={index} music={music} />
                    ))
                ) : (
                    <Spin className="" size="large" />
                )}
            </div>
            <h1 className="my-5 font-bold text-[25px]">YÊU THÍCH</h1>
            <Swiper
                slidesPerView={6}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                }}
            >
                {musics?.musics.map((music: any, index: number) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <MusicItem mMusic={music} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <h1 className="my-5 font-bold text-[25px]">MỚI RA MẮT </h1>
            <div className="news_music_slide flex flex-wrap gap-1">
                {loading ? (
                    listNewsMusic?.data.map((music, index) => (
                        <MusicGridItem key={index} music={music} />
                    ))
                ) : (
                    <Spin className="" size="large" />
                )}
            </div>
        </div>
    );
}

export default HomePage;
