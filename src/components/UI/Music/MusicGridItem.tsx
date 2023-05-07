import React, { useEffect, useState } from "react";
import "../../../styles/components/UI/Music/musicgriditem.css";
import {
    EyeOutlined,
    HeartOutlined,
    PlusCircleOutlined,
    PlayCircleOutlined,
} from "@ant-design/icons";
import {
    addNewMusicToPlayListAccount,
    fethAllPlaylistAccount,
} from "../../../services/playlistApi";
import { MusicItemType } from "../../../store/useMusic.slice";
import useMusic from "../../../hooks/useMusic";
import Modal from "../Modal/Modal";
import usePlaylist from "../../../hooks/usePlaylist";
import { message } from "antd";
import { createMuisicToFavoriteList } from "../../../services/favoriteApi";
import ModalPlaylistDetail from "./ModalPlaylistDetail";

function MusicGridItem(props: any) {
    const { music } = props;
    const [messageApi, contextHolder] = message.useMessage();
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const { playMusic } = useMusic();
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });

    const handleOpen = (id: string) => {
        setIsOpen({ open: true, id: id });
    };
    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handlePlayMusic = (music: MusicItemType) => {
        playMusic(music);
    };
    const handleAddMusicToFavorite = (idMusic: string) => {
        createMuisicToFavoriteList({ idMusic: idMusic }).then((res) => {
            console.log(res);

            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content:
                        "Thêm thành công bài hát vào Danh sách bài hát yêu thích",
                });
            }
            else if (res.status === 401) {
                messageApi.open({
                    type: "warning",
                    content:
                        "Bạn phải đăng nhập để thêm bài hát vào danh sạch yêu thích",
                });
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
                messageApi.open({
                    type: "success",
                    content: "Thêm thành công bài hát vào Playlist",
                });
                handleClose();
            }
        });
    };
    useEffect(() => {
        fethAllPlaylistAccount().then((res: any) => {
            getAllPlaylistAccount(res.data.data);
        });
    }, []);
    return (
        <>
            {contextHolder}
            <div className="music_Grid_Item flex">
                <div className="overlay">
                    <button onClick={() => handleOpen("listPlaylist")}>
                        <PlusCircleOutlined className="text-yellow-500" />
                    </button>
                    <button
                        onClick={() => handlePlayMusic(music)}
                        className="text-white text-[40px]"
                    >
                        <PlayCircleOutlined />
                    </button>
                    <button
                        onClick={() => handleAddMusicToFavorite(music._id)}
                        className="text-rose-600"
                    >
                        <HeartOutlined />
                    </button>
                </div>
                <div
                    className="music_Grid_Item-img mr-3"
                    style={{ backgroundImage: `url(${music.image_music})` }}
                ></div>
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
                            <p>{Math.round(music.view / 1000000)}K view</p>
                        </div>
                        <div className="flex">
                            <HeartOutlined className="py-1 pr-1" />

                            <p>
                                {Math.round(music.favorite / 1000000)}M favorite
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
