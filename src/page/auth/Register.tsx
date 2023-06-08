import {  Form, Input } from "antd";
import React from "react";
import Button from "../../components/UI/Button/Button";

function Register(props :any) {
    const {onFinishRegister,onFinishFailed,setIsOpenLoginModal} =props;
    return (
        <div>
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
                            message: "Vui lòng nhập vào tên người dùng !",
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
                            message: "Vui lòng nhập vào email của bạn !",
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
                            setIsOpenLoginModal(false);
                        }}
                    >
                        Đăng kí ngay
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
}

export default Register;
