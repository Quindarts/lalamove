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
};

// Define the initial state using that type
const initialState: any = {
    musics: [],
    mplay: [],
};

export const useMusic = createSlice({
    name: "musicSlice",
    // `createSlice` will infer the state type from the `initialState` argument
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
            console.log("payload",state.mplay);
            
        },
    },
});

export const { setMusic, setPlayMusic } = useMusic.actions;

// Other code such as selectors can use the imported `RootState` type

export default useMusic.reducer;
