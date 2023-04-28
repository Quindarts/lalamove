import React from "react";
import { Route, Routes } from "react-router";
import Mainlayout from "../components/Layout/Mainlayout";
import ComponentPage from "../page/ComponentPage";
import FavoritePage from "../page/FavoritePage";
import HomePage from "../page/HomePage";
import ListenedSongPage from "../page/ListenedSongPage";
import UploadMusicPage from "../page/UploadMusicPage";
const APP_ROUTES = {
    INDEX: "/",
    FAVORITE: "/favorite",
    LISTENED_SONG: "/listened-song",
    UPLOAD_MUSIC: "/upload-music",
};
const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.INDEX} element={<Mainlayout />}>
                <Route index element={<HomePage />} />
                <Route
                    index
                    path={APP_ROUTES.FAVORITE}
                    element={<FavoritePage />}
                />
                <Route
                    index
                    path={APP_ROUTES.LISTENED_SONG}
                    element={<ListenedSongPage />}
                />
                <Route
                    index
                    path={APP_ROUTES.UPLOAD_MUSIC}
                    element={<UploadMusicPage />}
                />
            </Route>
        </Routes>
    );
};

export default Routing;
