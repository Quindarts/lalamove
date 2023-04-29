import "../../../styles/components/Shared/footer.css";
import ReactAudioPlayer from "react-audio-player";
import useMusic from "../../../hooks/useMusic";
import { Image } from "antd";
function MFooter() {
    const { musics } = useMusic();
    return (
        <div>
            <footer className="flex justify-between bg-[#f1f3f4] ">
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
                        <h1 className=" font-bold text-[#156e4a] text-[1.2rem]">
                            {" "}
                            {musics.mplay.name_music}
                        </h1>
                        <p>{musics.mplay.name_singer}</p>
                    </div>
                </div>
                <ReactAudioPlayer
                    src={musics.mplay.src_music}
                    autoPlay
                    controls
                />
                <div className="">More options</div>
            </footer>
        </div>
    );
}

export default MFooter;
