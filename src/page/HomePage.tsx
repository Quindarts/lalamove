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
import Chart from "../components/UI/Chart/Chart";
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
        getAllTopViewbyParams(12, 1, `${typeTopView}`).then(
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
                {musics.listTopView.map(
                    (music: MusicItemType, index: number) => (
                        <MusicGridItem key={index} music={music} />
                    ),
                )}
            </div>
            <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]"> </h1>
            <div className="flex flex-wrap gap-[2rem] justify-center">
                {listCategoryImage.map((img, index) =>
                    index < 7 ? <ImageZoom srcImage={img} /> : <></>,
                )}
            </div>

            <div className="chart_music flex flex-wrap gap-[5rem] my-[5rem] py-5  px-[5rem] ">
                <div className="text-black flex-1 mt-3">
                    <Chart />
                </div>
                <div className="flex-[0.8]">
                    <h1 className=" flex text-[#fff] text-[1.5rem] font-bold mb-4 ml-5">
                        <Icon
                            icon="fa6-solid:ranking-star"
                            className="mx-1 text-[1.8rem] text-[#dc5ee7]"
                        />{" "}
                        TOP BÀI HÁT THÁNG NÀY
                    </h1>
                    {musics.listTopView.map(
                        (music: MusicItemType, index: number) =>
                            index < 4 ? (
                                <div
                                    className="flex gap-5 pl-5 my-5"
                                    style={{ alignItems: "center" }}
                                >
                                    <h1 className="text-[#a841ec] font-bold text-[3rem]">
                                        #{index + 1}
                                    </h1>
                                    <MusicGridItem
                                        className="flex-1"
                                        key={index}
                                        music={music}
                                    />
                                </div>
                            ) : (
                                <></>
                            ),
                    )}
                </div>
            </div>
            <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                MỚI RA MẮT{" "}
            </h1>
            <div className="news_music_slide flex flex-wrap gap-1 justify-center">
                {musics.listNews.map((music: MusicItemType, index: number) => (
                    <MusicGridItem key={index} music={music} />
                ))}
            </div>
            <h1 className="mb-5 mt-[5rem] font-bold text-[1.6rem]">
                YÊU THÍCH
            </h1>
            <Swiper
                slidesPerView={renderInfinitySlide}
                navigation={true}
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
                    (music: MusicItemType, index: number) => (
                        <SwiperSlide key={index} virtualIndex={index}>
                            <MusicItem mMusic={music} />
                        </SwiperSlide>
                    ),
                )}
            </Swiper>
        </div>
    );
}

export default HomePage;
