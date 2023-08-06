import React from "react";
import styles from "./style.module.css";

interface ButtonProps {
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  handleClick?: () => void;
  disabled?: boolean;
  style?: "btn_primary" | "btn_secondary";
}

export const Button: React.FC<ButtonProps> = ({
  children = "Button",
  type = "button",
  handleClick = () => {},
  disabled = false,
  style = "btn_primary",
}) => {
  return (
    <button
      type={type}
      className={`${styles.btn} ${styles[style]}`}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
