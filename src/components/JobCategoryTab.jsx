import { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import JobCard from "./JobCard";
import useAxios from "../hooks/useAxios";
import JobCategoryLoader from "./JobCategoryLoader";
import { AlertCircle, X } from "lucide-react";

const categories = [
  { category: "", label: "All Jobs" },
  { category: "On Site Job", label: "On Site Job" },
  { category: "Remote Job", label: "Remote Job" },
  { category: "Hybrid", label: "Hybrid" },
  { category: "Part Time", label: "Part Time" },
];

const JobCategoryTab = () => {
  const axios = useAxios();
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (selectedCategory === "") {
        const res = await axios.get("/jobs");
        setJobs(res.data);
      } else {
        const res = await axios.get(`/jobs?job_category=${selectedCategory}`);
        setJobs(res.data);
      }
      setLoading(false);
    };

    fetchData();
  }, [selectedCategory, axios]);

  const result =
    jobs && jobs.map((job) => <JobCard key={job._id} job={job}></JobCard>);

  return (
    <div>
      <Tabs defaultIndex={0}>
        <TabList>
          {categories.map((cat, index) => (
            <Tab key={index} onClick={() => setSelectedCategory(cat.category)}>
              {cat.label}
            </Tab>
          ))}
        </TabList>
        {categories.map((cat, index) => (
          <TabPanel key={index}>
            {jobs && jobs.length > 0 ? (
              <div className="grid md:grid-cols-2 gap-5 lg:grid-cols-4 place-items-center">
                {result}
              </div>
            ) : (
              <div className="rounded-md border-l-4 w-full border-[#793FDF] bg-[#7091f577] p-4">
                <div className="flex items-center justify-center space-x-4">
                  <div>
                    <AlertCircle className="h-6 w-6 text-[#793FDF]" />
                  </div>
                  <div>
                    <p className="text-sm text-center font-medium text-[#793FDF]">
                      No Job In this Category.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
        ))}
      </Tabs>
    </div>
  );
};

export default JobCategoryTab;
