import React, { HTMLAttributes } from "react";
import "../../../styles/components/UI/modal.css";
import { CloseOutlined } from "@ant-design/icons";
import { Content } from "antd/es/layout/layout";
interface ModalPropsType {
    type?: "top" | "right" | string;
    children?: React.ReactNode;
    open?: boolean;
    id?: string;
    className?: string;
    color?: string;
    onClose?: () => void;
}
const Modal: React.FC<ModalPropsType> = (props: ModalPropsType) => {
    const {
        type,
        id,
        className = "",
        children,
        open,
        color,
        onClose,
        ...rest
    } = props;
    return (
        <div
            {...rest}
            className={`  modal${open ? "-open" : ""} ${className} `}
        >
            <div className="modal-overlay" onClick={onClose}></div>
            <div
                id={`${id}`}
                style={{ backgroundColor: `${color}` }}
                className={`modal_body ${type ? `modal-${type}` : ""}`}
            >
                <button
                    className="pr-3"
                    style={{ float: "right" }}
                    onClick={onClose}
                >
                    {<CloseOutlined />}
                </button>
                <Content>{children}</Content>
            </div>
        </div>
    );
};

export default Modal;
