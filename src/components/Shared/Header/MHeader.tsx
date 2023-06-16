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
                background: "#151818",
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
                    className="input_search"
                    placeholder="Tìm kiếm bài hát, ca sĩ ..."
                    onSearch={setSearch}
                    size="large"
                    enterButton
                    style={{ width: 400 }}
                />
                <div>
                    {isLoginAccount ? (
                        <div
                            className="flex gap-[1rem] justify-center profile px-3 py-1"
                            style={{ alignItems: "center" }}
                        >
                            <div className="avt">
                                <img src={user?.userLogin?.data.image} alt="" />
                                <div className="status">
                                    <div className="status-circle"></div>
                                </div>
                            </div>
                            <span className="profile_username"> 
                                {user?.userLogin?.data?.user_name}
                            </span>

                            <button
                                className="text-[1rem]"
                                onClick={handleLogoutAccount}
                            >
                                <Icon icon="material-symbols:logout" />
                            </button>
                        </div>
                    ) : (
                        <div className="header-icon_control">
                            <button onClick={() => handleOpenModal("login")}>
                                <Icon
                                    icon="carbon:user-filled"
                                    className="text-[2.3rem] mr-3"
                                />
                            </button>
                            <button>
                                {" "}
                                <Icon
                                    icon="uiw:setting"
                                    className="text-[2.3rem]"
                                />
                            </button>
                        </div>
                    )}
                </div>
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
