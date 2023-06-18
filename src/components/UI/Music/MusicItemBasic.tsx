import { Icon } from "@iconify/react";
import { Image, notification } from "antd";
import React, { useEffect, useState } from "react";
import useMusic from "../../../hooks/useMusic";
import usePlaylist from "../../../hooks/usePlaylist";
import { createMuisicToFavoriteList } from "../../../services/favoriteApi";
import {
    addNewMusicToPlayListAccount,
    fethAllPlaylistAccount,
    NewMusicPlaylistAccountType,
} from "../../../services/playlistApi";
import { color } from "../../../theme/variable";
import { MusicItemType } from "../../../types/musicType";
import Modal from "../Modal/Modal";
import ModalPlaylistDetail from "./ModalPlaylistDetail";
import "../../../styles/components/UI/Music/musicItemBasic.css";
type NotificationType = "success" | "info" | "warning" | "error";
type MusicItemBasicPropsType = {
    music: MusicItemType;
};
function MusicItemBasic(props: MusicItemBasicPropsType) {
    const { music } = props;
    const { getAllPlaylistAccount } = usePlaylist();
    const { playMusic } = useMusic();
    const [isOpen, setIsOpen] = useState({ open: false, id: "modalGridItem" });
    const [messageApi, contextHolder] = notification.useNotification();

    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handlePlayMusic = (music: MusicItemType) => {
        playMusic(music);
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
        createMuisicToFavoriteList({ idMusic: idMusic }).then((res) => {
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
            <div className="music_basic_item flex-col my-1">
                <div className="flex-1 w-full">
                    <div className="music_basic_item_img mr-3">
                        <img
                            width="100%"
                            height="100%"
                            src={`${music.image_music}`}
                            alt=""
                        />
                        <div className="overlay">
                            <button
                                className="flex justify-center"
                                style={{ borderRadius: "50%" }}
                                onClick={() => handlePlayMusic(music)}
                            >
                                <Icon icon="ph:play-fill" />
                            </button>

                            <button
                                className="flex justify-center"
                                style={{ borderRadius: "50%" }}
                                onClick={() =>
                                    handleAddMusicToFavorite(music._id)
                                }
                            >
                                <Icon icon="solar:heart-bold" />
                            </button>
                        </div>
                    </div>
                    <div className="flex-1 h-[30px] text-[0.7rem] px-1">
                        <h6
                            className="font-bold"
                            style={{ color: color.cancel_btn_cl }}
                        >
                            {music.name_music}
                        </h6>
                        <p
                            className="font-[500]"
                            style={{ color: color.text_grey_cl }}
                        >
                            {music.name_singer}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MusicItemBasic;
