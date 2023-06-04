import { Layout } from "antd";
import Siderbar from "../Shared/Siderbar/Siderbar";
import MHeader from "../Shared/Header/MHeader";
import { Outlet } from "react-router";
import MFooter from "../Shared/Footer/MFooter";
import SearchDetail from "../Shared/Header/Search/SearchDetail";

function Mainlayout() {
    return (
        <>
            <Layout>
                <Siderbar />
                <Layout style={{ background: "#171719" }}>
                    <MHeader />
                    <SearchDetail />
                    <Outlet />
                    <div className="outlet-footer h-[70px]"></div>
                </Layout>
            </Layout>
            <MFooter />
        </>
    );
}

export default Mainlayout;
