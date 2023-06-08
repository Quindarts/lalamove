import React from "react";
import { Route, Routes } from "react-router";
import Mainlayout from "../components/Layout/Mainlayout";
import FavoritePage from "../page/FavoritePage";
import HomePage from "../page/HomePage";
import PlaylistAccountPage from "../page/PlaylistAccountPage";
import SearchPage from "../page/SearchPage";
import UploadMusicPage from "../page/UploadMusicPage";
const APP_ROUTES = {
    INDEX: "/",
    FAVORITE: "/favorite",
    MYPLAYLIST: "/playlist-account",
    UPLOAD_MUSIC: "/upload-music",
    SEARCH_PAGE: "/search",
};
const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.INDEX} element={<Mainlayout />}>
                <Route index element={<HomePage />} />
                <Route path={APP_ROUTES.FAVORITE} element={<FavoritePage />} />
                <Route
                    path={APP_ROUTES.MYPLAYLIST}
                    element={<PlaylistAccountPage />}
                />
                <Route
                    path={APP_ROUTES.UPLOAD_MUSIC}
                    element={<UploadMusicPage />}
                />
                <Route path={APP_ROUTES.SEARCH_PAGE} element={<SearchPage />} />
            </Route>
        </Routes>
    );
};

export default Routing;
