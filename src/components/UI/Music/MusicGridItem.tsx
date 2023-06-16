import React, { useEffect, useState } from "react";
import "../../../styles/components/UI/Music/musicgriditem.css";
import {
    EyeOutlined,
    HeartOutlined,
    PlusOutlined,
    CaretRightOutlined,
} from "@ant-design/icons";
import {
    addNewMusicToPlayListAccount,
    fethAllPlaylistAccount,
    NewMusicPlaylistAccountType,
} from "../../../services/playlistApi";
import useMusic from "../../../hooks/useMusic";
import Modal from "../Modal/Modal";
import usePlaylist from "../../../hooks/usePlaylist";
import { Image } from "antd";
import { createMuisicToFavoriteList } from "../../../services/favoriteApi";
import ModalPlaylistDetail from "./ModalPlaylistDetail";
import { notification } from "antd";
import { MusicItemType } from "../../../types/musicType";
import { Icon } from "@iconify/react";
import { color } from "../../../theme/variable";
type NotificationType = "success" | "info" | "warning" | "error";
function MusicGridItem(props: any) {
    const { music } = props;
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const { playMusic } = useMusic();
    const [isOpen, setIsOpen] = useState({ open: false, id: "modalGridItem" });
    const [messageApi, contextHolder] = notification.useNotification();

    const handleOpenPlaylist = (id: string) => {
        setIsOpen({ open: true, id: id });
    };
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
    const handleAddNewMusicToPlaylist = (
        nameList: string,
        _id_music: string,
        _id: string,
    ) => {
        const addmusicdata: NewMusicPlaylistAccountType = {
            _id: _id,
            _id_music: _id_music,
            nameList: nameList,
        };

        addNewMusicToPlayListAccount(addmusicdata).then((res) => {
            if (res.status === 200) {
                openNotificationWithIcon(
                    "success",
                    "Danh sách phát",
                    "Thêm thành công bài hát vào danh sách phát " +
                        addmusicdata.nameList,
                );
                handleClose();
            }
        });
    };
    useEffect(() => {
        fethAllPlaylistAccount().then((res: any) => {
            getAllPlaylistAccount(res.data.data);
        });
    }, [isOpen.open]);
    return (
        <>
            {contextHolder}
            <div className="music_Grid_Item flex gap-[1rem]  my-1">
                <div className="flex-1">
                    <div className="flex">
                        <div className="music_Grid_Item-img mr-3">
                            <Image
                                width="100%"
                                height="100%"
                                src={`${music.image_music}`}
                                alt=""
                            />
                        </div>
                        <div className="">
                            <h6
                                className="font-bold text-[18px]"
                                style={{ color: color.cancel_btn_cl }}
                            >
                                {music.name_music}
                            </h6>
                            <p
                                className="font-[600]"
                                style={{ color: color.text_grey_cl }}
                            >
                                {music.name_singer}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex-1 music_Grid_Item-content gap-[3rem]">
                    <div className="text-[1rem]">{music.time_format}</div>

                    <div className="flex mr-2   ">
                        <p>{Math.round(music.view / 10000)}K</p>
                        <EyeOutlined className=" pt-[6px] ml-1" />
                    </div>
                    <div className="flex">
                        <p>{Math.round(music.favorite / 10000)}M </p>
                        <HeartOutlined
                            className="pt-[6px] ml-1 "
                            style={{ color: color.cancel_btn_cl }}
                        />
                    </div>
                </div>
                <div className="flex-1 flex justify-around">
                    <button onClick={() => handleOpenPlaylist("listPlaylist")}>
                        <Icon icon="subway:add-playlist" />
                    </button>
                    <button onClick={() => handlePlayMusic(music)}>
                        <Icon icon="fluent:music-note-2-play-20-filled" />
                    </button>
                    <button onClick={() => handleAddMusicToFavorite(music._id)}>
                        <Icon icon="solar:heart-bold" />
                    </button>
                </div>
                {/* </div> */}
            </div>
            <Modal
                type="top"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleClose}
            >
                <ModalPlaylistDetail
                    playlist={playlist}
                    messageApi={messageApi}
                    music={music}
                    handleAddNewMusicToPlaylist={handleAddNewMusicToPlaylist}
                />
            </Modal>
        </>
    );
}

export default MusicGridItem;
