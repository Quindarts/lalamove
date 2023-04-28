import { Content } from "antd/es/layout/layout";
import React, { useState } from "react";
import Button from "../components/UI/Button/Button";
import Modal from "../components/UI/Modal/Modal";

function ComponentPage() {
    const [mopen, isOpen] = useState({ open: false, id: "", type: "" });
    const hanldeOpen = (id: string, type: string) => {
        isOpen({ open: true, id: id, type: type });
    };
    const handleCloseModal = () => {
        isOpen({ ...mopen, open: false });
    };
    return (
        <div>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                    color: "white",
                    background: "#171719",
                }}
            >
                <h3>Component Pages</h3>
                <Button
                    variant="container"
                    color="green"
                    onClick={() => hanldeOpen("1", "top")}
                >
                    Modal top
                </Button>
                <Button
                    variant="container"
                    color="green-outline"
                    onClick={() => hanldeOpen("2", "right")}
                >
                    Modal right
                </Button>
            </Content>
            <Modal
                type={mopen.type}
                onClose={handleCloseModal}
                id={mopen.id}
                open={mopen.open}
            >
                Hello world
                <Button variant="container" color="green">
                    Click me
                </Button>
            </Modal>
        </div>
    );
}

export default ComponentPage;
