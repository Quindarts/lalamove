import React from "react";
import "../../../styles/components/UI/modal.css";
import { CloseOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
interface ModalPropsType {
    type?: "top" | "right" | string;
    children?: React.ReactNode;
    open?: boolean;
    id?: string;
    className?: string;
    onClose?: () => void;
}
const Modal: React.FC<ModalPropsType> = (props: ModalPropsType) => {
    const {
        type,
        id,
        className = "",
        children,
        open,
        onClose,
        ...rest
    } = props;
    return (
        <div {...rest} className={`  modal${open ? "-open" : ""} ${className} `}>
            <div className="modal-overlay" onClick={onClose}></div>
            <div
                id={`${id}`}
                className={`modal_body ${type ? `modal-${type}` : ""}`}
            >
                <button style={{ float: "right" }} onClick={onClose}>
                    {<CloseOutlined />}
                </button>
                <Content>{children}</Content>
            </div>
        </div>
    );
};

export default Modal;
