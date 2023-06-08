import { EyeOutlined, HeartFilled } from "@ant-design/icons";
import "../../../styles/components/UI/Music/musicItem.css";
import useMusic from "../../../hooks/useMusic";
import { MusicItemType } from "../../../store/useMusic.slice";
import { Image } from "antd";

function MusicItem(props: any) {
    const { playMusic } = useMusic();
    const { mMusic } = props;
    const handlePlayMusic = (mMusic: MusicItemType) => {
        playMusic(mMusic);
    };
    return (
        <div
            className="music_item "
            id={mMusic.id}
            onClick={() => handlePlayMusic(mMusic)}
        >
            <div
                className="music_item-image"
            >
                <Image
                    width={250}
                    height={250}
                    src={`${mMusic.image_music}`}
                    alt=""

                />
            </div>
            <div className="music_item-content text-center">
                <div className="">
                    <h6 className="font-bold" style={{ color: "#09c478" }}>
                        {mMusic.name_music}
                    </h6>
                    <p className="text-[gray]">{mMusic.name_singer}</p>
                </div>
                <div className="text-[gray] text-center flex justify-center">
                    <div className="flex justify-center ">
                        <EyeOutlined className="p-1" />
                        <p>{Math.round(mMusic.view / 1000000)}view</p>
                    </div>
                    <div className="flex justify-center ">
                        <HeartFilled className="p-1" />
                        <p>{Math.round(mMusic.favorite / 1000000)}M favorite</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MusicItem;
