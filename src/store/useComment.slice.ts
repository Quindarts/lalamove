import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
const initialState: any = {
    listComment: [],
};
export const useComment = createSlice({
    name: "favoriteSlice",
    initialState,
    reducers: {
        setAllCommentByMusic: (state: any, { payload }: PayloadAction<any>) => {
            state.listComment = payload;
        },
    },
});
export const { setAllCommentByMusic } = useComment.actions;
export default useComment.reducer;
