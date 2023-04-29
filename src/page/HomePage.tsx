import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import MusicGridItem from "../components/UI/Music/MusicGridItem";
import { getAllTopViewbyParams } from "../services/topViewApi";
import sl1 from "../assets/image/sl1.jpg";
import sl2 from "../assets/image/sl2.jpg";
import sl3 from "../assets/image/sl3.jpg";
import sl4 from "../assets/image/sl4.jpg";
import "../styles/pages/homepage.css";
import { Virtual } from "swiper";
import { Image } from "antd";
function HomePage() {
    const listSlide = [sl1, sl2, sl3, sl4];
    const [listView, setlistView] = useState({ data: [], panigation: {} });
    useEffect(() => {
        getAllTopViewbyParams(12, 1, "million")
            .then((res: any) => {
                if (res.status === 200) {
                    setlistView(res.data);
                }
                if (res.status === 400) {
                    console.log(res);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    console.log(listView?.data);

    return (
        <div className="homePage">
            <h1 className="my-1 font-bold text-[25px]">HOT</h1>
            <Swiper
                modules={[Virtual]}
                spaceBetween={10}
                slidesPerView={3}
                virtual
                className="homeSlide-top my-3"
            >
                {listSlide.map((slideContent, index) => (
                    <SwiperSlide key={slideContent} virtualIndex={index}>
                        <Image src={`${slideContent}`} />
                    </SwiperSlide>
                ))}
            </Swiper>
            <h1 className="my-1 font-bold text-[25px]">Top View</h1>
            <div className="top_views_slide flex flex-wrap gap-2">
                {listView?.data.map((music, index) => (
                    <MusicGridItem key={index} music={music} />
                ))}
            </div>

        </div>
    );
}

export default HomePage;
