"use client";
import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

interface Option {
  value: string | any;
  label: string;
}

interface SelectInputProps {
  value?: string | any;
  name?: string;
  options?: Option[];
  handleChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
}

export const SelectInput: React.FC<SelectInputProps> = ({
  value = "",
  name = "",
  options = [],
  handleChange = () => {},
}) => {
  return (
    <select
      value={value}
      name={name}
      className={styles.custom_select}
      onChange={handleChange}
    >
      <option value={value} disabled selected hidden>
        {value}
      </option>
      {options.map((item, idx) => (
        <option key={idx} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};
