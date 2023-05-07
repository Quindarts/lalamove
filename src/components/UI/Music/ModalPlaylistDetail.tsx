import { Image } from "antd";
import Input from "antd/es/input/Input";
import React, { useState } from "react";
import {
    createNewPlayListAccount,
    fethAllPlaylistAccount,
} from "../../../services/playlistApi";
import Button from "../Button/Button";
import { MehFilled } from "@ant-design/icons";
import usePlaylist from "../../../hooks/usePlaylist";
function ModalPlaylistDetail(props: any) {
    const { getAllPlaylistAccount } = usePlaylist();
    const { messageApi, handleAddNewMusicToPlaylist, music,playlist } = props;
    const [namePlaylist, setNamePlaylist] = useState("");
    const handleMusicToPlayList = (nameList: string, _id: string) => {
        const musicToPlaylist = { idMusic: _id, nameList: nameList };
        createNewPlayListAccount(musicToPlaylist).then((res) => {
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
    return (
        <div>
            <h1 className="my-5 font-bold text-[25px] text-white my-2">
                Playlist của bạn
            </h1>
            {localStorage.getItem("access_token") ? (
                <div className="">
                    {playlist.playlist?.map((item: any, index: number) => (
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
                                        setNamePlaylist(e.target.value);
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
                    ))}
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
    );
}

export default ModalPlaylistDetail;
