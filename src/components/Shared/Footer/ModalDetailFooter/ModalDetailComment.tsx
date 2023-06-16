import { Icon } from "@iconify/react";
import { Image, Input, notification } from "antd";
import { CommentDataType } from "../../../../types/commentType";
import Comment from "../../../UI/Comment/Comment";
import "../../../../styles/components/Shared/Footer/ModalDetailFooter/modalDetailComment.css";
import useUSer from "../../../../hooks/useUser";
import { useState } from "react";
import { createCommentAccount } from "../../../../services/commentApi";
import { isCheckedAccessToken } from "../../../../utils/helpers";

type ModalDetailCommentPropsType = {
    listComment: CommentDataType[];
    idMusic: string;
    handleResfreshLoadingComment: () => void;
};
function ModalDetailComment(props: ModalDetailCommentPropsType) {
    const { listComment, idMusic, handleResfreshLoadingComment } = props;
    const { user } = useUSer();
    const [apiMessage, contextHolder] = notification.useNotification();
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
                                    key={index}
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
                {isCheckedAccessToken() && (
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
                )}
            </div>
        </>
    );
}

export default ModalDetailComment;
