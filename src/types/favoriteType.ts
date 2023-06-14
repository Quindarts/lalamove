import { MusicItemType, UserFavoriteMusicType } from "./musicType";
import { ParamsType } from "./playlistType";
export interface AccountFavoriteType {
    image: String;
    role: number;
    createdAt: String;
    _id: String;
    user_name: String;
    id_music: String;
}
export interface MusicFavoriteItemType {
    link_mv: String;
    sum_comment: null;
    view: number;
    favorite: number;
    account_favorite: UserFavoriteMusicType[];
    createdAt: String;
    updatedAt: String;
    _id: String;
    id_account: String;
    name_singer: String;
    slug_name_singer: String;
    src_music: String;
    image_music: String;
    time_format: String;
    seconds: number;
    name_music: String;
    slug_name_music: String;
    category: String;
    slug_category: String;
    subscribe: String;
    slug_subscribe: String;
    slug_alias: String;
}
export interface FavoriteListParamsMusicType {
    pagination: ParamsType;
    data: MusicFavoriteItemType[];
}
export interface MusicFavoriteAccountType {
    createdAt: String;
    updatedAt: String;
    _id: String;
    id_music: String;
    id_account: String;
    music: MusicItemType;
    __v: number;
}
export interface ListMusicFavoriteAccountType {
    panigation: ParamsType;
    data: MusicFavoriteAccountType[];
}

