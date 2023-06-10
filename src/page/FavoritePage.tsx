import React, { useEffect, useState } from "react";
import MusicItem from "../components/UI/Music/MusicItem";
import { getAllFavoriteMusicAccount } from "../services/favoriteApi";
import "../styles/pages/favoritepage.css";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useMusic from "../hooks/useMusic";
import useFavorite from "../hooks/useFavoriteAccount";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
import { Spin } from "antd";
import { AxiosResponse } from "axios";
import {
    MusicFavoriteAccountType,
    MusicFavoriteItemType,
} from "../types/favoriteType";
function FavoritePage() {
    const { favorite, getAllListFavoriteAccount } = useFavorite();
    const { musics } = useMusic();
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
    useEffect(() => {
        getAllFavoriteMusicAccount().then((res: AxiosResponse) => {
            if (res.status === 200 || res.status === 204) {
                getAllListFavoriteAccount(res.data.data);
            }
        });
    }, []);
    return (
        <div className="favoritePage">
            <>
                <h1 className=" font-bold text-[25px] my-5">YÊU THÍCH</h1>
                <div className="flex flex-wrap gap-2 my-5">
                    {favorite?.favorite.map(
                        (item: MusicFavoriteAccountType, index: number) => (
                            <MusicGridItem music={item.music} key={index} />
                        ),
                    )}
                </div>
                <h1 className=" font-bold text-[25px] my-5 ">Gợi ý cho bạn</h1>

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
                    {musics.listFavorite.map(
                        (music: MusicFavoriteItemType, index: number) => (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <MusicItem mMusic={music} />
                            </SwiperSlide>
                        ),
                    )}
                </Swiper>
            </>
        </div>
    );
}

export default FavoritePage;
