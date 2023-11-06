import { Helmet } from "react-helmet";
import JobTable from "../AllJobs/JobTable";
import useMyJobs from "../../hooks/useMyJobs";

const MyJobs = () => {
  const { jobs } = useMyJobs();
  return (
    <div className="">
      <Helmet>
        <title>My Jobs | Job Hunting</title>
      </Helmet>
      <div className="overflow-x-auto max-w-7xl mx-auto md:h-screen">
        <table className="table">
          <thead>
            <tr>
              <th className="text-black">Job Title</th>
              <th className="text-black">Action</th>
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

export default MyJobs;
