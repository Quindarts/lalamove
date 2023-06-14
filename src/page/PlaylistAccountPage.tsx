import { Spin } from "antd";
import { useEffect, useState } from "react";
import Playlist from "../components/UI/Playlist/Playlist";
import usePlaylist from "../hooks/usePlaylist";
import { fethAllPlaylistAccount } from "../services/playlistApi";
import "../styles/pages/playlistaccountpage.css";
import { PlaylistAccountType } from "../types/playlistType";
function PlaylistAccountPage() {
    const { playlist, getAllPlaylistAccount } = usePlaylist();
    const [remove, setRemove] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const handleRemove = () => {
        setRemove(!remove);
    };
    useEffect(() => {
        fethAllPlaylistAccount().then((res: any) => {
            if (res.status === 200 || res.status === 204) {
                setIsLoading(false);
                getAllPlaylistAccount(res.data.data);
                console.log(res.data.data);
                console.log(playlist);
                
            }
        });
    }, []);

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
                    Danh sách của bạn trống
                </h1>
            )}
        </>
    );
}

export default PlaylistAccountPage;
