import { Navigate } from "react-router";
import { APP_ROUTES } from "types/constants";
import Account from "page/auth/Account";

function PrivateRouter() {
    const token = localStorage.getItem("access_token");
    return token !== null ? <Account /> : <Navigate to={APP_ROUTES.PAGE404} replace={true} />;
}

export default PrivateRouter;
