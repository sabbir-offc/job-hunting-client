import { AlertCircle, Download } from "lucide-react";
import useAppliedJobs from "../../hooks/useAppliedJobs";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import ReactTable from "../AllJobs/ReactTable";

const AppliedJobs = () => {
  const { applications } = useAppliedJobs();
  const [filteredJobs, setFilteredJobs] = useState(applications);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedCategory === "") {
      setFilteredJobs(applications);
    } else {
      const filtering = applications.filter(
        (job) => job.job_category === selectedCategory
      );
      setFilteredJobs(filtering);
    }
  }, [selectedCategory, applications]);
  const options = {
    method: "open",
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.SMALL,
      format: "A4",
      orientation: "portrait",
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

      <div className=" mt-10 w-fit mx-auto flex flex-col items-end">
        <select
          name="job_category"
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="select select-primary w-fit "
        >
          <option disabled selected>
            Filter By Category
          </option>
          <option value="">All Category</option>
          <option value="On Site Job">On Site Job</option>
          <option value="Remote Job">Remote Job</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Part Time">Part Time</option>
        </select>
        {filteredJobs?.length > 0 ? (
          <section className="mx-auto w-full max-w-7xl px-4 py-4">
            <div className="mt-6 flex flex-col">
              <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                  <div className="overflow-hidden border border-gray-200 md:rounded-lg">
                    <table
                      id="applied-job-container"
                      className="min-w-full divide-y divide-gray-200"
                    >
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
                            className="px-12 py-3.5 text-left text-sm font-normal text-gray-500"
                          >
                            Job Salary
                          </th>

                          <th
                            scope="col"
                            className="px-2 py-3.5 text-left text-sm font-normal text-gray-500"
                          >
                            Job Category
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
    </div>
  );
};

export default AppliedJobs;
