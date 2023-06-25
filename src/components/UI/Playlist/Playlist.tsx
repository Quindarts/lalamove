import { useState } from "react";
import { Image, message, Spin } from "antd";
import { CaretRightOutlined, DeleteOutlined } from "@ant-design/icons";
import usePlaylist from "hooks/usePlaylist";
import {
    fetchAllPlaylistDetailAccount,
    removePlaylistAccount,
} from "services/playlistApi";
import { PlaylistAccountType } from "types/playlistType";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";
import ModalFooterDetailPlaylist from "components/Shared/Footer/ModalDetailFooter/ModalFooterDetailPlaylist";
import "styles/components/UI/Playlist/playlistaccount.css";

type PlaylistPropsType = {
    playlist: PlaylistAccountType;
    handleRemove: any;
    _id: string;
};

function Playlist(props: PlaylistPropsType) {
    const [messageApi, contextHolder] = message.useMessage();
    const { playlist, handleRemove, _id } = props;
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { getPlaylistDetailAccount } = usePlaylist();
    const handleOpen = () => {
        setIsOpen(true);
        setLoading(false);
    };
    const handleClose = () => {
        setIsOpen(!isOpen);
    };
    const handelRemovePlaylist = () => {
        removePlaylistAccount(playlist._id).then(() => {
            handleRemove(true);
            messageApi.open({
                type: "success",
                content: "Xóa thành công Playlist",
            });
        });
    };
    const handelStartPlaylist = () => {
        setLoading(true);
        fetchAllPlaylistDetailAccount(_id).then((res) => {
            getPlaylistDetailAccount(res.data.data);
            handleOpen();
        });
    };

    return (
        <>
            {contextHolder}
            {loading && (
                <div
                    style={{
                        position: "fixed",
                        top: "50%",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 9999,
                        backgroundColor: " rgba(92, 92, 92, 0.8);",
                    }}
                >
                    <Spin className="w-full h-full " size="large" />
                </div>
            )}
            <div className="playlistAccount flex my-5 w-full text-[gray] justify-between">
                <div className="flex">
                    <div className="w-[40px] h-[40px] mx-2  ">
                        <Image
                            style={{ borderRadius: "3px" }}
                            src={`${playlist.image_list}`}
                        />
                    </div>
                    <h1 className=" font-[600] text-[1.3rem]">
                        {playlist.name_list}
                    </h1>
                </div>
                <div className="flex control_playlist">
                    <Button
                        onClick={handelStartPlaylist}
                        color="pink"
                        className="mx-2"
                    >
                        <CaretRightOutlined /> Phát danh sach
                    </Button>
                    <Button color="yellow">Đổi tên</Button>
                    <Button
                        color="red"
                        onClick={handelRemovePlaylist}
                        className="mx-2"
                    >
                        <DeleteOutlined />
                    </Button>
                </div>
            </div>
            <Modal
                type="right"
                id="playlist"
                open={isOpen}
                onClose={handleClose}
            >
                <ModalFooterDetailPlaylist />
            </Modal>
        </>
    );
}

export default Playlist;
