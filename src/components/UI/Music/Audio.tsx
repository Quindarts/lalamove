import React, { useRef, useState } from "react";
import "../../../styles/components/UI/Music/audio.css";
import TimeSlider from "react-input-slider";
import {
    PauseOutlined,
    StepBackwardOutlined,
    CaretRightOutlined,
    StepForwardOutlined,
} from "@ant-design/icons";

function Audio(props: any) {
    const { src_music, name_singer, name_music, id } = props;
    const audioRef: any = useRef();
    const [audioIndex, setAudioIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlay, setPlay] = useState(false);

    const handleLoadedData = () => {
        setDuration(audioRef.current.duration);
        if (isPlay) audioRef.current.play();
    };

    const handlePausePlayClick = () => {
        if (isPlay) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
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

    return (
        <div className="Maudio">
            <PauseOutlined />
            <h2 className="Song-Title">{name_music}</h2>
            <p className="Singer">{name_singer}</p>
            <div className="Control-Button-Group">
                <div
                    className="Prev-Button"
                    onClick={() => setAudioIndex(id - 1)}
                >
                    <StepBackwardOutlined />
                </div>
                <div
                    className="Pause-Play-Button"
                    onClick={handlePausePlayClick}
                >
                    {isPlay ? <PauseOutlined /> : <CaretRightOutlined />}
                </div>
                <div
                    className="Next-Button"
                    onClick={() => setAudioIndex(id + 1)}
                >
                    <StepForwardOutlined />
                </div>
            </div>
            <TimeSlider
                axis="x"
                xmax={duration}
                x={currentTime}
                onChange={handleTimeSliderChange}
                styles={{
                    track: {
                        backgroundColor: "#e3e3e3",
                        height: "2px",
                    },
                    active: {
                        backgroundColor: "#333",
                        height: "2px",
                    },
                    thumb: {
                        marginTop: "-3px",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#333",
                        borderRadius: 0,
                    },
                }}
            />
            <audio
                ref={audioRef}
                src={src_music}
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
