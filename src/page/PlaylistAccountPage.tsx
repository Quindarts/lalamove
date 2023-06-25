import { useEffect, useState } from "react";
import usePlaylist from "hooks/usePlaylist";
import { PlaylistAccountType } from "types/playlistType";
import Playlist from "components/UI/Playlist/Playlist";
import "styles/pages/playlistaccountpage.css";
function PlaylistAccountPage() {
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const [remove, setRemove] = useState(false);
    const handleRemove = () => {
        setRemove(!remove);
    };
    useEffect(() => {
        getAllPlaylistAccount();
    }, [remove]);

    return (
        <>
            {playlist?.playlist ? (
                <div className="playlist_accountPage ">
                    <h1 className="my-5 font-bold text-[25px] text-white ">
                        Danh sách của bạn
                    </h1>
                    {playlist?.playlist?.map(
                        (item: PlaylistAccountType, index: number) => (
                            <Playlist
                                key={index}
                                playlist={item}
                                handleRemove={handleRemove}
                                _id={item._id}
                            />
                        ),
                    )}
                </div>
            ) : (
                <h1 className="my-5 font-bold text-[25px] text-white text-center">
                    Danh sách phát của bạn trống
                </h1>
            )}
        </>
    );
}

export default PlaylistAccountPage;
