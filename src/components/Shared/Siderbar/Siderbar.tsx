import Sider from "antd/es/layout/Sider";
import React, { useState } from "react";
import {
    AppstoreOutlined,
    BarsOutlined,
    HeartOutlined,
    MenuOutlined,
    YoutubeOutlined,
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
                        {!collapsed ? "LALAMOV" : ""}
                    </div>
                    <Button
                        type="button"
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: "1rem",
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
                            icon: <AppstoreOutlined />,
                            label: <Link to="/">Khám Phá </Link>,
                        },
                        {
                            key: "2",
                            icon:<HeartOutlined />,
                            label: <Link to="/favorite">Yêu Thích </Link>,
                        },
                        {
                            key: "3",
                            icon: <BarsOutlined />,
                            label: (
                                <Link to="/playlist-account">Danh Sách Phát </Link>
                            ),
                        },
                        {
                            key: "4",
                            icon:<YoutubeOutlined />,
                            label: <Link to="/upload-music">Watch MV </Link>,
                        },
                    ]}
                />
            </div>
        </Sider>
    );
}

export default Siderbar;
