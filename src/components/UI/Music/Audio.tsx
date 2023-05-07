import React, { useRef, useState } from "react";
import TimeSlider from "react-input-slider";
import "../../../styles/components/UI/Music/audio.css";
import {
    StepBackwardOutlined,
    CaretRightOutlined,
    PauseOutlined,
    StepForwardOutlined,
} from "@ant-design/icons";
function Audio(props: any) {
    const { src_music } = props;
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

    return (
        <div className="App">
            <div className="Control-Button-Group">
                <div className="Prev-Button" onClick={() => setAudioIndex(1)}>
                    <StepBackwardOutlined />
                </div>
                <div
                    className="Pause-Play-Button"
                    onClick={handlePausePlayClick}
                >
                    {isPlay ? <PauseOutlined /> : <CaretRightOutlined />}
                </div>
                <div className="Next-Button" onClick={() => setAudioIndex(3)}>
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
                        backgroundColor: "#09c478",
                        height: "2px",
                    },
                    thumb: {
                        marginTop: "-3px",
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#09c478",
                        borderRadius: 0,
                    },
                }}
            />
            <audio
                autoPlay
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
