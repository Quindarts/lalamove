import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MusicItemType } from "../types/musicType";
import { TopViewMusicType } from "../types/topViewsType";

export type StateInitialStateMusicType = {
    musics: MusicItemType[];
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
        setListFavorite: (state: any, { payload }: PayloadAction<any>) => {
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
