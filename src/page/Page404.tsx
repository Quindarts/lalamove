import { Result } from "antd";
import React from "react";
import { useNavigate } from "react-router";
import Button from "components/UI/Button/Button";

function Page404() {
    const navigate = useNavigate();
    return (
        <div className="w-[100vw] h-[100vh]">
            <Result
                className="flex flex-col justify-center text-white"
                status="404"
                title="404"
                style={{ alignItems: "center" }}
                subTitle="Có sự nhầm lẫm.... Link này không tồn tại"
                extra={
                    <Button onClick={() => navigate("/")} color="pink">
                        Back Home
                    </Button>
                }
            />
        </div>
    );
}

export default Page404;
