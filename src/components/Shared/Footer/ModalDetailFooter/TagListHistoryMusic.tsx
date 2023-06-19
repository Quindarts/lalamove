import { useEffect } from "react";
import useMusic from "hooks/useMusic";
import { getAllHistoryApi } from "services/historyApi";
import MusicItemBasic from "../../../UI/Music/MusicItemBasic";
import "styles/components/Shared/Footer/ModalDetailFooter/taglisthistorymusic.css";
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
            <div className="w-[25rem] px-[1rem] list-history flex flex-wrap gap-[1rem] justify-between">
                {musics?.history?.data?.map(
                    (item: any, index: number) =>
                        index < 15 && (
                            <MusicItemBasic music={item.music} key={index} />
                        ),
                )}
            </div>
        </>
    );
}

export default TagListHistoryMusic;
