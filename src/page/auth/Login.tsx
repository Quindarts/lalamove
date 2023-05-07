import { Checkbox, Form, Input, message } from "antd";
import React, { useState } from "react";
import Button from "../../components/UI/Button/Button";
import useUSer from "../../hooks/useUser";
import { login } from "../../services/userApi";
import "../../styles/pages/auth/login.css";

function Login(prop: any) {
    const { onClose, mlogin, isOpenLogin, setIsOpenLogin } = prop;
    const { user, getLoginAccount } = useUSer();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinishLogin = (values: any) => {
        const switchData = Object.assign({}, values);
        const data = {
            email: switchData.email,
            password: switchData.password,
        };

        login(data).then((res) => {
            if (res.status === 400) {
                const message = res.data.message;
                messageApi.open({ type: "error", content: message });
            }
            if (res.status === 200) {
                messageApi.open({ type: "success", content: "Login success" });
                localStorage.setItem("access_token", res.data.accessToken);
                getLoginAccount(res.data);
                mlogin(true);
                onClose();
                console.log("user store:", user.userLogin.data.user_name);
            }
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    const onFinishRegister = (values: any) => {
        const switchData = Object.assign({}, values);
        const data = {
            username: switchData.username,
            email: switchData.email,
            password: switchData.password,
        };
        console.log("register:", data);
    };
    return (
        <>
            {contextHolder}

            {isOpenLogin ? (
                <>
                    <div className="title text-center font-bold text-[2rem]">
                        Đăng nhập
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishLogin}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="form_login flex flex-col justify-center align-middle"
                    >
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập vào email !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập vào mật khẩu!",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            name="remember"
                            valuePropName="checked"
                            wrapperCol={{ offset: 8, span: 16 }}
                        >
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                            className="  form-btn_login"
                        >
                            <Button
                                className="w-[300px]"
                                type="submit"
                                color="green"
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                className="w-[300px] mt-2"
                                type="submit"
                                color="yellow"
                                onClick={() => {
                                    setIsOpenLogin(false);
                                }}
                            >
                                Đăng kí
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            ) : (
                <>
                    <div className="title text-center font-bold text-[2rem]">
                        Đăng ký
                    </div>
                    <Form
                        name="basic"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishRegister}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        className="form_login flex flex-col justify-center align-middle"
                    >
                        <Form.Item
                            label="Tên tài khoản"
                            name="username"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Vui lòng nhập vào tên người dùng !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message:
                                        "Vui lòng nhập vào email của bạn !",
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Password"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập vào mật khẩu !",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>
                        <Form.Item
                            label="Nhập lại mật khẩu"
                            name="forgotpassword"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập lại mật khẩu !",
                                },
                            ]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item
                            wrapperCol={{ offset: 8, span: 16 }}
                            className="  form-btn_login"
                        >
                            <Button
                                className="w-[300px] mt-2"
                                type="submit"
                                color="yellow"
                                onClick={() => {
                                    setIsOpenLogin(false);
                                }}
                            >
                                Đăng kí ngay
                            </Button>
                        </Form.Item>
                    </Form>
                </>
            )}
        </>
    );
}

export default Login;
