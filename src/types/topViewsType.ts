import { AccountFavoriteType } from './favoriteType';
export interface TopViewMusicType {
    link_mv: String;
    sum_comment: null;
    view: number;
    favorite: number;
    account_favorite: AccountFavoriteType[];
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
