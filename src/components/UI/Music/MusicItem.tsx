import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import "../../../styles/components/UI/Music/musicItem.css";
import useMusic from "../../../hooks/useMusic";
import { Image } from "antd";
import { MusicItemType } from "../../../types/musicType";
import { Icon } from "@iconify/react";

function MusicItem(props: any) {
    const { playMusic } = useMusic();
    const { mMusic } = props;
    const handlePlayMusic = (mMusic: MusicItemType) => {
        playMusic(mMusic);
    };
    return (
        <div className="music_item " id={mMusic.id}>
            <div className="music_item-image">
                <img
                    width="100%"
                    height="100%"
                    src={`${mMusic.image_music}`}
                    alt=""
                />
                <div className="overlay flex">
                    <button
                        className="flex justify-center"
                        style={{ borderRadius: "50%" }}
                        onClick={() => handlePlayMusic(mMusic)}
                    >
                        <Icon icon="ph:play-fill" />
                    </button>
                </div>
            </div>
            <div className="music_item-content">
                <div className="">
                    <h6 className="font-bold">{mMusic.name_music}</h6>
                    <p className="text-[gray]">{mMusic.name_singer}</p>
                </div>
            </div>
            <div className=" w-full">
                <button
                    className="music_item-btn p-1 "
                    onClick={() => handlePlayMusic(mMusic)}
                >
                    <Icon icon="solar:heart-bold" />
                </button>
            </div>
        </div>
    );
}

export default MusicItem;
