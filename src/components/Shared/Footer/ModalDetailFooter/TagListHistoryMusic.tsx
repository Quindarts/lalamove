import React, { useEffect } from "react";
import useMusic from "../../../../hooks/useMusic";
import { getAllHistoryApi } from "../../../../services/historyApi";
import MusicGridItem from "../../../UI/Music/MusicGridItem";
import "../.../../../../../styles/components/Shared/Footer/ModalDetailFooter/taglisthistorymusic.css";
function TagListHistoryMusic() {
    const { musics, updateMusicHistory } = useMusic();
    useEffect(() => {
        getAllHistoryApi().then((res) => {
            if (res.status === 200) {
                console.log("history", res);
                updateMusicHistory(res.data);
            }
        });
    }, [musics.mplay]);
    
    return (
        <div>
            TagListHistoryMusic
            <div className="list-history">
                {musics?.history?.data?.map((item: any, index: number) =>
                    index < 21 ? (
                        <MusicGridItem music={item.music} key={index} />
                    ) : (
                        <></>
                    ),
                )}
            </div>
        </div>
    );
}

export default TagListHistoryMusic;
