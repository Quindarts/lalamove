import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    favorite: [],
    favoriteDetail: [],
};
export const useFavorite = createSlice({
    name: "favoriteSlice",
    initialState,
    reducers: {
        setAllFavoriteAccount: (
            state: any,
            { payload }: PayloadAction<any>,
        ) => {
            state.favorite = payload;
        },
        setFavoriteDetailAcccount: (
            state: any,
            { payload }: PayloadAction<any>,
        ) => {
            state.favoriteDetail = payload;
        },
    },
});
export const { setAllFavoriteAccount, setFavoriteDetailAcccount } =
    useFavorite.actions;
export default useFavorite.reducer;
