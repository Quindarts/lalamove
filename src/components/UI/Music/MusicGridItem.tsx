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
} from "../../../services/playlistApi";
import useMusic from "../../../hooks/useMusic";
import Modal from "../Modal/Modal";
import usePlaylist from "../../../hooks/usePlaylist";
import { Image } from "antd";
import { createMuisicToFavoriteList } from "../../../services/favoriteApi";
import ModalPlaylistDetail from "./ModalPlaylistDetail";
import { notification } from "antd";
import { Icon } from "@iconify/react";
import { MusicItemType } from "../../../types/musicType";
type NotificationType = "success" | "info" | "warning" | "error";
function MusicGridItem(props: any) {
    const { music } = props;
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const { playMusic } = useMusic();
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
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
        const addmusicdata = {
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
            <div className="music_Grid_Item flex">
                <div className="overlay">
                    <button onClick={() => handleOpenPlaylist("listPlaylist")}>
                        <PlusOutlined className="text-white text-[40px]" />
                    </button>
                    <button
                        onClick={() => handlePlayMusic(music)}
                        className="text-white text-[40px]"
                    >
                        <CaretRightOutlined />
                    </button>
                    <button
                        onClick={() => handleAddMusicToFavorite(music._id)}
                        className="text-rose-600 text-[40px]"
                    >
                        <HeartOutlined />
                    </button>
                </div>
                <div className="music_Grid_Item-img mr-3">
                    <Image
                        width={70}
                        height={70}
                        src={`${music.image_music}`}
                        alt=""
                    />
                </div>
                <div className="music_Grid_Item-content">
                    <div className="flex justify-between align-middle w-[300px]">
                        <div className="">
                            <h6
                                className="font-bold"
                                style={{ color: "#09c478" }}
                            >
                                {music.name_music}
                            </h6>
                            <p
                                className="font-[600]"
                                style={{ color: "#908d8d" }}
                            >
                                {music.name_singer}
                            </p>
                        </div>
                        <div className="text-[#a7a4a4] text-[1rem] ">{music.time_format}</div>
                    </div>
                    <div className="flex">
                        <div className="flex mr-2   ">
                            <EyeOutlined className=" py-1 pr-1" />
                            <p>{Math.round(music.view / 10000)}K view</p>
                        </div>
                        <div className="flex">
                            <HeartOutlined className="py-1 pr-1 " />
                            <p>
                                {Math.round(music.favorite / 10000)}M favorite
                            </p>
                        </div>
                    </div>
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
                        handleAddNewMusicToPlaylist={
                            handleAddNewMusicToPlaylist
                        }
                    />
                </Modal>
            </div>
        </>
    );
}

export default MusicGridItem;
