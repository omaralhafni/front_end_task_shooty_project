"use client";
import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

interface InputProps {
  value?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  handleChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({
  value = "",
  name = "",
  type = "text",
  placeholder = "Enter value",
  handleChange = () => {},
}) => {
  return (
    <input
      value={value}
      name={name}
      onChange={handleChange}
      className={styles.inp_search}
      type={type}
      placeholder={placeholder}
    />
  );
};
