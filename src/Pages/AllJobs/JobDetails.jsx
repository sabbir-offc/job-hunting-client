import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import moduleName from "react-content-loader";
import JobDetailsLoader from "../../components/JobDetailsLoader";
const JobDetails = () => {
  const params = useParams();
  const axios = useAxios();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`/jobs/${params?.id}`).then((res) => {
      setJob(res.data);
      setLoading(false);
    });
  }, [axios, params]);

  if (loading) {
    return (
      <div className="w-full md:h-screen flex items-center justify-center">
        <JobDetailsLoader></JobDetailsLoader>
      </div>
    );
  }

  const {
    job_image,
    job_title,
    user_name,
    job_category,
    job_salary,
    job_description,
    job_posting_data,
    job_application_deadline,
    job_application_number,
  } = job;

  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Job Details | Job Hunting</title>
      </Helmet>

      <div className="grid md:grid-cols-5 gap-2">
        <div className="md:col-span-3 pr-5 border-r-2 border-[#793FDF]">
          <img src={job_image} alt="" className="rounded drop-shadow-md" />
        </div>
        <div className="md:col-span-2 pl-5 space-y-4 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl">
            <span className="font-lilita">Job Title: </span>
            {job_title}
          </h1>
          <p className="text-lg">
            <span className="font-normal font-lilita">Job Description: </span>
            {job_description}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Posted By: </span>
            {user_name}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Salary: </span>${job_salary}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Applicant Number: </span>
            {job_application_number}
          </p>
          <button className="bg-[#7091F5] w-full py-3 text-white rounded">
            Apply Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
