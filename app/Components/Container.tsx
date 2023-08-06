import React, { useContext, useState } from "react";
import Image from "next/image";
import { Card } from "./Card";
import { SearchBox } from "./SearchBox";
import { Modal } from "./Common/Modal";
import { Job, JobsContext } from "../Context/Jobs";
import cardPic from "../assets/images/img.jpg";
import styles from "../page.module.css";

export const Container: React.FC = () => {
  const { jobs } = useContext(JobsContext);

  const [showModal, setShowModal] = useState(false);
  const [jobData, setJobData] = useState<Job | {}>({});

  const handleOpenModal = (data: Job) => {
    setShowModal(true);
    setJobData(data);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleSaveModal = () => {
    setShowModal(false);
  };

  return (
    <div className={styles.container}>
      <SearchBox />
      {jobs?.map((card) => (
        <Card
          key={card?.id}
          data={card as Job}
          handleOpenModal={handleOpenModal}
        />
      ))}

      <Modal
        title="Job Details"
        open={showModal}
        handleCloseModal={handleModalClose}
        handleSaveModal={handleSaveModal}
      >
        <Image
          src={cardPic}
          className={styles.card_image}
          alt="Picture of the card"
        />
        <div className={styles.card_content}>
          <h2 className={styles.card_title}>{(jobData as Job).title}</h2>
          <h4 className={styles.card_address}>
            {(jobData as Job).city}, {(jobData as Job).country}
          </h4>
          <p className={styles.card_address}>{(jobData as Job).sector}</p>
          <p className={styles.card_description}>
            {(jobData as Job).description}
          </p>
        </div>
      </Modal>
    </div>
  );
};
