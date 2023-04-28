import { Checkbox, Form, Input, message } from "antd";
import React from "react";
import Button from "../../components/UI/Button/Button";
import { login } from "../../services/userApi";


function Login(prop: any) {
    const { onClose,mlogin } = prop;
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values: any) => {
        const switchData = Object.assign({}, values);
        const data = {
            email: switchData.username,
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
                mlogin(true);
                onClose();
            }
        });
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log("Failed:", errorInfo);
    };
    return (
        <>
            {contextHolder}

            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
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
                            message: "Please input your password!",
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

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="submit" color="green">
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </>
    );
}

export default Login;
