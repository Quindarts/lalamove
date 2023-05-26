import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

// Define a type for the slice state
export type MusicItemType = {
    link_mv: string;
    sum_comment: null;
    view: number;
    favorite: number;
    account_favorite: [];
    createdAt: Date;
    updatedAt: Date;
    _id: string;
    id_account: string;
    name_singer: string;
    slug_name_singer: string;
    src_music: string;
    image_music: string;
    time_format: string;
    seconds: number;
    name_music: string;
    slug_name_music: string;
    category: string;
    slug_category: string;
    subscribe: string;
    slug_subscribe: string;
};
type MusicState = {
    musics: MusicItemType[];
    mplay: MusicItemType;
    search: MusicItemType[];
};

const initialState: any = {
    musics: [],
    mplay: {},
    search: [],
    history: [],
};

export const useMusic = createSlice({
    name: "musicSlice",
    initialState,
    reducers: {
        setMusic: (state: any, { payload }: PayloadAction<MusicItemType[]>) => {
            state.musics = payload;
        },
        setPlayMusic: (
            state: any,
            { payload }: PayloadAction<MusicItemType>,
        ) => {
            state.mplay = payload;
            console.log("mlplay:", payload);
        },
        searchByQuery: (state: any, { payload }: PayloadAction<any>) => {
            state.search = payload;
            console.log("search:", state.mplay);
        },
        updateHistory: (state: any, { payload }: PayloadAction<any>) => {
            state.history = payload;
            console.log("store: ", state.history);
        },
    },
});

export const { setMusic, setPlayMusic, searchByQuery, updateHistory } =
    useMusic.actions;

export default useMusic.reducer;
