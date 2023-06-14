import { Image } from "antd";
import React from "react";
import { CommentAccountDataType } from "../../../types/commentType";
import { convertJsonDateToDate } from "../../../utils/helpers";
import '../../../styles/components/UI/Comment/comment.css'
type CommentDetailPropsType = {
    size?: "md" | "lg" | "sm";
    content?: String;
    account: CommentAccountDataType;
    create_date: string;
};

function Comment(props: CommentDetailPropsType) {
    const { size, content, account, create_date, ...rest } = props;
    return (
        <div {...rest} className={`comment cmt_${size}  text-white mx-2 my-5`}>
            <div className="comment_user flex">
                <Image width={50} src={`${account.image}`} />
                <div className="mx-3 comment_content">
                    <h1 className="cmt_user-name text-[#ca49ee] text-[1rem] font-bold">
                        {account.user_name}
                    </h1>
                    <div className="date text-[#908f8f] pb-1">
                        <i> {convertJsonDateToDate(create_date)}</i>
                    </div>  
                    <div className="text-[1.1rem]">
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;
