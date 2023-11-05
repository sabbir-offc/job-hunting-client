import useTanstack from "../../hooks/useTanstack";
import JobTable from "./JobTable";

const AllJobs = () => {
  const { jobs, isLoading } = useTanstack();

  if (isLoading) {
    return <p>Loading...</p>;
  }
  console.log(jobs);

  return (
    <div className="">
      <div className="overflow-x-auto max-w-7xl mx-auto">
        <div className="flex justify-end my-5 md:mr-10">
          <input
            className="flex h-10 w-[250px] rounded-md bg-gray-100 px-3 py-2 text-sm placeholder:text-gray-600 focus:outline-none focus:ring-1 focus:ring-black/30 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
            type="text"
            placeholder="Serach"
          ></input>
        </div>
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
            {jobs &&
              jobs.map((job) => <JobTable key={job._id} job={job}></JobTable>)}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default AllJobs;
