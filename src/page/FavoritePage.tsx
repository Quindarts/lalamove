import { useEffect, useState } from "react";
import { Autoplay, Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { MusicFavoriteAccountType } from "types/favoriteType";
import { MusicItemType } from "types/musicType";
import useMusic from "hooks/useMusic";
import useFavorite from "hooks/useFavoriteAccount";
import MusicItem from "components/UI/Music/MusicItem";
import MusicGridItem from "components/UI/Music/MusicGridItem";
import "styles/pages/favoritepage.css";
import { MusicItemBreakpoints } from "types/constants";
function FavoritePage() {
    const { favorite, getAllListFavoriteAccount } = useFavorite();
    const { musics } = useMusic();
    useEffect(() => {
        getAllListFavoriteAccount();
    }, []);
    return (
        <div className="favoritePage">
            <>
                <h1 className="text-[25px] font-bold my-5">YÊU THÍCH</h1>
                {favorite?.favorite.length !== 0 ? (
                    <div className="flex flex-wrap gap-2 my-5">
                        {favorite?.favorite.map(
                            (item: MusicFavoriteAccountType, index: number) => (
                                <MusicGridItem music={item.music} key={index} />
                            ),
                        )}
                    </div>
                ) : (
                    <h1 className="text-[25px] text-white text-center font-bold my-5 ">
                        Danh sách yêu thích của bạn trống
                    </h1>
                )}
                <h1 className="text-[25px] font-bold my-5">Gợi ý cho bạn</h1>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={30}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: false,
                        reverseDirection: false,
                    }}
                    breakpoints={MusicItemBreakpoints}
                >
                    {musics?.listFavorite.map(
                        (music: MusicItemType, index: number) =>
                            index > 12 && (
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
