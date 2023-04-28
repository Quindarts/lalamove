import { type } from "os";
import React, { ButtonHTMLAttributes } from "react";
import "../../../styles/components/UI/button.css"
interface ButtonPropsType extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    variant?: "container" | "outline";
    size?: "md" | "lg" | "sm" | "icon";
    color?: "green" | "green-outline" | "grey" | "grey-outline";
}
const Button: React.FC<ButtonPropsType> = (props: ButtonPropsType) => {
    const {children,className = "",variant = "",size = "sm", color,...rest} = props;

    return (
        <button
            {...rest}
            className={`btn ${className} ${variant ? `btn--${variant}` : ""} ${`btn--${size}`} 
            ${color ? `btn--${color}` : ""}`}
        >
            {children}
        </button>
    );
};

export default Button;
