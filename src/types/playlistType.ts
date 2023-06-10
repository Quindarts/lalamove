import { MusicItemType } from './musicType';

export interface ParamsType {
    pagination: { _limit: String; _page: String; _total: String };
}
export interface PlaylistAccountType {
    image_list: String;
    createdAt: String;
    updatedAt: String;
    _id: String;
    id_account: String;
    name_list: String;
    __v: number;
}
export interface ListPlaylistAccountType {
    pagination: ParamsType;
    data: PlaylistAccountType[];
}
export interface MusicPlaylistAccountType {
    createdAt: String;
    updatedAt: String;
    _id: String;
    id_account: String;
    id_music: String;
    music: MusicItemType;
    id_list: String;
    __v: 0;
}
export interface ListDetailPlaylistAccountType {
    pagination: ParamsType;
    data: {
        image_list: String;
        array_music: MusicPlaylistAccountType[];
        createdAt: String;
        updatedAt: String;
        _id: String;
        id_account: String;
        name_list: String;
        __v: number;
    };
}
export interface CreatePlaylistAccountType {
    idMusic: String;
    nameList: String;
}
export interface UpdatePlaylistAccountType {
    nameList: String;
    _id: String;
}
export interface AddPlaylistAccountType{
    _id: String,
    _id_music: String,
    nameList: String
}