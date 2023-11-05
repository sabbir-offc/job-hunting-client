import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import useAxios from "../hooks/useAxios";
const JobCategoryTab = () => {
  const [jobs, setJobs] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState({});

  const axios = useAxios();
  useEffect(() => {
    axios.get(`/jobs?job_category=${selectedCategory}`).then((res) => {
      const response = res.data;
      setJobs(response);
    });
  }, [selectedCategory, axios]);
  return (
    <div>
      <Tabs defaultIndex={1} onSelect={(index) => console.log(index)}>
        <TabList>
          <Tab>All Jobs</Tab>
          <Tab onClick={() => setSelectedCategory("On Site Job")}>
            On Site Job
          </Tab>
          <Tab onClick={() => setSelectedCategory("Remote Job")}>
            Remote Job
          </Tab>
          <Tab onClick={() => setSelectedCategory("Hybrid")}>Hybrid</Tab>
          <Tab onClick={() => setSelectedCategory("Part Time")}>Part Time</Tab>
        </TabList>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job.job_title} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job.job_title} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job.job_title} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job.job_title} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {jobs &&
              jobs.map((job) => (
                <JobCard key={job.job_title} job={job}></JobCard>
              ))}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default JobCategoryTab;
