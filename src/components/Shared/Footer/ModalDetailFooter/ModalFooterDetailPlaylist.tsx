import { useEffect, useState } from "react";
import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { MehFilled } from "@ant-design/icons";
import TagListHistoryMusic from "./TagListHistoryMusic";
import TagMPlaylistAccount from "./TagMPlaylistAccount";
import "../../../../styles/components/Shared/Footer/ModalDetailFooter/modalFooterDetailPlaylist.css";
const items: TabsProps["items"] = [
    {
        key: "1",
        label: `Danh sách của bạn`,
        children: <TagMPlaylistAccount />,
    },
    {
        key: "2",
        label: `Lịch sử phát`,
        children: <TagListHistoryMusic />,
    },
];
const Btnlogin: TabsProps["items"] = [
    {
        key: "1",
        label: ``,
        children: (
            <div className=" flex justif-center align-middle h-[80vh]">
                <div className="h-[50px] text-center">
                    <h1 className="text-[16px]">
                        Bạn phải đăng nhập để sử dụng chức năng này!!
                    </h1>
                    <MehFilled className="text-[80px] text-yellow-600 my-5 " />
                </div>
            </div>
        ),
    },
];
function ModalFooterDetailPlaylist() {
    const [access_token, setAccess_token] = useState<string | null>();
    useEffect(() => {
        setAccess_token(localStorage.getItem("access_token"));
    }, [localStorage.getItem("access_token")]);

    return (
        <>
            <Tabs
                className="text-[gray]"
                defaultActiveKey="1"
                items={access_token !== null ? items : Btnlogin}
            />
        </>
    );
}

export default ModalFooterDetailPlaylist;
