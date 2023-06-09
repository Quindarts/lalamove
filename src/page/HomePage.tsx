import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
import { getAllTopViewbyParams } from "../services/topViewApi";

import "../styles/pages/homepage.css";
import { Autoplay, Navigation } from "swiper";
import { Image, Spin } from "antd";
import { getAllFavoriteMusicbyParams } from "../services/favoriteApi";
import useMusic from "../hooks/useMusic";
import MusicItem from "../components/UI/Music/MusicItem";
import { getAllNewsMusicByParams } from "../services/newMusicApi";
import { fethAllPlaylistAccount } from "../services/playlistApi";
import usePlaylist from "../hooks/usePlaylist";
import { MusicItemType } from "../types/musicType";
import { Icon } from "@iconify/react";
import Button from "../components/UI/Button/Button";
import ImageZoom from "../components/UI/ZoomImage/ZoomImage";
import { listCategoryImage, listSlide } from "../types/constants";
function HomePage() {
    const { getAllPlaylistAccount } = usePlaylist();
    const [listView, setlistView] = useState({ data: [], panigation: {} });
    const [listNewsMusic, setlistNewsMusic] = useState({
        data: [],
        panigation: {},
    });
    const [typeTopView, setTypeTopView] = useState<String>("million");
    const { musics, updateMusic } = useMusic();
    const [loading, setLoading] = useState(false);
    const [renderInfinitySlide, setRenderInfinitySlide] = useState<number>(3);
    const [widthApp, setWidthApp] = useState<number>(0);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidthApp(window.innerWidth);
        });

        if (window.innerWidth > 1200) setRenderInfinitySlide(6);
        if (window.innerWidth > 1000 && window.innerWidth <= 1200)
            setRenderInfinitySlide(4);
        if (window.innerWidth > 600 && window.innerWidth <= 1000)
            setRenderInfinitySlide(2);
        if (window.innerWidth <= 600) setRenderInfinitySlide(1);
    }, [widthApp]);

    const handleSetTopView = (typeTopView: String) => {
        setTypeTopView(typeTopView);
    };
    useEffect(() => {
        getAllTopViewbyParams(12, 1, `${typeTopView}`).then((res: any) => {
            if (res.status === 200) {
                setlistView(res.data);
                setLoading(true);
            }
        });
    }, [typeTopView]);

    useEffect(() => {
        if (localStorage.getItem("access_token") !== null) {
            fethAllPlaylistAccount().then((res: any) => {
                getAllPlaylistAccount(res.data.data);
            });
        }

        getAllFavoriteMusicbyParams(20, 2).then((res: any) => {
            if (res.status === 200 || res.status === 204) {
                updateMusic(res.data.data);
                setLoading(true);
            }
        });
        getAllNewsMusicByParams(24, 2).then((res: any) => {
            if (res.status === 200 || res.status === 204) {
                setlistNewsMusic(res.data);
                setLoading(true);
            }
        });
    }, [loading]);

    return (
        <div className="homePage">
            <Swiper
                slidesPerView={3}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 1000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                    stopOnLastSlide: false,
                    reverseDirection: false,
                }}
                className="homeSlide-top my-3"
            >
                {listSlide.map((slide, index) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <Image
                            width={500}
                            height={300}
                            src={`${slide}`}
                            className="rounded-lg"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>

            <h1 className="my-5 mt-[5rem] font-bold text-[25px]">
                TOP VIEW{" "}
                <Icon
                    icon="solar:star-bold"
                    className="text-yellow-400"
                    style={{ display: "inline-block" }}
                />
            </h1>
            <div className="text-white m-5  flex gap-2">
                <Button
                    onClick={() => handleSetTopView("million")}
                    color={
                        typeTopView === "million" ? "purpleClicked" : "purple"
                    }
                >
                    {" "}
                    Top triệu view
                </Button>
                <Button
                    onClick={() => handleSetTopView("billion")}
                    color={
                        typeTopView === "billion" ? "purpleClicked" : "purple"
                    }
                >
                    Top tỉ view
                </Button>
            </div>
            <div className="top_views_slide flex flex-wrap gap-2 justify-center align-middle">
                {loading ? (
                    listView?.data.map(
                        (music: MusicItemType, index: number) => (
                            <MusicGridItem key={index} music={music} />
                        ),
                    )
                ) : (
                    <Spin className="" size="large" />
                )}
            </div>
            <h1 className="mb-5 mt-[5rem] font-bold text-[25px]"> </h1>
            <div className="flex flex-wrap gap-[2rem] justify-center">
                {listCategoryImage.map((img, index) =>
                    index < 7 ? <ImageZoom srcImage={img} /> : <></>,
                )}
            </div>

            <h1 className="mb-5 mt-[5rem] font-bold text-[25px]">
                MỚI RA MẮT{" "}
            </h1>
            <div className="news_music_slide flex flex-wrap gap-1 justify-center">
                {loading ? (
                    listNewsMusic?.data.map(
                        (music: MusicItemType, index: number) => (
                            <MusicGridItem key={index} music={music} />
                        ),
                    )
                ) : (
                    <Spin className="" size="large" />
                )}
            </div>
            <h1 className="mb-5 mt-[5rem] font-bold text-[25px]">YÊU THÍCH</h1>
            <Swiper
                slidesPerView={renderInfinitySlide}
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
                {musics?.musics.map((music: MusicItemType, index: number) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <MusicItem mMusic={music} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default HomePage;
