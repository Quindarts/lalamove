import React, { useEffect, useState } from "react";
import MusicItem from "../components/UI/Music/MusicItem";
import { getAllFavoriteMusicbyParams } from "../services/favoriteApi";
import "../styles/pages/favoritepage.css";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import useMusic from "../hooks/useMusic";
function FavoritePage() {
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
    }, []);
    return (
        <div className="favoritePage">
            <h1 className="my-1 font-bold text-[25px]">Xu Hướng</h1>

            <Swiper
                slidesPerView={6}
                navigation={true}
                modules={[Navigation, Autoplay]}
                autoplay={{
                    delay: 3000,
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
        </div>
    );
}

export default FavoritePage;
