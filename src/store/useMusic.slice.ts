import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MusicItemType } from "../types/musicType";
import { TopViewMusicType } from "../types/topViewsType";

export type StateInitialStateMusicType = {
    musics: MusicItemType[];
    mplay: any;
    search: any;
    history: any;
    listNews: MusicItemType[];
    listTopView: MusicItemType[];
    listFavorite: MusicItemType[];
};

const initialState: StateInitialStateMusicType = {
    musics: [],
    mplay: {},
    search: [],
    history: [],
    listNews: [],
    listTopView: [],
    listFavorite: [],
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
        searchByQuery: (
            state: StateInitialStateMusicType,
            { payload }: PayloadAction<MusicItemType[]>,
        ) => {
            state.search = payload;
        },
        updateHistory: (
            state: StateInitialStateMusicType,
            { payload }: PayloadAction<MusicItemType[]>,
        ) => {
            state.history = payload;
        },
        setListNews: (state: StateInitialStateMusicType, { payload }: PayloadAction<MusicItemType[]>) => {
            state.listNews = payload;
        },
        setListTopView: (state: StateInitialStateMusicType, { payload }: PayloadAction<MusicItemType[]>) => {
            state.listTopView = payload;
        },
        setListFavorite: (state: StateInitialStateMusicType, { payload }: PayloadAction<MusicItemType[]>) => {
            state.listFavorite = payload;
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
    setListFavorite,
} = useMusic.actions;

export default useMusic.reducer;
