import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import useMusicReducer from "./useMusic.slice";
export const store = configureStore({
    reducer: {
        musics: useMusicReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

type StoreProviderPropType = {
    children: React.ReactNode;
};

const StoreProvider = (props: StoreProviderPropType) => {
    return <Provider store={store}>{props.children}</Provider>;
};
export default StoreProvider;
