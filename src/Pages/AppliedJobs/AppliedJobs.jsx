import { AlertCircle } from "lucide-react";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import JobTable from "../AllJobs/JobTable";

const AppliedJobs = () => {
  const { applications } = useAppliedJobs();
  console.log(applications);
  return (
    <div>
      {applications?.length > 0 ? (
        <div className="overflow-x-auto mx-auto w-fit">
          <table className="table">
            <thead>
              <tr>
                <th className="text-black">Job Title</th>
                <th className="text-black">Salary</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((job) => (
                <JobTable key={job._id} job={job}></JobTable>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="rounded-md border-l-4 w-full border-[#793FDF] bg-[#7091f577] p-4">
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

export default AppliedJobs;
