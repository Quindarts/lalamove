import { Layout } from "antd";
import Siderbar from "../Shared/Siderbar/Siderbar";
import MHeader from "../Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "../Shared/Footer/MFooter";

function Mainlayout() {
    window.addEventListener("load", function () {
        localStorage.removeItem("access_token");
    });
    return (
        <>
            <Layout>
                <Siderbar />
                <Layout style={{ background: "#171719" }}>
                    <MHeader />
                    <Outlet />
                    <div className="outlet-footer h-[70px]"></div>
                </Layout>
            </Layout>
            <MFooter />
        </>
    );
}

export default Mainlayout;
