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
import ModalDetailFooter from "./ModalDetailFooter/ModalDetailFooter";
import { createHistoryApi } from "../../../services/historyApi";
import PlayMusicAnimation from "../../UI/PlayMusicAnimation/PlayMusicAnimation";
function MFooter() {
    const { musics } = useMusic();
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });

    const handleOpen = (id: string) => {
        setIsOpen({ open: true, id: id });
    };
    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    useEffect(() => {
        createHistoryApi(musics.mplay._id);
    }, [musics.mplay]);
    console.log("mplay:", musics.mplay);

    return (
        <div>
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
                                        {Math.round(musics.mplay.view / 10000)}K
                                        view
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
                        />
                    </div>
                    <div className="icon_control flex-1 flex justify-end">
                        <button
                            onClick={() => handleOpen("playlist")}
                            className=""
                        >
                            <UnorderedListOutlined />
                        </button>
                        <button>
                            <CommentOutlined />
                        </button>
                        <button>
                            <YoutubeOutlined />
                        </button>
                    </div>
                </footer>
            ) : (
                <footer className="flex justify-between"></footer>
            )}
            <Modal
                type="right"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleClose}
            >
                <ModalDetailFooter />
            </Modal>
        </div>
    );
}

export default MFooter;
