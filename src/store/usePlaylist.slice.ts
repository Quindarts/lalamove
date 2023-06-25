import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PlaylistDetailType = {
    pagination: {
        _limit: number;
        _page: number;
        _total: number;
    };
    data: {
        image_list: string;
        array_music: [];
        createdAt: Date;
        updatedAt: Date;
        _id: string;
        id_account: string;
        name_list: string;
        __v: number;
    };
};

export type AllPlaylistAccountType = {
    pagination: {
        _limit: number;
        _page: number;
        _total: number;
    };
    data: [];
};

const initialState: any = {
    playlist: [],
    createPlaylist: [],
    playlistDetail: [],
};

export const usePlaylist = createSlice({
    name: "playlistSlice",
    initialState,
    reducers: {
        setAllPlaylistAccount: (
            state: any,
            { payload }: PayloadAction<any>,
        ) => {
            state.playlist = payload;
        },
        setPlaylistDetailAcccount: (
            state: any,
            { payload }: PayloadAction<any>,
        ) => {
            state.playlistDetail = payload;
        },
    },
});
export const { setAllPlaylistAccount, setPlaylistDetailAcccount } = usePlaylist.actions;
export default usePlaylist.reducer;
