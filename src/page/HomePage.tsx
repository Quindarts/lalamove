import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
import { getAllTopViewbyParams } from "../services/topViewApi";
import "../styles/pages/homepage.css";
import { Autoplay, Navigation } from "swiper";
import { Image } from "antd";
import useMusic from "../hooks/useMusic";
import MusicItem from "../components/UI/Music/MusicItem";
import { MusicItemType } from "../types/musicType";
import { Icon } from "@iconify/react";
import Button from "../components/UI/Button/Button";
import ImageZoom from "../components/UI/ZoomImage/ZoomImage";
import { listCategoryImage, listSlide } from "../types/constants";
import { AxiosResponse } from "axios";
import { color } from "../theme/variable";
function HomePage() {
    const [typeTopView, setTypeTopView] = useState<String>("million");
    const { musics, fetchAllTopViewType } = useMusic();
    const [renderInfinitySlide, setRenderInfinitySlide] = useState<number>(3);
    const [renderSlideBG, setRenderSlideBG] = useState<number>(3);
    const [widthApp, setWidthApp] = useState<number>(0);
    useEffect(() => {
        window.addEventListener("resize", () => {
            setWidthApp(window.innerWidth);
        });

        if (window.innerWidth > 1200) {
            setRenderInfinitySlide(6);
            setRenderSlideBG(3);
        }
        if (window.innerWidth > 1000 && window.innerWidth <= 1200) {
            setRenderInfinitySlide(4);
            setRenderSlideBG(2);
        }
        if (window.innerWidth > 600 && window.innerWidth <= 1000) {
            setRenderInfinitySlide(2);
            setRenderSlideBG(1);
        }
        if (window.innerWidth <= 600) {
            setRenderInfinitySlide(1);
            setRenderSlideBG(1);
        }
    }, [widthApp]);

    const handleSetTopView = (typeTopView: String) => {
        setTypeTopView(typeTopView);
    };
    useEffect(() => {
        getAllTopViewbyParams(4, 1, `${typeTopView}`).then(
            (res: AxiosResponse) => {
                if (res.status === 200 || res.status === 204) {
                    fetchAllTopViewType(res.data.data);
                }
            },
        );
    }, [typeTopView]);

    return (
        <div className="homePage">
            <Swiper
                slidesPerView={renderSlideBG}
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

            <h1 className="my-5 mt-[5rem] font-bold text-[1.6rem]">
                TOP VIEWS{" "}
                <Icon
                    icon="solar:star-bold"
                    className="text-yellow-400"
                    style={{ display: "inline-block" }}
                />
            </h1>
            <div className="text-white my-5  flex gap-2">
                <Button
                    onClick={() => handleSetTopView("million")}
                    color={
                        typeTopView === "million" ? "purpleClicked" : "purple"
                    }
                >
                    {" "}
                    Top triệu views
                </Button>
                <Button
                    onClick={() => handleSetTopView("billion")}
                    color={
                        typeTopView === "billion" ? "purpleClicked" : "purple"
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
            <div
                className="flex justify-between"
                style={{ alignItems: "center" }}
            >
                <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                    Thể loại{" "}
                </h1>
                <h1
                    className="title_views mb-5 mt-[5rem] font-[500] text-gray-600 text-[1rem] flex gap-1"
                    style={{ cursor: "pointer" }}
                >
                    Xem tất cả
                    <Icon icon="grommet-icons:next" className="mt-[2.2px]" />
                </h1>
            </div>

            <div className="flex flex-wrap gap-[1rem] my-5">
                <Swiper
                    slidesPerView={renderInfinitySlide}
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
                >
                    {listCategoryImage.map((img, index) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <ImageZoom srcImage={img} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                        Top bài hát tháng này{" "}
                    </h1>
                    <h1
                        className="title_views mb-5 mt-[5rem] font-[500] text-gray-600 text-[1rem] flex gap-1"
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
                    className=" p-[1rem] rounded-[6px]"
                    style={{ background: color.grey_btn_cl }}
                >
                    {musics.listTopView.map(
                        (music: MusicItemType, index: number) =>
                            index < 4 ? (
                                <div
                                    className="flex "
                                    style={{ alignItems: "center" }}
                                >
                                    <h1 className="text-[#fac228] text-[2.5rem] mr-[1rem] font-bold">
                                        #{index + 1}
                                    </h1>
                                    <MusicGridItem key={index} music={music} />
                                </div>
                            ) : (
                                <></>
                            ),
                    )}
                </div>
            </div>
            <div>
                <div
                    className="flex justify-between"
                    style={{ alignItems: "center" }}
                >
                    <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                        Yêu thích
                    </h1>
                    <h1
                        className="title_views mb-5 mt-[5rem] font-[500] text-gray-600 text-[1rem] flex gap-1"
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
                    slidesPerView={renderInfinitySlide}
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
                >
                    {musics.listFavorite.map(
                        (music: MusicItemType, index: number) =>
                            index < 11 ? (
                                <SwiperSlide key={index} virtualIndex={index}>
                                    <MusicItem mMusic={music} />
                                </SwiperSlide>
                            ) : (
                                <></>
                            ),
                    )}
                </Swiper>
            </div>

            <div
                className="flex justify-between"
                style={{ alignItems: "center" }}
            >
                <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                    Mới ra mắt{" "}
                </h1>
                <h1
                    className="title_views mb-5 mt-[5rem] font-[500] text-gray-600 text-[1rem] flex gap-1"
                    style={{ cursor: "pointer" }}
                >
                    Xem tất cả
                    <Icon icon="grommet-icons:next" className="mt-[2.2px]" />
                </h1>
            </div>
            <div className="news_music_slide  flex flex-wrap gap-1">
                {musics.listNews.map((music: MusicItemType, index: number) => (
                    <MusicGridItem key={index} music={music} />
                ))}
            </div>
        </div>
    );
}

export default HomePage;
