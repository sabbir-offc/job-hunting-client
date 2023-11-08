import { AlertCircle, Download } from "lucide-react";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import JobTable from "../AllJobs/JobTable";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { Helmet } from "react-helmet";

const AppliedJobs = () => {
  const { applications } = useAppliedJobs();
  console.log(applications);

  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "letter",
      orientation: "landscape",
    },
    canvas: {
      mimeType: "image/png",
      qualityRatio: 1,
    },
    overrides: {
      pdf: {
        compress: true,
      },
      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () =>
    document.getElementById("applied-job-container");

  return (
    <div className="max-w-7xl mx-auto mb-10">
      <Helmet>
        <title>Applied Jobs | Job Hunting</title>
      </Helmet>
      {applications?.length > 0 ? (
        <div
          id="applied-job-container"
          className="overflow-x-auto text-center mx-auto w-fit"
        >
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
        <div className="rounded-md border-l-4 max-w-5xl mx-auto my-10 border-[#793FDF] bg-[#7091f577] p-4">
          <div className="flex items-center justify-center space-x-4">
            <div>
              <AlertCircle className="h-6 w-6 text-[#793FDF]" />
            </div>
            <div>
              <p className="text-sm text-center font-medium text-[#793FDF]">
                {`You haven't applied to any jobs.`}
              </p>
            </div>
          </div>
        </div>
      )}
      <button
        className="bg-[#793FDF] mx-auto mt-5 px-4 py-3 rounded-md text-white flex justify-center items-center gap-3"
        onClick={() => generatePDF(getTargetElement, options)}
      >
        <Download></Download> Download PDF
      </button>
    </div>
  );
};

export default AppliedJobs;
