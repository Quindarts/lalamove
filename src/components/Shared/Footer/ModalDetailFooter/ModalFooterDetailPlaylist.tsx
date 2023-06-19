import { Tabs } from "antd";
import type { TabsProps } from "antd";
import { MehFilled } from "@ant-design/icons";
import TagListHistoryMusic from "./TagListHistoryMusic";
import TagMPlaylistAccount from "./TagMPlaylistAccount";
import "styles/components/Shared/Footer/ModalDetailFooter/modalFooterDetailPlaylist.css";
import { isCheckedAccessToken } from "utils/helpers";
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
        key: "3",
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
    return (
        <>
            <Tabs
                className="text-[gray]"
                defaultActiveKey="1"
                items={isCheckedAccessToken() ? items : Btnlogin}
            />
        </>
    );
}

export default ModalFooterDetailPlaylist;
