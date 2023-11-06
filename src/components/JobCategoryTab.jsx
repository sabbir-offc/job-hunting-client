import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import useAxios from "../hooks/useAxios";
import JobCategoryLoader from "./JobCategoryLoader";
const JobCategoryTab = () => {
  const axios = useAxios();
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");
  useEffect(() => {
    if (selectedCategory === "") {
      axios.get("/jobs").then((res) => {
        setJobs(res.data);
        setLoading(false);
      });
    } else {
      axios.get(`/jobs?job_category=${selectedCategory}`).then((res) => {
        setJobs(res.data);
        setLoading(false);
      });
    }
  }, [selectedCategory, axios]);

  const result =
    jobs && jobs.map((job) => <JobCard key={job._id} job={job}></JobCard>);

  if (loading) {
    return <JobCategoryLoader></JobCategoryLoader>;
  }

  return (
    <div>
      <Tabs defaultIndex={0}>
        <TabList>
          <Tab onClick={() => setSelectedCategory("")}>All Jobs</Tab>
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
            {result}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {result}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {result}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {result}
          </div>
        </TabPanel>
        <TabPanel>
          <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
            {result}
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default JobCategoryTab;
