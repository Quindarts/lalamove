import React, { useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import "../../../styles/components/UI/Music/audio.css";
import { StepBackwardOutlined, StepForwardOutlined } from "@ant-design/icons";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";
function Audio(props: any) {
    const { srcMusic, timeFormat } = props;
    const audioRef: any = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(true);

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        isPlay ? audioRef.current.pause() : audioRef.current.play();
        setPlay(!isPlay);
    };

    const handleTimeSliderChange = ({ x }: any) => {
        audioRef.current.currentTime = x;
        setCurrentTime(x);
        if (!isPlay) {
            setPlay(true);
            audioRef.current.play();
        }
    };

    const handleVolume = () => {
    };
    return (
        <div className="App">
            <div className="Control-Button-Group mb-[10px]">
                <div className="Prev-Button" onClick={() => setAudioIndex(1)}>
                    <StepBackwardOutlined className="text-[1.7rem]" />
                </div>
                <div
                    className="Pause-Play-Button"
                    onClick={handlePausePlayClick}
                >
                    {isPlay ? (
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
            <div className="flex justify-center align-middle gap-3">
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
                            width: "30rem",
                        },
                        active: {
                            backgroundColor: "#09c478",
                            height: "0.2rem",
                        },
                        thumb: {
                            marginTop: "-3px",
                            width: "0.6rem",
                            height: "0.6rem",
                            backgroundColor: "#3EE9A5",
                            borderRadius: "50%",
                        },
                    }}
                />
                <div className="time_current">{timeFormat}</div>
                <div className="text-white flex">
                    <Button onClick={handleVolume}>0.2</Button>
                    <Button>1</Button>
                </div>
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
