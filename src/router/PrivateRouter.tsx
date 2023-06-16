import React from "react";
import { Navigate } from "react-router";
import Account from "../page/auth/Account";
import { APP_ROUTES } from "../types/constants";

function PrivateRouter() {
    const token = localStorage.getItem("access_token");
    return token !== null ? <Account /> : <Navigate to={APP_ROUTES.PAGE404} replace={true} />;
}

export default PrivateRouter;
