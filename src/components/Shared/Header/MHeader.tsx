import { Input, theme } from "antd";
import { Header } from "antd/es/layout/layout";
import React, { useState } from "react";
import Login from "../../../page/auth/Login";
import Button from "../../UI/Button/Button";
import Modal from "../../UI/Modal/Modal";
import "../../../styles/components/Shared/header.css"
const { Search } = Input;
const onSearch = (value: string) => console.log(value);

function setAvt() {
    const token = localStorage.getItem("access_token");
    console.log("token:", token);

    return token;
}
function MHeader() {
    const [isLogin, setIsLogin] =useState(false);
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
    const handleOpen = (id: string) => {
        setIsOpen({ open: true, id: id });
    };
    const handleClose = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handleLogout = () =>{
        setIsLogin(false);
        localStorage.removeItem('access_token');
    }
    return (
        <Header
            style={{
                background: "#171719",
                padding: "1rem",
                margin: " 0 0 0 24px",
            }}
        >
            <div
                className=""
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "2rem",
                }}
            >
                <Search
                className="input_search"
                    placeholder="input search text"
                    onSearch={onSearch}
                    style={{ width: 500, background: "gray!important" }}
                />
                {isLogin ?(
                    <Button
                    color="green"
                    variant="container"
                    onClick={handleLogout}
                >
                    Logout
                </Button>
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
