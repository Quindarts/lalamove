import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper";
import { Image } from "antd";
import useMusic from "hooks/useMusic";
import { Icon } from "@iconify/react";
import {
    ItemSizeSmallBreakpoints,
    listCategoryImage,
    listSlide,
    MusicItemBreakpoints,
} from "types/constants";
import { MusicItemType } from "types/musicType";
import { color } from "theme/variable";
import MusicItemBasic from "components/UI/Music/MusicItemBasic";
import MusicItem from "components/UI/Music/MusicItem";
import MusicGridItem from "components/UI/Music/MusicGridItem";
import ImageZoom from "components/UI/ZoomImage/ZoomImage";
import Button from "components/UI/Button/Button";
import "styles/pages/homepage.css";

function HomePage() {
    const [typeTopView, setTypeTopView] = useState<string>("million");
    const { musics, getTopViewByType } = useMusic();
    const handleSetTopView = (typeTopView: string) => {
        setTypeTopView(typeTopView);
    };
    useEffect(() => {
        getTopViewByType(5, 1, `${typeTopView}`);
    }, [typeTopView]);

    return (
        <div className="homePage">
            <div>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    navigation={true}
                    modules={[Navigation, Autoplay]}
                    autoplay={{
                        delay: 5000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                        stopOnLastSlide: false,
                        reverseDirection: false,
                    }}
                    breakpoints={{
                        768: {
                            slidesPerView: 2,
                        },
                        1080: {
                            slidesPerView: 3,
                        },
                    }}
                    className="homeSlide-top"
                >
                    {listSlide.map((slide, index) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <Image
                                width="100%"
                                height="100%"
                                src={`${slide}`}
                                className="rounded-lg"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="text-[1.6rem] font-bold  mb-5 mt-5">
                        Phát hành gần đây{" "}
                    </h1>
                    <h1
                        className="title_views mb-5 flex gap-1 text-gray-600 text-[1rem] font-[500] mt-5"
                        style={{ cursor: "pointer" }}
                    >
                        Xem tất cả
                        <Icon
                            icon="grommet-icons:next"
                            className="mt-[2.2px]"
                        />
                    </h1>
                </div>
                <div className="flex flex-wrap justify-between">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={15}
                        modules={[Autoplay]}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            stopOnLastSlide: false,
                            reverseDirection: false,
                        }}
                        breakpoints={ItemSizeSmallBreakpoints}
                    >
                        {musics.listNews.map(
                            (music, index) =>
                                index > 5 && (
                                    <SwiperSlide
                                        key={index}
                                        virtualIndex={index}
                                    >
                                        <MusicItemBasic
                                            key={index}
                                            music={music}
                                        />
                                    </SwiperSlide>
                                ),
                        )}
                    </Swiper>
                </div>
            </div>

            <div>
                <h1 className="text-[1.6rem] font-bold my-5 mt-5">
                    Top lượt xem{" "}
                    <Icon
                        icon="solar:star-bold"
                        className="text-yellow-400"
                        style={{ display: "inline-block" }}
                    />
                </h1>
                <div className="flex gap-2 text-white my-5">
                    <Button
                        onClick={() => handleSetTopView("million")}
                        color={
                            typeTopView === "million"
                                ? "purpleClicked"
                                : "purple"
                        }
                    >
                        Top triệu views
                    </Button>
                    <Button
                        onClick={() => handleSetTopView("billion")}
                        color={
                            typeTopView === "billion"
                                ? "purpleClicked"
                                : "purple"
                        }
                    >
                        Top tỉ views
                    </Button>
                </div>
                <div
                    className=" top_views_slide flex flex-wrap gap-2 mt-5 p-[1rem] rounded-[6px]"
                    style={{ background: color.grey_btn_cl }}
                >
                    {musics.listTopView.map(
                        (music: MusicItemType, index: number) => (
                            <MusicGridItem key={index} music={music} />
                        ),
                    )}
                </div>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="text-[1.6rem] font-bold mt-5">Thể loại </h1>
                    <h1
                        className="title_views flex gap-1 text-gray-600 text-[1rem] font-[500]  mt-5"
                        style={{ cursor: "pointer" }}
                    >
                        Xem tất cả
                        <Icon
                            icon="grommet-icons:next"
                            className="mt-[2.2px]"
                        />
                    </h1>
                </div>

                <div className="flex flex-wrap gap-[1rem] my-5">
                    <Swiper
                        slidesPerView={1}
                        navigation={true}
                        spaceBetween={15}
                        modules={[Navigation, Autoplay]}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                            stopOnLastSlide: false,
                            reverseDirection: false,
                        }}
                        breakpoints={ItemSizeSmallBreakpoints}
                    >
                        {listCategoryImage.map((img, index) => (
                            <SwiperSlide key={index} virtualIndex={index}>
                                <ImageZoom srcImage={img} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="text-[1.6rem] font-bold mb-5 mt-5">
                        Top bài hát tháng này{" "}
                    </h1>
                    <h1
                        className="title_views flex gap-1 text-gray-600 text-[1rem] font-[500] mb-5 mt-5"
                        style={{ cursor: "pointer" }}
                    >
                        Xem tất cả
                        <Icon
                            icon="grommet-icons:next"
                            className="mt-[2.2px]"
                        />
                    </h1>
                </div>
                <div
                    className="top_month_block p-[1rem] rounded-[6px]"
                    style={{ background: color.grey_btn_cl }}
                >
                    {musics.listTopView.map(
                        (music: MusicItemType, index: number) =>
                            index < 4 && (
                                <div
                                    className="flex "
                                    style={{ alignItems: "center" }}
                                >
                                    <h1 className="title_ranking_number text-[#fac228] text-[2.5rem] font-bold  mr-[1rem]">
                                        #{index + 1}
                                    </h1>
                                    <MusicGridItem key={index} music={music} />
                                </div>
                            ),
                    )}
                </div>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="text-[1.6rem] font-bold  mb-5 mt-5">
                        Yêu thích
                    </h1>
                    <h1
                        className="title_views flex gap-1  text-gray-600 text-[1rem] font-[500] mb-5 mt-5 "
                        style={{ cursor: "pointer" }}
                    >
                        Xem tất cả
                        <Icon
                            icon="grommet-icons:next"
                            className="mt-[2.2px]"
                        />
                    </h1>
                </div>
                <Swiper
                    slidesPerView={1}
                    navigation={true}
                    spaceBetween={15}
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
                    {musics.listFavorite.map(
                        (music: MusicItemType, index: number) =>
                            index < 11 && (
                                <SwiperSlide key={index} virtualIndex={index}>
                                    <MusicItem mMusic={music} />
                                </SwiperSlide>
                            ),
                    )}
                </Swiper>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="text-[1.6rem] font-bold mb-5 mt-5">
                        Mới ra mắt{" "}
                    </h1>
                    <h1
                        className="title_views flex gap-1 text-gray-600 text-[1rem] font-[500] mb-5 mt-5"
                        style={{ cursor: "pointer" }}
                    >
                        Xem tất cả
                        <Icon
                            icon="grommet-icons:next"
                            className="mt-[2.2px]"
                        />
                    </h1>
                </div>
                <div className="news_music_slide  flex flex-wrap gap-1">
                    {musics.listNews.map(
                        (music: MusicItemType, index: number) =>
                            index < 7 && (
                                <MusicGridItem key={index} music={music} />
                            ),
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
