import { Helmet } from "react-helmet";
import JobTable from "../AllJobs/JobTable";
import useMyJobs from "../../hooks/useMyJobs";
import { AlertCircle } from "lucide-react";
import { useEffect } from "react";

const MyJobs = () => {
  const { jobs } = useMyJobs();
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="md:h-screen">
      <Helmet>
        <title>My Jobs | Job Hunting</title>
      </Helmet>

      {jobs && jobs.length ? (
        <div className="overflow-x-auto mx-auto w-fit">
          <table className="table">
            <thead>
              <tr>
                <th className="text-black">Job Title</th>
                <th className="text-black">Action</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <JobTable key={job._id} job={job}></JobTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-md border-l-4 w-full border-[#793FDF] bg-[#7091f577] p-4 max-w-5xl mx-auto my-10">
          <div className="flex items-center justify-center space-x-4">
            <div>
              <AlertCircle className="h-6 w-6 text-[#793FDF]" />
            </div>
            <div>
              <p className="text-sm text-center font-medium text-[#793FDF]">
                {`You don't post any job.`}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyJobs;
