import React, {
  useEffect,
  useState,
  ChangeEvent,
  useCallback,
  useContext,
} from "react";
import { debounce } from "@/app/utils/debounce";
import { Input } from "../Common/Input";
import { Button } from "../Common/Button";
import { Modal } from "../Common/Modal";
import { SelectInput } from "../Common/SelectInput";
import { Job, JobsContext } from "@/app/Context/Jobs";
import styles from "./style.module.css";
interface FilterOption {
  id: string;
  title: string;
  subTitle: { value: string; label: string }[];
}
const defaultData = {
  title: "",
  sector: "",
  country: "",
  city: "",
  description: "",
};

export const SearchBox: React.FC = () => {
  const { setJobs } = useContext(JobsContext);
  const [dataModal, setDataModal] = useState<Job | any>(defaultData);
  const [filterOption, setFilterOption] = useState<FilterOption[]>([]);
  const [notMsg, setNotMsg] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;

    setDataModal((prev: Job | typeof defaultData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextareaChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setDataModal((prev: Job | typeof defaultData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    setDataModal(defaultData);
    setNotMsg("");
    setShowModal(false);
  };

  const handleSaveModal = async () => {
    if (
      !dataModal.title ||
      !dataModal.sector ||
      !dataModal.country ||
      !dataModal.city ||
      !dataModal.description
    ) {
      setNotMsg("Please fill in all fields");
      return;
    }
    setNotMsg("");
    setDataModal(defaultData);

    const response = await fetch("/api/jobs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataModal),
    });

    const data = await response.json();
    setJobs(data);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch("/api/filter");
      const data = await response.json();
      setFilterOption(data);
    };
    fetchCourses();
  }, []);

  const handleChangeSearch = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setQuery(value);

      debounce(async (value: string) => {
        try {
          const res = await fetch(`/api/jobs/search?query=${value}`);
          const jobs = await res.json();
          setJobs(jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      }, 500)(value);
    },
    []
  );

  return (
    <>
      <div className={styles.search_container}>
        <Input
          value={query}
          placeholder="Search By Job Title"
          handleChange={handleChangeSearch}
        />
        <Button handleClick={() => setShowModal(true)}>Add New Job</Button>
      </div>
      <Modal
        title="Add New Job Post"
        open={showModal}
        footer
        handleCloseModal={handleModalClose}
        handleSaveModal={handleSaveModal}
      >
        <form>
          <div className={styles.form_container}>
            <Input
              name="title"
              value={dataModal?.title}
              placeholder="Job title"
              handleChange={handleInputChange}
            />

            {filterOption?.map((select) => (
              <SelectInput
                key={select?.id}
                value={dataModal?.[select?.id] || select?.title}
                name={select?.title}
                options={select?.subTitle}
                handleChange={handleInputChange}
              />
            ))}
          </div>
          <textarea
            name="description"
            value={dataModal?.description}
            className={styles.modal_textarea}
            onChange={handleTextareaChange}
            placeholder="Textarea"
            rows={5}
          />
          {notMsg && <p className={styles.not_msg}>{notMsg}</p>}
        </form>
      </Modal>
    </>
  );
};
