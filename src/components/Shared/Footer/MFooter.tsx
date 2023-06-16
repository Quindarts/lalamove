import "../../../styles/components/Shared/Footer/footer.css";
import {
    EyeOutlined,
    HeartFilled,
    UnorderedListOutlined,
    CommentOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import useMusic from "../../../hooks/useMusic";
import { Image } from "antd";
import Audio from "../../UI/Music/Audio";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import { createHistoryApi } from "../../../services/historyApi";
import PlayMusicAnimation from "../../UI/PlayMusicAnimation/PlayMusicAnimation";
import { fetchAllCommentByMusicID } from "../../../services/commentApi";
import useComment from "../../../hooks/useComment";
import ModalDetailComment from "./ModalDetailFooter/ModalDetailComment";
import ModalFooterDetailPlaylist from "./ModalDetailFooter/ModalFooterDetailPlaylist";
import Video from "../../UI/video/Video";
function MFooter() {
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
            <div className="footer_desktop">
                {Object.values(musics.mplay).length !== 0 ? (
                    <footer className="flex justify-between">
                        <div className="flex  flex-1">
                            {musics.mplay.image_music ? (
                                <div style={{ position: "relative" }}>
                                    <PlayMusicAnimation />
                                    <Image
                                        style={{
                                            borderRadius: "50%",
                                            marginLeft: "1rem",
                                        }}
                                        src={`${musics.mplay.image_music}`}
                                        width={70}
                                        height={70}
                                    />
                                </div>
                            ) : (
                                <></>
                            )}
                            <div className="mx-[3rem] ">
                                <div>
                                    <h6
                                        className="font-bold text-[1rem]"
                                        style={{ color: "#EB663A" }}
                                    >
                                        {musics.mplay.name_music}
                                    </h6>
                                    <p className="text-[#d4d0d0] text-[14px] font-bold">
                                        {musics.mplay.name_singer}
                                    </p>
                                </div>
                                <div className="flex text-[12px]">
                                    <div className="flex mr-2   text-[gray]">
                                        <EyeOutlined className="py-1 pr-1" />
                                        <p>
                                            {Math.round(
                                                musics.mplay.view / 10000,
                                            )}
                                            K view
                                        </p>
                                    </div>
                                    <div className="flex text-[gray]">
                                        <HeartFilled className="py-1 pr-1" />

                                        <p>
                                            {Math.round(
                                                musics.mplay.favorite / 10000,
                                            )}
                                            M favorite
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=" flex-1">
                            <Audio
                                srcMusic={musics.mplay.src_music}
                                timeFormat={musics.mplay.time_format}
                                isPlay={isPlay}
                                setPlay={setPlay}
                            />
                        </div>
                        <div className="icon_control flex-1 flex justify-end">
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
                    </footer>
                ) : (
                    <footer className="flex justify-between"></footer>
                )}
                <Modal
                    color="#141414"
                    type="right"
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
                        handleResfreshLoadingComment={
                            handleResfreshLoadingComment
                        }
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
            </div>
        </>
    );
}

export default MFooter;
