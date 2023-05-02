import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
    HomeOutlined,
    MenuFoldOutlined,
    HeartFilled,
    MenuOutlined,
    CloudUploadOutlined,
    VideoCameraOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Button from "../../UI/Button/Button";
import "../../../styles/components/Shared/siderbar.css";
import { Link } from "react-router-dom";

function Siderbar() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Sider id="m-siderbar" trigger={null} collapsible collapsed={collapsed}>
            <div className="conainer-siderbar">
                <div className="flex justify-center align-middle">
                    <div
                        className=" flex justify-center content-center"
                        style={{
                            color: "#09c478",
                            fontSize: "18px",
                            fontWeight: "bold",
                            alignItems: "center",
                        }}
                    >
                        {!collapsed ? "QuinMusiz" : ""}
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
                    id="menu-siderbar"
                    style={!collapsed ? { width: "200px" } : {}}
                    items={[
                        {
                            key: "1",
                            icon: <HomeOutlined />,
                            label: <Link to="/">Home </Link>,
                        },
                        {
                            key: "2",
                            icon: <HeartFilled />,
                            label: <Link to="/favorite">Favorite </Link>,
                        },
                        {
                            key: "3",
                            icon: <MenuFoldOutlined />,
                            label: (
                                <Link to="/playlist-account">My playlist </Link>
                            ),
                        },
                        {
                            key: "4",
                            icon: <CloudUploadOutlined />,
                            label: <Link to="/upload-music">Upload </Link>,
                        },
                    ]}
                />
            </div>
        </Sider>
    );
}

export default Siderbar;
