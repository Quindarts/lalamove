import React, { useEffect, useState } from "react";
import MusicItem from "../components/UI/Music/MusicItem";
import {
    getAllFavoriteMusicAccount,
    getAllFavoriteMusicbyParams,
} from "../services/favoriteApi";
import "../styles/pages/favoritepage.css";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useMusic from "../hooks/useMusic";
import useFavorite from "../hooks/useFavoriteAccount";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
function FavoritePage() {
    const { favorite, getAllListFavoriteAccount } = useFavorite();
    const { musics, updateMusic } = useMusic();
    const [loading, setLoading] = useState<boolean>(false);
    useEffect(() => {
        getAllFavoriteMusicbyParams(20, 1)
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
        getAllFavoriteMusicAccount()
            .then((res: any) => {
                if (res.status === 200) {
                    getAllListFavoriteAccount(res.data.data);
                    setLoading(true);
                    console.log("favorite:", favorite.favorite);
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
        <div className="favoritePage">
            <h1 className="my-1 font-bold text-[25px] my-5">
                Danh sách nhạc yêu thích của bạn
            </h1>
            <div className="flex flex-wrap gap-2">
                {favorite?.favorite.map((item: any, index: number) => (
                    <MusicGridItem music={item.music} key={index} />
                ))}
            </div>
            <h1 className="my-1 font-bold text-[25px] my-5">Gợi ý cho bạn</h1>

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
                {favorite?.favorite.map((item: any, index: number) => (
                    <SwiperSlide key={index} virtualIndex={index}>
                        <MusicItem mMusic={item.music} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default FavoritePage;
