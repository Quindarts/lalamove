import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { CommentDataType } from "types/commentType";

type InitialStateType = {
    listComment: CommentDataType[];
};

const initialState: InitialStateType = {
    listComment: [],
};

export const useComment = createSlice({
    name: "favoriteSlice",
    initialState,
    reducers: {
        setAllCommentByMusic: (
            state: InitialStateType,
            { payload }: PayloadAction<CommentDataType[]>,
        ) => {
            state.listComment = payload;
        },
    },
});

export const { setAllCommentByMusic } = useComment.actions;

export default useComment.reducer;
