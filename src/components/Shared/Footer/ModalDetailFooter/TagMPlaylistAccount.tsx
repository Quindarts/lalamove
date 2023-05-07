import usePlaylist from "../../../../hooks/usePlaylist";
import MusicGridItem from "../../../UI/Music/MusicGridItem";

function TagMPlaylistAccount() {
    const { playlist } = usePlaylist();
    const { array_music, name_list } = playlist?.playlistDetail;
    return (
        <div>
            <h1 className="text-[16px] font-bold text-white">{name_list}</h1>
            {array_music?.map((item: any, index: number) => (
                <MusicGridItem music={item.music} key={index} />
            ))}
        </div>
    );
}

export default TagMPlaylistAccount;
