import React, { ChangeEvent } from "react";
import styles from "./style.module.css";

interface CheckboxProps {
  id?: string;
  label?: string | null;
  name?: string;
  checked: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  id = "check",
  label = null,
  name = "",
  checked,
  onChange = () => {},
}) => {
  return (
    <label className={styles.checkbox}>
      {label}
      <input
        type="checkbox"
        id={id}
        name={name}
        className={styles.inp_checkbox}
        onChange={onChange}
        defaultChecked={checked}
      />
      <span className={styles.check_mark}></span>
    </label>
  );
};
