import { Icon } from "@iconify/react";
import { Image } from "antd";
import React, { useEffect, useState } from "react";
import "../../../styles/components/Shared/Footer/footerMobile.css";
import { color } from "../../../theme/variable";
import Audio from "../../UI/Music/Audio";
import PlayMusicAnimation from "../../UI/PlayMusicAnimation/PlayMusicAnimation";
import {
    EyeOutlined,
    HeartFilled,
    UnorderedListOutlined,
    CommentOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import { createHistoryApi } from "../../../services/historyApi";
import { fetchAllCommentByMusicID } from "../../../services/commentApi";
import useComment from "../../../hooks/useComment";
import useMusic from "../../../hooks/useMusic";
import Modal from "../../UI/Modal/Modal";
import ModalFooterDetailPlaylist from "./ModalDetailFooter/ModalFooterDetailPlaylist";
import Video from "../../UI/video/Video";
import ModalDetailComment from "./ModalDetailFooter/ModalDetailComment";
function FooterMobile() {
    const { musics } = useMusic();
    const [refreshLoadingComment, setRefreshLoadingComment] =
        useState<boolean>(false);
    const [isOpenPlaylist, setIsOpenPlaylist] = useState({
        open: false,
        id: "",
    });
    const [isOpenComment, setIsOpenComment] = useState({ open: false, id: "" });
    const [isOpenMV, setIsOpenMV] = useState({ open: false, id: "" });
    const [isPlay, setPlay] = useState(true);

    //
    const [isOpenControlMusic, setOpenControlMusic] = useState({
        open: false,
        id: "",
    });
    const handleOpenControlMusic = (id: string) => {
        setOpenControlMusic({ open: true, id: id });
    };
    const handleCloseControlMusic = () => {
        setOpenControlMusic({ ...isOpenControlMusic, open: false });
    };

    //
    const handleOpenModalMV = (id: string) => {
        setPlay(false);
        setIsOpenMV({ open: true, id: id });
    };
    const handleCloseModalMV = () => {
        setIsOpenMV({ ...isOpenMV, open: false });
    };
    const handleResfreshLoadingComment = () => {
        setRefreshLoadingComment(!refreshLoadingComment);
    };
    const { comment, getAllCommentByMusicID } = useComment();
    const handleOpenPlaylist = (id: string) => {
        setIsOpenPlaylist({ open: true, id: id });
    };
    const handleOpenComment = (id: string) => {
        setIsOpenComment({ open: true, id: id });
    };
    const handleCloseModalComment = () => {
        setIsOpenComment({ ...isOpenComment, open: false });
    };
    const handleCloseModalPlayList = () => {
        setIsOpenPlaylist({ ...isOpenPlaylist, open: false });
    };
    useEffect(() => {
        fetchAllCommentByMusicID(musics.mplay._id).then((res) => {
            if (res.status === 200 || res.status === 204) {
                getAllCommentByMusicID(res.data.data);
            }
        });
    }, [refreshLoadingComment]);
    useEffect(() => {
        createHistoryApi(musics.mplay._id);
        fetchAllCommentByMusicID(musics.mplay._id).then((res) => {
            if (res.status === 200 || res.status === 204) {
                getAllCommentByMusicID(res.data.data);
            }
        });
    }, [musics.mplay]);

    return (
        <>
            <div className="footer_mobile text-white">
                <button
                    onClick={() => handleOpenControlMusic("control_modal")}
                    className="ctl_footer_mobile"
                >
                    <Icon icon="flat-color-icons:music" />
                </button>
            </div>

            <Modal
                color="black"
                type="control-music"
                id={isOpenControlMusic.id}
                open={isOpenControlMusic.open}
                onClose={handleCloseControlMusic}
            >
                <div
                    className="main_footer_mobile flex flex-col gap-[1rem] my-5 w-[100%]"
                    style={{ alignItems: "center" }}
                >
                    <div className="flex w-[100%] justify-between bg-red">
                        <div className="p-[1rem] flex flex-col">
                            <h6
                                className="font-bold text-[1rem]"
                                style={{ color: color.cancel_btn_cl }}
                            >
                                {musics.mplay.name_music}
                            </h6>
                            <p className="text-white text-[1rem] font-bold">
                                {musics.mplay.name_singer}
                            </p>
                        </div>
                        <div
                            className="justify-end  p-[1rem] flex gap-[1rem] text-[2rem]"
                            style={{ alignSelf: "end" }}
                        >
                            <button
                                onClick={() => handleOpenPlaylist("playlist")}
                            >
                                <UnorderedListOutlined />
                            </button>
                            <button
                                onClick={() => handleOpenComment("comment")}
                            >
                                <CommentOutlined />
                            </button>
                            <button
                                onClick={() => {
                                    handleOpenModalMV("mv");
                                }}
                            >
                                <YoutubeOutlined />
                            </button>
                        </div>
                    </div>

                    <div className="px-[1rem] h-96 w-[100%]">
                        <div
                            className="flex justify-center my-[1rem]"
                            style={{ position: "relative" }}
                        >
                            <Image
                                style={{
                                    borderRadius: "50%",
                                    marginLeft: "1rem",
                                    border: '2px solid var(--cancel_btn_cl)'
                                }}
                                src={`${musics.mplay.image_music}`}
                                width={300} 
                                height={300}
                            />
                        </div>

                        <Audio
                            srcMusic={musics.mplay.src_music}
                            timeFormat={musics.mplay.time_format}
                            isPlay={isPlay}
                            setPlay={setPlay}
                        />
                    </div>
                </div>
            </Modal>
            <Modal
                color="#141414"
                type="left"
                id={isOpenPlaylist.id}
                open={isOpenPlaylist.open}
                className="w-[30rem]"
                onClose={handleCloseModalPlayList}
            >
                <ModalFooterDetailPlaylist />
            </Modal>
            <Modal
                color="#141414"
                type="right"
                id={isOpenComment.id}
                open={isOpenComment.open}
                onClose={handleCloseModalComment}
                className="w-[30rem]"
            >
                <ModalDetailComment
                    idMusic={musics.mplay._id}
                    listComment={comment.listComment}
                    handleResfreshLoadingComment={handleResfreshLoadingComment}
                />
            </Modal>

            <Modal
                color="#000000"
                type="top"
                id={isOpenMV.id}
                open={isOpenMV.open}
                onClose={handleCloseModalMV}
            >
                <Video srcMV={musics.mplay.link_mv} isOpenMV={isOpenMV} />
            </Modal>
        </>
    );
}

export default FooterMobile;
