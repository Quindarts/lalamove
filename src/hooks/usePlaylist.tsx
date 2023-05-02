import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAllPlaylistAccount, setPlaylistDetailAcccount } from "../store/usePlaylist.slice";

export default function usePlaylist() {
    const playlist = useSelector((state: RootState) => state.playlist);
    const dispatch = useDispatch();
    const getAllPlaylistAccount = (data: any) => {
        dispatch(setAllPlaylistAccount(data));
    };
    const getPlaylistDetailAccount = (data: any) => {
        dispatch(setPlaylistDetailAcccount(data));
    };
    // const addNewMusicToPlayListAccount  = (data: any) =>{
    const addNewMusicToPlaylistAccount = (data : any)=>{

    }
    // {
    //     "_id": "644f8b2840ed640009857663",
    //     "_id_music": "6438cbb5aa9627ecf49365d3",
    //     "nameList": "Ablum Tháng Năm Quang"
    //   }
    // }
    return { playlist, getAllPlaylistAccount,getPlaylistDetailAccount };
}
