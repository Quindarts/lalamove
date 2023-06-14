import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { setAllCommentByMusic } from "../store/useComment.slice";
import { CommentDataType } from "../types/commentType";

export default function useComment() {
    const comment = useSelector((state: RootState) => state.comment);
    const dispatch = useDispatch();
    const getAllCommentByMusicID = (data: CommentDataType[]) => {
        dispatch(setAllCommentByMusic(data));
    };

    return { comment, getAllCommentByMusicID };
}
