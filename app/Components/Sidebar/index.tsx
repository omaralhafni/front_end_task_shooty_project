import React, { useEffect, useState, useCallback, useContext } from "react";
import { Checkbox } from "../Common/Checkbox";
import { Button } from "../Common/Button";
import { JobsContext } from "@/app/Context/Jobs";
import LoadingPage from "@/app/loading";
import styles from "./style.module.css";

interface SubTitle {
  value: string;
  label: string;
}

interface FilterOptionItem {
  id: string;
  title: string;
  subTitle: SubTitle[];
}

export const Sidebar: React.FC = () => {
  const { setJobs } = useContext(JobsContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filterOption, setFilterOption] = useState<FilterOptionItem[]>([]);
  const [filterQuery, setFilterQuery] = useState<string[]>([]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const fetchFilterOptions = useCallback(async () => {
    setLoading(true);

    try {
      const response = await fetch("/api/filter");
      const data = await response.json();
      setFilterOption(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, [fetchFilterOptions]);

  const searchJobsWithFilters = useCallback(async () => {
    const res = await fetch(`/api/jobs/filter?${filterQuery.join("&")}`);
    const jobs = await res.json();
    setJobs(jobs);
  }, [filterQuery]);

  useEffect(() => {
    searchJobsWithFilters();
  }, [searchJobsWithFilters]);

  const handleToggle = useCallback(
    (key: string, value: string) => {
      const newValue = `${key}=${value}`;
      const newChecked = filterQuery.includes(newValue)
        ? filterQuery.filter((item) => item !== newValue)
        : [...filterQuery, newValue];
      setFilterQuery(newChecked);
    },
    [filterQuery]
  );

  return loading ? (
    <LoadingPage />
  ) : (
    <>
      <div className={`${styles.sidebar} ${isSidebarOpen && styles.open}`}>
        <div className={styles.sidebar_container}>
          <ul className={styles.list}>
            {filterOption?.map((item) => (
              <li className={styles.list_item} key={item?.id}>
                <h3 className={styles.list_title}>{item?.title}</h3>
                {item?.subTitle?.map((subTitle, idx) => (
                  <Checkbox
                    key={idx}
                    id={subTitle?.label}
                    label={subTitle?.label}
                    name={subTitle?.label}
                    checked={filterQuery.includes(
                      `${item?.title}=${subTitle?.label}`
                    )}
                    onChange={() => handleToggle(item?.title, subTitle?.label)}
                  />
                ))}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.toggle_btn_Sidebar}>
        <Button handleClick={toggleSidebar}>Filter</Button>
      </div>
    </>
  );
};
