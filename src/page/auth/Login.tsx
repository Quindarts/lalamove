import { Checkbox, Form, Input } from "antd";
import Button from "../../components/UI/Button/Button";
import useUSer from "../../hooks/useUser";
import { login, register } from "../../services/userApi";
import "../../styles/pages/auth/login.css";
import { notification } from "antd";

type NotificationType = "success" | "info" | "warning" | "error";

function Login(prop: any) {
    const {
        onClose,
        setIsLoginAccount,
        isOpenLoginModal,
        setIsOpenLoginModal,
    } = prop;
    const { user, getLoginAccount } = useUSer();
    const [messageApi, contextHolder] = notification.useNotification();

    const openNotificationWithIcon = (
        type: NotificationType,
        message: String,
        des: String,
    ) => {
        messageApi[type]({
            message: message,
            description: des,
        });
    };
    const onFinishLogin = (values: any) => {
        const switchData = Object.assign({}, values);
        const data = {
            email: switchData.email,
            password: switchData.password,
        };

        login(data).then((res) => {
            if (res.status === 400) {
                const message = res.data.message;
                openNotificationWithIcon("error", "Đăng nhập", "Đăng nhập thất bại");
            }
            if (res.status === 200) {
                openNotificationWithIcon(
                    "success",
                    "Đăng nhập",
                    "Đăng nhập thành công",
                );

                localStorage.setItem("access_token", res.data.accessToken);
                getLoginAccount(res.data);
                setIsLoginAccount(true);
                onClose();
            }
        });
    };
    const onFinishRegister = (values: any) => {
        const switchData = Object.assign({}, values);
        const data = {
            userName: switchData.username,
            password: switchData.password,
            email: switchData.email,
        };
        register(data).then((res) => {
            console.log(res);
            if (res.status === 200 || res.status === 204) {
                openNotificationWithIcon(
                    "success",
                    "Đăng kí",
                    "Đăng kí thành công",
                );

                localStorage.setItem("access_token", res.data.accessToken);
                getLoginAccount(res.data);
                setIsLoginAccount(true);
                onClose();
            }
        });
    };
    return (
        <>
            {contextHolder}

            {isOpenLoginModal ? (
                <>
                    <div className="title text-center font-bold text-[2rem]">
                        Đăng nhập
                    </div>
                    <Form
                        name="login"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishLogin}
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
                            <Input placeholder="Nhập vào email"/>
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
                            <Input.Password placeholder="Nhập vào mật khẩu"/>
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
                                    setIsOpenLoginModal(false);
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
                        name="register"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ maxWidth: 400 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinishRegister}
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
                            <Input placeholder="Nhập vào tên người dùng" />
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
                            <Input placeholder="Nhập vào email"/>
                        </Form.Item>

                        <Form.Item
                            label="Mật khẩu"
                            name="password"
                            rules={[
                                {
                                    required: true,
                                    message: "Vui lòng nhập vào mật khẩu !",
                                },
                            ]}
                        >
                            <Input.Password placeholder="Nhập vào mật khẩu"/>
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
                            <Input.Password placeholder="Nhập lại mật khẩu" />
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
                </>
            )}
        </>
    );
}

export default Login;
