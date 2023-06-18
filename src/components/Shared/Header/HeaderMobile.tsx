import { Icon } from "@iconify/react";
import { Dropdown, Input, Menu, MenuProps } from "antd";
import React, { useEffect, useState } from "react";
import { color } from "../../../theme/variable";
import {
    AppstoreOutlined,
    BarsOutlined,
    HeartOutlined,
    MenuOutlined,
    YoutubeOutlined,
} from "@ant-design/icons";
import "../../../styles/components/Shared/Header/headerMobile.css";
import Modal from "../../UI/Modal/Modal";
import { Link, useNavigate } from "react-router-dom";
import useUSer from "../../../hooks/useUser";
import { removeAccessToken } from "../../../utils/helpers";
import useMusic from "../../../hooks/useMusic";
import { apiSearchMusicByQuery } from "../../../services/appApi";
import AuthenticationPage from "../../../page/auth/AuthenticationPage";
import Button from "../../UI/Button/Button";
function HeaderMobile() {
    const { Search } = Input;
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState({ open: false, id: "" });
    const [search, setSearch] = useState<string>("");
    const { searchMusicByQuery, musics } = useMusic();
    const [isOpenLoginModal, setIsOpenLoginModal] = useState<boolean>(true);
    const [isLoginAccount, setIsLoginAccount] = useState(false);
    const { user } = useUSer();

    const [openModalSidebar, setOpenModalSidebar] = useState<boolean>(false);

    const handleOpenModalLogin = (id: string) => {
        setOpenModalSidebar(false);
        setIsOpen({ open: true, id: id });
        setIsOpenLoginModal(true);
    };
    const handleCloseModalLogin = () => {
        setIsOpen({ ...isOpen, open: false });
    };
    const handleOpenModalSidebar = () => {
        setOpenModalSidebar(true);
    };
    const handleCloseModalSidebar = () => {
        setOpenModalSidebar(!openModalSidebar);
    };
    const handleLogoutAccount = () => {
        setIsLoginAccount(false);
        removeAccessToken();
    };
    const items: MenuProps["items"] = [
        {
            key: "1",
            label: (
                <button
                    onClick={() => {
                        navigate("/account");
                    }}
                >
                    Tài khoản của tôi
                </button>
            ),
        },
        {
            key: "2",
            label: <button onClick={handleLogoutAccount}>Đăng xuất</button>,
        },
    ];
    useEffect(() => {
        if (search !== "") {
            apiSearchMusicByQuery(search).then((res: any) => {
                if (res.status === 200) {
                    searchMusicByQuery(res.data);
                    navigate("/search");
                }
            });
        }
    }, [search]);
    return (
        <>
            <div className="header_mobile">
                <button onClick={handleOpenModalSidebar}>
                    <Icon
                        style={{ color: color.white_cl }}
                        icon="fluent:list-16-filled"
                    />
                </button>
                <div className="">
                    <Search
                        className="input_search"
                        placeholder="Tìm kiếm bài hát, ca sĩ ..."
                        onSearch={setSearch}
                        size="large"
                        enterButton
                        style={{ width: 400 }}
                    />
                </div>
            </div>
            <Modal
                type="left"
                open={openModalSidebar}
                onClose={handleCloseModalSidebar}
            >
                <div className="w-80 py-5">
                    <div className="header_user">
                        {isLoginAccount && (
                            <div
                                className="flex justify-between w-[100%] py-2 px-[1rem]"
                                style={{
                                    alignItems: "center",
                                    borderBottom:
                                        "0.5px solid var(--cancel_btn_cl)",
                                }}
                            >
                                <div className="flex gap-1">
                                    <div className="avt">
                                        <img
                                            src={user?.userLogin?.data.image}
                                            alt=""
                                        />
                                        <div className="status">
                                            <div className="status-circle"></div>
                                        </div>
                                    </div>
                                    <div
                                        className=" text-[1rem] flex"
                                        style={{
                                            color: color.cancel_btn_cl,
                                            alignItems: "center",
                                        }}
                                    >
                                        {user?.userLogin?.data?.user_name}
                                    </div>
                                </div>
                                <button
                                    className="w-[4rem] h-[2rem] text-[1rem] flex p-1 rounded-md"
                                    style={{
                                        alignItems: "center",
                                        color: color.cancel_btn_cl,
                                    }}
                                    onClick={handleLogoutAccount}
                                >
                                    <Icon icon="ic:outline-logout" />
                                    Thoát
                                </button>
                            </div>
                        )}
                    </div>
                    <Menu
                        theme="dark"
                        mode="inline"
                        defaultSelectedKeys={["1"]}
                        id="menu-siderbar"
                        items={[
                            {
                                key: "1",
                                icon: <AppstoreOutlined />,
                                label: <Link to="/">Khám Phá </Link>,
                            },
                            {
                                key: "2",
                                icon: <HeartOutlined />,
                                label: <Link to="/favorite">Yêu Thích </Link>,
                            },
                            {
                                key: "3",
                                icon: <BarsOutlined />,
                                label: (
                                    <Link to="/playlist-account">
                                        Danh Sách Phát{" "}
                                    </Link>
                                ),
                            },
                            {
                                key: "4",
                                icon: <YoutubeOutlined />,
                                label: <Link to="/watch-mv">Watch MV </Link>,
                            },
                            isLoginAccount
                                ? {
                                      key: "4",
                                      icon: <Icon icon="carbon:user-filled" />,
                                      label: (
                                          <Link to="/watch-mv">
                                              Tài khoản của tôi
                                          </Link>
                                      ),
                                  }
                                : null,
                            !isLoginAccount
                                ? {
                                      key: "5",
                                      icon: <Icon icon="carbon:user-filled" />,
                                      label: (
                                          <button
                                              className="w-[100%] text-start"
                                              onClick={() =>
                                                  handleOpenModalLogin("login")
                                              }
                                          >
                                              Đăng nhập
                                          </button>
                                      ),
                                  }
                                : null,
                        ]}
                    />
                </div>
            </Modal>
            <Modal
                type="top"
                id={isOpen.id}
                open={isOpen.open}
                onClose={handleCloseModalLogin}
            >
                <AuthenticationPage
                    onClose={handleCloseModalLogin}
                    setIsLoginAccount={setIsLoginAccount}
                    isOpenLoginModal={isOpenLoginModal}
                    setIsOpenLoginModal={setIsOpenLoginModal}
                />
            </Modal>
        </>
    );
}

export default HeaderMobile;
