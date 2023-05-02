import React, { useEffect, useState } from "react";
import Playlist from "../components/UI/Playlist/Playlist";
import usePlaylist from "../hooks/usePlaylist";
import { fethAllPlaylistAccount } from "../services/playlistApi";
import "../styles/pages/playlistaccountpage.css";
function PlaylistAccountPage() {
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const [remove, setRemove] = useState(false);
    const handleRemove = () => {
        setRemove(!remove);
    };
    useEffect(() => {
        fethAllPlaylistAccount().then((res: any) => {
            getAllPlaylistAccount(res.data.data);
        });
    }, [remove]);
    return (
        <div className="playlist_accountPage ">
            <h1 className="my-5 font-bold text-[25px] text-white my-2">
                Playlist của bạn
            </h1>
            {playlist.playlist?.map((item: any, index: number) => (
                <Playlist
                    key={index}
                    playlist={item}
                    handleRemove={handleRemove}
                    _id={item._id}
                />
            ))}
        </div>
    );
}

export default PlaylistAccountPage;
