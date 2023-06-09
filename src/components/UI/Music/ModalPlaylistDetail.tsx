import { useState } from "react";
import { Image } from "antd";
import { MehFilled } from "@ant-design/icons";
import usePlaylist from "hooks/usePlaylist";
import { createNewPlayListAccount } from "services/playlistApi";
import { MusicItemType } from "types/musicType";
import Input from "antd/es/input/Input";
import Button from "../Button/Button";

type NotificationType = "success" | "info" | "warning" | "error";

type ModalPlaylistDetailPropsType = {
    messageApi: any;
    handleAddNewMusicToPlaylist: (
        nameList: string,
        _id_music: string,
        _id: string,
    ) => void;
    music: MusicItemType;
    playlist: any;
};

function ModalPlaylistDetail(props: ModalPlaylistDetailPropsType) {
    const { messageApi, handleAddNewMusicToPlaylist, music, playlist } = props;
    const { getAllPlaylistAccount } = usePlaylist();
    const [namePlaylist, setNamePlaylist] = useState("");

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
    
    const handleMusicToPlayList = (nameList: string, _id: string) => {
        let musicToPlaylist = { idMusic: _id, nameList: nameList };

        createNewPlayListAccount(musicToPlaylist).then((res) => {
            if (res.status === 200 || res.status == 204) {
                openNotificationWithIcon(
                    "success",
                    "Danh sách phát",
                    "Tạo Danh sách thành công",
                );
                getAllPlaylistAccount();
            }
        });
    };

    return (
        <>
            <div className="w-[21rem]">
                <h1 className="my-5 font-bold text-[25px] text-white text-center">
                    Danh sách phát của bạn
                </h1>
                {localStorage.getItem("access_token") ? (
                    <div className="">
                        {playlist.playlist?.map((item: any, index: number) => (
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
                        ))}
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
                                    setNamePlaylist(e.target.value);
                                }}
                                placeholder="Tên danh sách mới"
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
                                Tạo mới
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div className="flex justif-center align-middle">
                        <div className="h-[50px] text-center">
                            <h1 className="text-[16px]">
                                Bạn phải đăng nhập để sử dụng chức năng này
                                <MehFilled className="text-[18px] text-yellow-600 my-5 " />
                                !!
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default ModalPlaylistDetail;
