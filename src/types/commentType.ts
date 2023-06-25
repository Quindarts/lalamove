import { ParamsType } from "./playlistType";
import { MusicItemType } from "./musicType";

export interface CommentAccountDataType {
    image: string;
    sum_comment: null;
    sum_list_music: null;
    sum_upload: null;
    updatedAt: string;
    createdAt: string;
    _id: string;
    user_name: string;
    __v: Number;
}

export interface CommentDataType {
    id_reply: null;
    reply: Array<any>;
    edit_content: false;
    createdAt: string;
    updatedAt: string;
    _id: string;
    content: string;
    id_music: string;
    music: MusicItemType;
    id_account: string;
    account: CommentAccountDataType;
    __v: Number;
}

export interface ListCommentByIdMusicDataType {
    pagination: ParamsType;
    data: CommentDataType[];
}
