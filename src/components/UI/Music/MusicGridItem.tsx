import React, { useEffect, useState } from "react";
import "../../../styles/components/UI/Music/musicgriditem.css";
import {
    EyeOutlined,
    HeartOutlined,
    PlusCircleOutlined,
    PlayCircleOutlined,
    PlusOutlined,
    MehFilled,
} from "@ant-design/icons";
import { MusicItemType } from "../../../store/useMusic.slice";
import useMusic from "../../../hooks/useMusic";
import Modal from "../Modal/Modal";
import usePlaylist from "../../../hooks/usePlaylist";
import { Image, Input, message } from "antd";
import Button from "../Button/Button";
import {
    addNewMusicToPlayListAccount,
    createNewPlayListAccount,
    fethAllPlaylistAccount,
} from "../../../services/playlistApi";
function MusicGridItem(props: any) {
    const [messageApi, contextHolder] = message.useMessage();
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const { music } = props;
    const { playMusic } = useMusic();
    const [namePlaylist, setNamePlaylist] = useState("");
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
    const handleMusicToPlayList = (nameList: string, _id: string) => {
        const musicToPlaylist = { idMusic: _id, nameList: nameList };
        createNewPlayListAccount(musicToPlaylist).then((res) => {
            console.log(res);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: "Tạo Playlist  thành công mới",
                });
                fethAllPlaylistAccount().then((res: any) => {
                    getAllPlaylistAccount(res.data.data);
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
        console.log(addmusicdata);

        addNewMusicToPlayListAccount(addmusicdata).then((res) => {
            console.log(res);
            console.log(playlist);
            if (res.status === 200) {
                messageApi.open({
                    type: "success",
                    content: "Thêm thành công bài hát vào Playlist",
                });
                handleClose();
            }
        });
    };
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
                        onClick={() => alert("heart")}
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
                    <h1 className="my-5 font-bold text-[25px] text-white my-2">
                        Playlist của bạn
                    </h1>
                    {playlist ? (
                        <div className="">
                            {playlist.playlist?.map(
                                (item: any, index: number) => (
                                    <div>
                                        <div
                                            onClick={() => {
                                                handleAddNewMusicToPlaylist(
                                                    item.name_list,
                                                    music._id,
                                                    item._id,
                                                );
                                            }}
                                            className="mplaylist flex align-middle"
                                        >
                                            <div className="w-[40px] h-[40px] ">
                                                <Image
                                                    style={{
                                                        borderRadius: "3px",
                                                    }}
                                                    src={`${item.image_list}`}
                                                />
                                            </div>
                                            <h1 className=" font-[600] text-[1rem] pt-2  mr-5 ml-1">
                                                {item.name_list}
                                            </h1>
                                        </div>

                                        <div
                                            style={{
                                                position: "fixed",
                                                bottom: "1rem",
                                                right: "1rem",
                                                left: "1rem",
                                            }}
                                            className="flex"
                                        >
                                            <Input
                                                onChange={(e) => {
                                                    setNamePlaylist(
                                                        e.target.value,
                                                    );
                                                }}
                                                placeholder="Nhập vào tên playlist mới"
                                                className="text-[16px] mr-1"
                                            />

                                            <Button
                                                onClick={() =>
                                                    handleMusicToPlayList(
                                                        namePlaylist,
                                                        music._id,
                                                    )
                                                }
                                                type="submit"
                                                color="yellow"
                                                className="text-black w-[10rem]"
                                            >
                                                New playlist
                                            </Button>
                                        </div>
                                    </div>
                                ),
                            )}
                        </div>
                    ) : (
                        <div className="flex justif-center align-middle">
                            <div className="h-[50px] text-center">
                                <h1 className="text-[16px]">
                                    Bạn phải đăng nhập để sử dụng chức năng
                                    này  
                                    <MehFilled className="text-[18px] text-yellow-600 my-5 " /> !!
                                </h1>
                            </div>
                        </div>
                    )}
                </Modal>
            </div>
        </>
    );
}

export default MusicGridItem;
