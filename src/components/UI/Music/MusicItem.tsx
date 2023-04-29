import React from "react";
import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import "../../../styles/components/UI/Music/musicItem.css";
import Audio from "./Audio";
import useMusic from "../../../hooks/useMusic";
import { MusicItemType } from "../../../store/useMusic.slice";
function MusicItem(props: any) {
    const { musics,playMusic } = useMusic();
    const handlePlayMusic = (mMusic: MusicItemType) => {
        playMusic(mMusic);
    };
    console.log(musics.mplay);
    
    const { mMusic } = props;
    return (
        <button
            className="music_item"
            id={mMusic.id}
            onClick={() => handlePlayMusic(mMusic)}
        >
            <div
                className="music_item-image"
                style={{ backgroundImage: `url(${mMusic.image_music})` }}
            ></div>
            <div className="music_item-content">
                <div className="">
                    <h6 className="font-bold" style={{ color: "#09c478" }}>
                        {mMusic.name_music}
                    </h6>
                    <p>{mMusic.name_singer}</p>
                </div>
                <div className="">
                    <div className="flex">
                        <EyeOutlined />
                        <p>{mMusic.view}view</p>
                    </div>
                    <div className="flex">
                        <HeartFilled />
                        <p>{mMusic.favorite}M favorite</p>
                    </div>
                </div>
            </div>
        </button>
    );
}

export default MusicItem;
