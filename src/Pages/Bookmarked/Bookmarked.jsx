import { AlertCircle } from "lucide-react";
import { useEffect, useState } from "react";
import ReactTable from "../AllJobs/ReactTable";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Helmet } from "react-helmet";
import { useQuery } from "@tanstack/react-query";
import ContentSpinner from "../../components/ContentSplinner";

const Bookmarked = () => {
  // const [jobs, setJobs] = useState(null);
  const axios = useAxios();
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["savedJobs"],
    queryFn: async () => {
      const res = await axios.get(`/saved-jobs?email=${user?.email}`);
      return res;
    },
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto flex items-center justify-center">
        <ContentSpinner></ContentSpinner>
      </div>
    );
  }
  const jobs = data?.data;
  return (
    <div>
      <Helmet>
        <title>Saved Jobs | Job Hunting</title>
      </Helmet>

      <h1 className="text-3xl mt-8 font-bold text-center">
        View Your Saved Jobs
      </h1>
      <div className=" mb-10 mx-auto flex flex-col items-end">
        {jobs?.length > 0 ? (
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
                            className="px-2 py-3.5 text-left text-sm font-normal text-gray-500"
                          >
                            Job Salary
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 bg-white">
                        {jobs &&
                          jobs.map((job) => (
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
                  {`You haven't Saved any jobs.`}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarked;
