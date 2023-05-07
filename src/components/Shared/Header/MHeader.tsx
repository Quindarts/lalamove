import { Input, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useEffect, useState } from "react";
import Login from "../../../page/auth/Login";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import useMusic from "../../../hooks/useMusic";
import "../../../styles/components/Shared/header.css";
import { apiSearchMusicByQuery } from "../../../services/appApi";
import useUSer from "../../../hooks/useUser";

function MHeader() {
    const { Search } = Input;
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
    const [search, setSearch] = useState<string>();
    const { searchMusicByQuery } = useMusic();
    const [isOpenLogin, setIsOpenLogin] = useState<boolean>(true);
    const [isLogin, setIsLogin] = useState(
        localStorage.getItem("access_token") !== null,
    );
    const { getLogoutAccount, user } = useUSer();
    const handleOpen = (id: string) => {
        setIsOpen({ open: true, id: id });
        setIsOpenLogin(true);
    };
    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handleLogout = () => {
        setIsLogin(false);
        // getLogoutAccount();
        localStorage.removeItem("access_token");
        console.log("user store logout:", user.userLogin);
    };
    useEffect(() => {
        if (search !== "") {
            apiSearchMusicByQuery(search).then((res: any) => {
                if (res.status === 200) {
                    searchMusicByQuery(res);
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
                            Xin Chào,{user?.userLogin?.data?.user_name}
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
                color={"#12192c"}
            >
                <Login
                    onClose={handleClose}
                    mlogin={setIsLogin}
                    isOpenLogin={isOpenLogin}
                    setIsOpenLogin={setIsOpenLogin}
                />
            </Modal>
        </Header>
    );
}

export default MHeader;
