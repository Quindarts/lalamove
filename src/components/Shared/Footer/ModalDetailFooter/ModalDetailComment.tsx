import { Icon } from "@iconify/react";
import { Image, Input, notification } from "antd";
import { CommentDataType } from "../../../../types/commentType";
import Comment from "../../../UI/Comment/Comment";
import "../../../../styles/components/Shared/Footer/ModalDetailFooter/modalDetailComment.css";
import useUSer from "../../../../hooks/useUser";
import { useEffect, useState } from "react";
import { createCommentAccount } from "../../../../services/commentApi";
type NotificationType = "success" | "info" | "warning" | "error";

function ModalDetailComment(props: any) {
    const [apiMessage, contextHolder] = notification.useNotification();
    const { listComment, idMusic, handleResfreshLoadingComment } = props;
    const [contentComment, setContentComment] = useState<string>("");
    const handleCreateComment = () => {
        if (contentComment !== "") {
            createCommentAccount(contentComment, idMusic).then((res) => {
                if (res.status === 200 || res.status === 204) {
                    handleResfreshLoadingComment();
                    apiMessage["success"]({
                        message: "Bình luận",
                        description: "Bạn đã bình luận một bài hát",
                    });
                }
            });
        }
    };

    const { user } = useUSer();
    console.log("user:", user);
    return (
        <>
            {contextHolder}
            <div className="main_comment w-[25rem] p-3">
                <h1 className="text-[#767373] text-[1.6rem]">Bình luận</h1>
                <div className="main_content">
                    {listComment !== null ? (
                        listComment.map(
                            (cmt: CommentDataType, index: number) => (
                                <Comment
                                    size="md"
                                    content={cmt.content}
                                    account={cmt.account}
                                    create_date={cmt.createdAt}
                                />
                            ),
                        )
                    ) : (
                        <h1>Chưa có bình luận nào</h1>
                    )}
                </div>
                {localStorage.getItem("access_token") ? (
                    <div className="reply flex p-4 gap-4">
                        <Image
                            width={60}
                            src={`${user?.userLogin?.data?.image}`}
                        />
                        
                        <Input
                            placeholder="Nhập bình luận"
                            onChange={(e) => {
                                setContentComment(e.target.value);
                            }}
                        />
                        <button
                            className=" p-3 btn-reply "
                            onClick={handleCreateComment}
                        >
                            <Icon icon="mingcute:send-fill" />
                        </button>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </>
    );
}

export default ModalDetailComment;
