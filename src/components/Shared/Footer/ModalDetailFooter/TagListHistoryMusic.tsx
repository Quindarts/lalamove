import { useEffect } from "react";
import useMusic from "../../../../hooks/useMusic";
import { getAllHistoryApi } from "../../../../services/historyApi";
import MusicGridItem from "../../../UI/Music/MusicGridItem";
import "../.../../../../../styles/components/Shared/Footer/ModalDetailFooter/taglisthistorymusic.css";
function TagListHistoryMusic() {
    const { musics, updateMusicHistory } = useMusic();
    useEffect(() => {
        getAllHistoryApi().then((res) => {
            if (res.status === 200 || res.status === 204) {
                updateMusicHistory(res.data);
            }
        });
    }, [musics.mplay]);
    return (
        <>
            <div className="w-[25rem] list-history">
                {musics?.history?.data?.map((item: any, index: number) =>
                    index < 21 ? (
                        <MusicGridItem music={item.music} key={index} />
                    ) : (
                        <></>
                    ),
                )}
            </div>
        </>
    );
}

export default TagListHistoryMusic;
