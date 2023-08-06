import React from "react";
import { Button } from "../Button";
import useEscapeKey from "@/app/hooks/useEscape";
import styles from "./style.module.css";

interface ModalProps {
  children: React.ReactNode;
  title?: string | null;
  footer?: boolean;
  open?: boolean;
  handleSaveModal?: () => void;
  handleCloseModal?: () => void;
}

export const Modal: React.FC<ModalProps> = ({
  children,
  title = null,
  footer = false,
  open = false,
  handleSaveModal = () => {},
  handleCloseModal = () => {},
}) => {
  const handleStopPropagationClose = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  useEscapeKey(handleCloseModal, open);

  return (
    <>
      {open && (
        <>
          <div className={styles.modal_screen} onClick={handleCloseModal}>
            <div
              className={styles.modal_box_layout}
              onClick={handleStopPropagationClose}
            >
              <div className={styles.modal_box}>
                {/*header*/}
                {title && (
                  <div className={styles.modal_box_title}>
                    <h2 className={styles.modal_title}>{title}</h2>
                  </div>
                )}
                {/*body*/}
                <div className={styles.modal_body}>{children}</div>
                {/*footer*/}
                {footer && (
                  <div className={styles.modal_footer}>
                    <Button
                      style="btn_secondary"
                      handleClick={handleCloseModal}
                    >
                      Cancel
                    </Button>
                    <Button handleClick={handleSaveModal}>Add New Job</Button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div
            className={styles.modal_transparent_background}
            onClick={handleCloseModal}
          />
        </>
      )}
    </>
  );
};
