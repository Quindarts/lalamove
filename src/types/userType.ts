export interface UserLoginFormDataType {
    email: String;
    password: String;
}
export interface UserRegisterFormDataType {
    userName: String;
    password: String;
    email: String;
}
export interface UserDetailType {
    image: String;
    role: 1;
    sum_comment: null;
    sum_list_music: null;
    sum_upload: null;
    updatedAt: String;
    createdAt: String;
    _id: String;
    user_name: String;
    password: String;
    email: String;
    __v: number;
}
export interface ResponseUserDataType {
    accessToken: String;
    data: UserDetailType;
}

