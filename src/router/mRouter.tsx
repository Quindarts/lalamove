import React from "react";
import { Route, Routes } from "react-router";
import Mainlayout from "../components/Layout/Mainlayout";
import FavoritePage from "../page/FavoritePage";
import HomePage from "../page/HomePage";
import PlaylistAccountPage from "../page/PlaylistAccountPage";
import SearchPage from "../page/SearchPage";
import WatchMVPage from "../page/WatchMVPage";
import { APP_ROUTES } from "../types/constants";
const Routing: React.FC = () => {
    return (
        <Routes>
            <Route path={APP_ROUTES.INDEX} element={<Mainlayout />}>
                <Route index element={<HomePage />} />
                <Route path={APP_ROUTES.FAVORITE} element={<FavoritePage />} />
                <Route
                    path={APP_ROUTES.MY_PLAYLIST}
                    element={<PlaylistAccountPage />}
                />
                <Route
                    path={APP_ROUTES.WATCH_MV}
                    element={<WatchMVPage />}
                />
                <Route path={APP_ROUTES.SEARCH_PAGE} element={<SearchPage />} />
            </Route>
        </Routes>
    );
};

export default Routing;
