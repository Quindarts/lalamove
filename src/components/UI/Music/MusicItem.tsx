import { Icon } from "@iconify/react";
import { notification } from "antd";
import useMusic from "hooks/useMusic";
import { createMuisicToFavoriteList } from "services/favoriteApi";
import { MusicItemType } from "types/musicType";
import "styles/components/UI/Music/musicItem.css";

type MusicItemPropType = {
    mMusic: MusicItemType;
};
type NotificationType = "success" | "info" | "warning" | "error";

function MusicItem(props: MusicItemPropType) {
    const { playMusic } = useMusic();
    const { mMusic } = props;
    const [messageApi, contextHolder] = notification.useNotification();
    const handlePlayMusic = (mMusic: MusicItemType) => {
        playMusic(mMusic);
    };
    const openNotificationWithIcon = (
        type: NotificationType,
        message: String,
        des: String,
    ) => {
        messageApi[type]({
            message: message,
            description: des,
        });
    };
    const handleAddMusicToFavorite = (idMusic: string) => {
        createMuisicToFavoriteList({ idMusic: idMusic }).then((res: any) => {
            if (res.status === 200) {
                openNotificationWithIcon(
                    "success",
                    "Yêu thích",
                    "Thêm thành công bài hát vào Danh sách bài hát yêu thích",
                );
            } else if (res.status === 401) {
                openNotificationWithIcon(
                    "warning",
                    "Yêu thích",
                    "Vui lòng đăng nhập để sử dụng tính năng này",
                );
            }
        });
    };
    return (
        <>
            {contextHolder}
            <div className="music_item " id={mMusic._id}>
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
                        onClick={() => handleAddMusicToFavorite(mMusic._id)}
                    >
                        <Icon icon="solar:heart-bold" />
                    </button>
                </div>
            </div>
        </>
    );
}

export default MusicItem;
