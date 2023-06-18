import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import "../../../styles/components/UI/Music/audio.css";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import { color } from "../../../theme/variable";
type AudioPropsType = {
    srcMusic: string;
    timeFormat: string;
    isPlay: SetStateAction<boolean>;
    setPlay: Dispatch<SetStateAction<boolean>>;
};
function Audio(props: AudioPropsType) {
    const { srcMusic, timeFormat, isPlay, setPlay } = props;
    const audioRef: any = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        isPlay ? audioRef.current.pause() : audioRef.current.play();
        setPlay(!isPlay);
    };
    useEffect(() => {
        isPlay === false ? audioRef.current.pause() : audioRef.current.play();
    }, [isPlay]);
    const handleTimeSliderChange = ({ x }: any) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);
        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };
    useEffect(() => {
        setPlay(true);
    }, [srcMusic]);
    console.log("abc:", srcMusic);

    return (
        <div className="App w-[100%]">
            <div className="Control-Button-Group mb-[10px]">
                <div className="Prev-Button" onClick={() => setAudioIndex(1)}>
                    <StepBackwardOutlined className="text-[1.7rem]" />
                </div>
                <div
                    className="Pause-Play-Button"
                    onClick={handlePausePlayClick}
                >
                    {isPlay === true ? (
                        <Icon
                            className="text-[1.7rem]"
                            icon="zondicons:pause-outline"
                        />
                    ) : (
                        <Icon
                            className="text-[1.7rem]"
                            icon="octicon:play-16"
                        />
                    )}
                </div>

                <div className="Next-Button" onClick={() => setAudioIndex(3)}>
                    <StepForwardOutlined className="text-[1.7rem]" />
                </div>
            </div>
            <div
                className="flex justify-center gap-3"
                style={{ alignItems: "center" }}
            >
                <div className="time_current">
                    0{Math.floor(currentTime / 60)} :{" "}
                    {Math.floor(currentTime % 60)}
                </div>
                <TimeSlider
                    axis="x"
                    xmax={duration}
                    x={currentTime}
                    onChange={handleTimeSliderChange}
                    styles={{
                        track: {
                            backgroundColor: "#787777",
                            height: "0.2rem",
                            width: "100%",
                        },
                        active: {
                            backgroundColor: color.cancel_btn_cl,
                            height: "0.2rem",
                        },
                        thumb: {
                            marginTop: "-3px",
                            width: "0.6rem",
                            height: "0.6rem",
                            backgroundColor: color.cancel_btn_cl,
                            borderRadius: "50%",
                        },
                    }}
                />
                <div className="time_current">{timeFormat}</div>
            </div>
            <audio
                autoPlay
                ref={audioRef}
                src={srcMusic}
                id="audio_play"
                onLoadedData={handleLoadedData}
                onTimeUpdate={() =>
                    setCurrentTime(audioRef.current.currentTime)
                }
                onEnded={() => setPlay(false)}
            />
        </div>
    );
}

export default Audio;
