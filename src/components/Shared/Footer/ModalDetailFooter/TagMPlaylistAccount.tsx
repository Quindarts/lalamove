import usePlaylist from "../../../../hooks/usePlaylist";
import MusicGridItem from "../../../UI/Music/MusicGridItem";

function TagMPlaylistAccount() {
    const { playlist } = usePlaylist();
    const { array_music, name_list } = playlist?.playlistDetail;
    return (
        <div>
            <h1 className="text-[16px] font-bold text-white px-2 pt-3 pb-5">Danh sách phát {name_list} :</h1>
            {array_music?.map((item: any, index: number) => (
                <MusicGridItem music={item.music} key={index} />
            ))}
        </div>
    );
}

export default TagMPlaylistAccount;
