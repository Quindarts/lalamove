import { createSlice, PayloadAction } from "@reduxjs/toolkit";
const initialState: any = {
    userDetail: {},
    userLogin: {},
    userRegister: {},
};
export const useUser = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setLogin: (state: any, { payload }: PayloadAction<any>) => {
            state.userLogin = payload;
        },
        setRegister: (state: any, { payload }: PayloadAction<any>) => {
            state.userRegister = payload;
        },
    },
});
export const { setLogin, setRegister } = useUser.actions;
export default useUser.reducer;
