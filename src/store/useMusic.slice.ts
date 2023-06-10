import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import { MusicItemType } from "../types/musicType";
import { TopViewMusicType } from "../types/topViewsType";

export type StateInitialStateMusicType = {
    musics: MusicItemType[];
    mplay: Object;
    search: [];
    history: [];
    listNews: [];
    listTopView: TopViewMusicType;
};

const initialState: any = {
    musics: [],
    mplay: {},
    search: [],
    history: [],
    listNews: [],
    listTopView: [],
};

export const useMusic = createSlice({
    name: "musicSlice",
    initialState,
    reducers: {
        setMusic: (
            state: StateInitialStateMusicType,
            { payload }: PayloadAction<MusicItemType[]>,
        ) => {
            state.musics = payload;
        },
        setPlayMusic: (
            state: any,
            { payload }: PayloadAction<MusicItemType>,
        ) => {
            state.mplay = payload;
        },
        searchByQuery: (state: any, { payload }: PayloadAction<any>) => {
            state.search = payload;
        },
        updateHistory: (state: any, { payload }: PayloadAction<any>) => {
            state.history = payload;
        },
        setListNews: (state: any, { payload }: PayloadAction<any>) => {
            state.listNews = payload;
        },
        setListTopView: (state: any, { payload }: PayloadAction<any>) => {
            state.listTopView = payload;
        },
    },
});

export const {
    setMusic,
    setPlayMusic,
    searchByQuery,
    updateHistory,
    setListTopView,
    setListNews,
} = useMusic.actions;

export default useMusic.reducer;
