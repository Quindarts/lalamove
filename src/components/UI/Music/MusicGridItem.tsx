import React from "react";
import "../../../styles/components/UI/Music/musicgriditem.css";
import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import { MusicItemType } from "../../../store/useMusic.slice";
import useMusic from "../../../hooks/useMusic";
function MusicGridItem(props: any) {
    const { music } = props;
    const { playMusic } = useMusic();
    const handlePlayMusic = (music: MusicItemType) => {
        playMusic(music);
    };
    console.log("props", music);

    return (
        <button
            className="music_Grid_Item flex"
            onClick={() => handlePlayMusic(music)}
        >
            <div
                className="music_Grid_Item-img mr-3"
                style={{ backgroundImage: `url(${music.image_music})` }}
            >
                s
            </div>
            <div className="music_Grid_Item-content">
                <div className="">
                    <h6 className="font-bold" style={{ color: "#09c478" }}>
                        {music.name_music}
                    </h6>
                    <p>{music.name_singer}</p>
                </div>
                <div className="flex">
                    <div className="flex mr-2   ">
                        <EyeOutlined className="py-1 pr-1" />
                        <p>
                            {Math.round(music.view / 1000000)}K
                            view
                        </p>
                    </div>
                    <div className="flex">
                        <HeartFilled className="py-1 pr-1" />

                        <p>{Math.round(music.favorite / 1000000)}M favorite</p>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default MusicGridItem;
