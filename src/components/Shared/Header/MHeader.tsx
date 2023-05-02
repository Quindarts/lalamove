import { Input, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import Login from "../../../page/auth/Login";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import useMusic from "../../../hooks/useMusic";
import "../../../styles/components/Shared/header.css";
import { apiSearchMusicByQuery } from "../../../services/appApi";
function setAvt() {
    const token = localStorage.getItem("access_token");
    console.log("token:", token);
    return token;
}
function MHeader() {
    const { Search } = Input;
    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("access_token") !== null,
    );
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
    const [search, setSearch] = useState<string>();
    const handleOpen = (id: string) => {
        setIsOpen({ open: true, id: id });
    };
    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handleLogout = () => {
        setIsLogin(false);
        localStorage.removeItem("access_token");
    };
    const { searchMusicByQuery } = useMusic();
    useEffect(() => {
        if (search !== "") {
            apiSearchMusicByQuery(search).then((res: any) => {
                if (res.status === 200) {
                    searchMusicByQuery(res);
                } else {
                    console.log(res);
                }
            });
        }
    }, [search]);

    return (
        <Header
            style={{
                background: "#171719",
                padding: "1rem",
                margin: " 0 0 0 24px",
            }}
        >
            <div
                className="h-[35px]"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem",
                }}
            >
                <Search
                    className="input_search"
                    placeholder="input search text"
                    onSearch={setSearch}
                    enterButton
                    style={{ width: 500, background: "gray!important" }}
                />
                {isLogin ? (
                    <div className="flex">
                        <span className="mx-5 mb-2 text-emerald-600">
                            Xin Chào, Quang
                        </span>
                        <Button
                            className=""
                            color="green"
                            variant="container"
                            onClick={handleLogout}
                        >
                            Logout
                        </Button>
                    </div>
                ) : (
                    <Button
                        color="green"
                        variant="container"
                        onClick={() => handleOpen("login")}
                    >
                        Sign up
                    </Button>
                )}
            </div>
            <Modal
                type="top"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleClose}
            >
                <Login onClose={handleClose} mlogin={setIsLogin} />
            </Modal>
        </Header>
    );
}

export default MHeader;
