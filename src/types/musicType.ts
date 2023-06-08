export interface FavoriteMusicType {}
export interface MusicItemType {
    link_mv?: string;
    sum_comment?: null;
    view?: number;
    favorite?: number;
    account_favorite?: [];
    createdAt?: Date;
    updatedAt?: Date;
    _id?: string;
    id_account?: string;
    name_singer?: string;
    slug_name_singer?: string;
    src_music?: string;
    image_music?: string;
    time_format?: string;
    seconds?: number;
    name_music?: string;
    slug_name_music?: string;
    category?: string;
    slug_category?: string;
    subscribe?: string;
    slug_subscribe?: string;
}
export interface AccountFavoriteType {}