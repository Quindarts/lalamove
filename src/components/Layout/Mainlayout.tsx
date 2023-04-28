import { Layout, Menu, theme } from "antd";
import Siderbar from "../Shared/Siderbar/Siderbar";
import MHeader from "../Shared/Header/MHeader";
import ComponentPage from "../../page/ComponentPage";
import { Outlet } from "react-router";

function Mainlayout() {
    return (
        <Layout>
            <Siderbar />
            <Layout style={{ background: "#171719" }}>
                <MHeader />
                {/* <ComponentPage /> */}
                <Outlet/>
            </Layout>
        </Layout>
    );
}

export default Mainlayout;
