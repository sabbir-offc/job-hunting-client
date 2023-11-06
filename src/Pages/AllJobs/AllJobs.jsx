import { useEffect, useState } from "react";
import useTanstack from "../../hooks/useTanstack";
import JobTable from "./JobTable";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";
import ContentSpinner from "../../components/ContentSplinner";

const AllJobs = () => {
  const { jobs, isLoading } = useTanstack();
  const [text, setText] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(jobs);

  useEffect(() => {
    if (jobs) {
      setFilteredJobs(jobs);
    }
  }, [jobs]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto my-10 flex items-center justify-center">
        <ContentSpinner></ContentSpinner>
      </div>
    );
  }
  const handleSearch = (e) => {
    e.preventDefault();
    const filterings = jobs?.filter((job) =>
      job.job_title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredJobs(filterings);
  };

  return (
    <div className="">
      <Helmet>
        <title>All Jobs | Job Hunting</title>
      </Helmet>
      <div className="overflow-x-auto max-w-7xl my-10 mx-auto">
        <form className="flex justify-start my-5 md:ml-8 items-center relative w-2/3 md:w-1/4">
          <input
            className="flex h-10 w-full rounded-md bg-gray-100 px-3 py-2 pr-10 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            onChange={(e) => setText(e.target.value)}
            name="searchText"
            placeholder="Serach"
          ></input>
          <button
            onClick={handleSearch}
            className="absolute right-4 md:right-3"
          >
            <Search></Search>
          </button>
        </form>
        <table className="table">
          <thead>
            <tr>
              <th className="text-black">Job Title</th>
              <th className="text-black">Job Deadline</th>
              <th className="text-black">Salary Range</th>
              <th className="text-black">Details</th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs &&
              filteredJobs.map((job) => (
                <JobTable key={job._id} job={job}></JobTable>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllJobs;
