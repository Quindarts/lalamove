import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import useMusicReducer from "./useMusic.slice";
import usePlaylistReducer from "./usePlaylist.slice";
import useFavoriteReducer from "./useFavorite.slice";
import useUserReducer from "./useUser.slice";
import useCommentReducer from "./useComment.slice";

type StoreProviderPropType = {
    children: React.ReactNode;
};

export const store = configureStore({
    reducer: {
        musics: useMusicReducer,
        playlist: usePlaylistReducer,
        favorite: useFavoriteReducer,
        user: useUserReducer,
        comment: useCommentReducer,
    },
});

const StoreProvider = (props: StoreProviderPropType) => {
    return <Provider store={store}>{props.children}</Provider>;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export default StoreProvider;
