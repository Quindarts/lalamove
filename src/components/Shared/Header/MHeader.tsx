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
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";

function MHeader() {
    const { Search } = Input;
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
    const [search, setSearch] = useState<string>("");
    const { searchMusicByQuery } = useMusic();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(true);
    const [isLoginAccount, setIsLoginAccount] = useState(false);
    const { user } = useUSer();
    const handleOpenModal = (id: string) => {
        setIsOpen({ open: true, id: id });
        setIsOpenLoginModal(true);
    };
    const handleCloseModal = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handleLogoutAccount = () => {
        setIsLoginAccount(false);
        localStorage.removeItem("access_token");
    };
    useEffect(() => {
        if (search !== "") {
            apiSearchMusicByQuery(search).then((res: any) => {
                if (res.status === 200) {
                    searchMusicByQuery(res);
                    navigate("/search");
                }
            });
        }
    }, [search]);

    return (
        <Header
            style={{
                background: "#171719",
                padding: "1rem",
                margin: " 0 0 2rem 24px",
            }}
        >
            <div
                className="h-[35px] my-5"
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "1rem",
                }}
            >
                <Search
                    className="input_search text-white"
                    placeholder="Tìm kiếm bài hát, ca sĩ ..."
                    onSearch={setSearch}
                    size="large"
                    enterButton
                    style={{ width: 400, background: "gray!important" }}
                />
                {isLoginAccount ? (
                    <div className="flex">
                        <span className="mx-5 mb-2 text-emerald-600">
                            Xin Chào,{" "}{user?.userLogin?.data?.user_name}
                        </span>
                        <Button
                            className=""
                            color="yellow"
                            variant="container"
                            onClick={handleLogoutAccount}
                        >
                            Đăng xuất
                        </Button>
                    </div>
                ) : (
                    <Button
                        color="green-outline"
                        variant="container"
                        onClick={() => handleOpenModal("login")}
                        style={{ borderRadius: "50%",padding:'0.6rem' }}
                        size="lg"
                    >
                        <Icon icon="ri:user-fill" className="text-[1rem]" />
                    </Button>
                )}
            </div>
            <Modal
                type="top"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleCloseModal}
                color={"#12192c"}
            >
                <Login
                    onClose={handleCloseModal}
                    setIsLoginAccount={setIsLoginAccount}
                    isOpenLoginModal={isOpenLoginModal}
                    setIsOpenLoginModal={setIsOpenLoginModal}
                />
            </Modal>
        </Header>
    );
}

export default MHeader;
