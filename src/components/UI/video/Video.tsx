import React, { useEffect, useState } from "react";
import YouTube, { YouTubePlayer, YouTubeProps } from "react-youtube";
let videoElement: YouTubePlayer = null;
function Video(props: any) {
    const { srcMV, isOpenMV } = props;
    const [isPaused, setIsPaused] = useState(false);
    const opts: YouTubeProps["opts"] = {
        height: "98%",
        width: "98%",
        playerVars: {
            autoplay: 0,
        },
    };
    const _onReady = (event: YouTubePlayer) => {
        videoElement = event;
        videoElement.target.pauseVideo();
    };
    useEffect(() => {
        if (videoElement) {
            isPaused
                ? videoElement.target.pauseVideo()
                : videoElement.target.playVideo();
        }
    }, [isPaused, videoElement]);
    useEffect(() => {
        if (videoElement) {
            videoElement.target.pauseVideo();
        }
    }, [isOpenMV]);
    return (
        <div className="w-[90vw] h-[80vh] d-flex justify-center ">
            {
                <YouTube
                    className="h-[98%]"
                    videoId={srcMV}
                    opts={opts}
                    onReady={_onReady}
                />
            }
        </div>
    );
}

export default Video;
