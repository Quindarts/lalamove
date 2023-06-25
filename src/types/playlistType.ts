import { MusicItemType } from './musicType';

export interface ParamsType {
    pagination: { _limit: string; _page: string; _total: string };
}

export interface PlaylistAccountType {
    image_list: string;
    createdAt: string;
    updatedAt: string;
    _id: string;
    id_account: string;
    name_list: string;
    __v: number;
}

export interface ListPlaylistAccountType {
    pagination: ParamsType;
    data: PlaylistAccountType[];
}

export interface MusicPlaylistAccountType {
    createdAt: string;
    updatedAt: string;
    _id: string;
    id_account: string;
    id_music: string;
    music: MusicItemType;
    id_list: string;
    __v: 0;
}

export interface ListDetailPlaylistAccountType {
    pagination: ParamsType;
    data: {
        image_list: string;
        array_music: MusicPlaylistAccountType[];
        createdAt: string;
        updatedAt: string;
        _id: string;
        id_account: string;
        name_list: string;
        __v: number;
    };
}

export interface CreatePlaylistAccountType {
    idMusic: string;
    nameList: string;
}

export interface UpdatePlaylistAccountType {
    nameList: string;
    _id: string;
}


export interface AddPlaylistAccountType{
    _id: string,
    _id_music: string,
    nameList: string
}