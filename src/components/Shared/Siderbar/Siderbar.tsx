import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
    MenuFoldOutlined,
    HeartFilled,
    MenuOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Button from "../../UI/Button/Button";
import "../../../styles/components/Shared/siderbar.css";
import { Link } from "react-router-dom";

function Siderbar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider
            id="m-siderbar"
            className=" justify-center"
            trigger={null}
            collapsible
            collapsed={collapsed}
        >
            <div className="flex">
                <div
                    className="flex-1 flex justify-center content-center"
                    style={{
                        color: "#09c478",
                        fontSize: "18px",
                        fontWeight: "bold",
                        alignItems: "center",
                    }}
                >
                    {!collapsed ? "LaLaMusic" : ""}
                </div>
                <Button
                    type="button"
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                        fontSize: "16px",
                        width: 64,
                        height: 64,
                        color: "white",
                        float: "right",
                    }}
                >
                    {<MenuOutlined />}
                </Button>
            </div>

            <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                    {
                        key: "1",
                        icon: <HeartFilled />,
                        label: <Link to="/">Home </Link>,
                    },
                    {
                        key: "2",
                        icon: <HeartFilled />,
                        label: <Link to="/favorite">Favorite </Link>,
                    },
                    {
                        key: "3",
                        icon: <VideoCameraOutlined />,
                        label: <Link to="/listened-song">Listend </Link>,
                    },
                    {
                        key: "4",
                        icon: <MenuFoldOutlined />,
                        label: <Link to="/upload-music">Upload </Link>,

                    },
                ]}
            />
        </Sider>
    );
}

export default Siderbar;
