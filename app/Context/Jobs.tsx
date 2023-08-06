"use client";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from "react";
import LoadingPage from "../loading";

export interface Job {
  id?: number;
  title: string;
  sector: string;
  country: string;
  city: string;
  description: string;
}
interface IJobsContext {
  jobs: Job[];
  setJobs: Dispatch<React.SetStateAction<Job[]>>;
}

export const JobsContext = createContext<IJobsContext>({
  jobs: [],
  setJobs: () => {},
});

export const JobsProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState<boolean>(false);

  const [jobs, setJobs] = useState<Job[]>([]);
  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/jobs");
      const data = await res.json();
      setJobs(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);
  return (
    <JobsContext.Provider
      value={{
        jobs,
        setJobs,
      }}
    >
      {loading ? <LoadingPage /> : children}
    </JobsContext.Provider>
  );
};
