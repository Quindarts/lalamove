import "../../../styles/components/Shared/Footer/footer.css";
import { EyeOutlined, HeartFilled, MenuFoldOutlined } from "@ant-design/icons";
import useMusic from "../../../hooks/useMusic";
import { Image } from "antd";
import Audio from "../../UI/Music/Audio";
import { useEffect, useState } from "react";
import Modal from "../../UI/Modal/Modal";
import ModalDetailFooter from "./ModalDetailFooter/ModalDetailFooter";
import { createHistoryApi } from "../../../services/historyApi";
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
        createHistoryApi(musics.mplay._id).then((res) => {
            console.log(res);
        });
    }, [musics.mplay]);

    return (
        <div>
            <footer className="flex justify-between">
                <div className="flex">
                    {musics.mplay.image_music ? (
                        <Image
                            src={`${musics.mplay.image_music}`}
                            width={50}
                            height={50}
                        />
                    ) : (
                        <></>
                    )}
                    <div className="mx-2">
                        <div>
                            <h6
                                className="font-bold text-[14px]"
                                style={{ color: "#09c478" }}
                            >
                                {musics.mplay.name_music}
                            </h6>
                            <p className="text-[gray] text-[12px] font-bold">
                                {musics.mplay.name_singer}
                            </p>
                        </div>
                        <div className="flex text-[12px]">
                            <div className="flex mr-2   text-[gray]">
                                <EyeOutlined className="py-1 pr-1" />
                                <p>
                                    {Math.round(musics.mplay.view / 1000000)}K
                                    view
                                </p>
                            </div>
                            <div className="flex text-[gray]">
                                <HeartFilled className="py-1 pr-1" />

                                <p>
                                    {Math.round(
                                        musics.mplay.favorite / 1000000,
                                    )}
                                    M favorite
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <Audio src_music={musics.mplay.src_music} />
                <button
                    onClick={() => handleOpen("playlist")}
                    className="text-white p-2 text-[20px]"
                >
                    <MenuFoldOutlined />
                </button>
            </footer>
            <Modal
                type="right"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleClose}
            >
                <ModalDetailFooter open={isOpen.open} />
            </Modal>
        </div>
    );
}

export default MFooter;
