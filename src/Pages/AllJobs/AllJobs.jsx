import { useEffect, useState } from "react";
import useTanstack from "../../hooks/useTanstack";
import { Search } from "lucide-react";
import { Helmet } from "react-helmet";
import ContentSpinner from "../../components/ContentSplinner";
import ReactTable from "./ReactTable";
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
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>All Jobs | Job Hunting</title>
      </Helmet>
      <form className="flex justify-start mt-5 ml-8 items-center relative w-2/3 md:w-1/4">
        <input
          className="flex h-10 w-full rounded-md bg-gray-100 px-3 py-2 pr-10 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          type="text"
          onChange={(e) => setText(e.target.value)}
          name="searchText"
          placeholder="Serach"
        ></input>
        <button onClick={handleSearch} className="absolute right-4 md:right-3">
          <Search></Search>
        </button>
      </form>

      <section className="mx-auto w-full max-w-7xl px-4 py-4">
        <div className="mt-6 flex flex-col">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr className="divide-x divide-gray-200">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        <span>Job Title</span>
                      </th>
                      <th
                        scope="col"
                        className=" px-2 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Application Deadline
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Job Salary
                      </th>

                      <th
                        scope="col"
                        className="px-2 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Applicant Number
                      </th>
                      <th
                        scope="col"
                        className="px-2 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Job Category
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-left text-sm font-normal text-gray-500"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {filteredJobs &&
                      filteredJobs.map((job) => (
                        <ReactTable key={job._id} job={job}></ReactTable>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default AllJobs;
