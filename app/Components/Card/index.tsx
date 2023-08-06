import { useCallback, useContext } from "react";
import Image from "next/image";
import { Job, JobsContext } from "@/app/Context/Jobs";
import cardPic from "../../assets/images/img.jpg";
import trashIcon from "../../assets/images/trash_icon.svg";
import eyeIcon from "../../assets/images/eye.svg";
import styles from "./style.module.css";
interface CardProps {
  data: Job;
  handleOpenModal: (data: Job) => void;
}

export const Card: React.FC<CardProps> = ({ data, handleOpenModal }) => {
  const { setJobs } = useContext(JobsContext);

  const handleDeleteJobAction = useCallback(async (id: number) => {
    const response = await fetch("/api/jobs", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(id),
    });
    const data = await response.json();
    setJobs(data);
  }, []);

  return (
    <div className={styles.card_container}>
      <Image src={cardPic} width={150} height={150} alt="Picture of the card" />
      <div className={styles.card_content}>
        <h2 className={styles.card_title}>{data?.title}</h2>
        <h4 className={styles.card_address}>
          {data.city}, {data?.country}
        </h4>
        <p className={styles.card_address}>{data?.sector}</p>
        <p className={styles.card_description}>{data?.description}</p>
      </div>
      <div className={styles.card_controller}>
        <Image
          onClick={() => handleOpenModal(data)}
          src={eyeIcon}
          width={25}
          height={25}
          alt="Picture of the eye icon"
        />
        <Image
          src={trashIcon}
          width={25}
          height={25}
          onClick={() => handleDeleteJobAction(data?.id!)}
          alt="Picture of the trash icon"
        />
      </div>
    </div>
  );
};
