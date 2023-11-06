import { useLoaderData, useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import JobDetailsLoader from "../../components/JobDetailsLoader";
import useAuth from "../../hooks/useAuth";
const JobDetails = () => {
  const data = useLoaderData();
  const job = data.data;
  const [deadline, setDeadline] = useState(null);
  const { user } = useAuth();
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
  useEffect(() => {
    const originalDate = new Date(job_application_deadline);
    const year = originalDate.getFullYear();
    const month = (originalDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based, so add 1 and pad with '0'
    const day = originalDate.getDate().toString().padStart(2, "0");
    const finalDate = `${day}-${month}-${year}`;
    setDeadline(finalDate);
  }, [job_application_deadline]);

  console.log(deadline);

  const handleApply = async () => {
    const email = user?.email;
    const name = user?.displayName;

    const htmlTemplate = `
      <div>
        <input id="user-email" class="swal2-input" placeholder="Email" value="${email}" readonly>
        <input id="user-name" class="swal2-input" placeholder="Name" value="${name}" readonly>
        <input id="resume-link" type="url" required class="swal2-input" placeholder="Resume Link" value="">
      </div>`;

    const { value } = await Swal.fire({
      title: "Apply for the Job",
      html: htmlTemplate,
      showCancelButton: true,
      confirmButtonText: "Submit",
    });
    const resumeLink = document.getElementById("resume-link").value;
    if (value && resumeLink) {
      Swal.fire("Success", "Your application has been submitted.", "success");
    } else {
      Swal.fire("Canceled", "Your application was not submitted.", "error");
    }
  };

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
            <span className="font-lilita">Job Deadline: </span>
            {deadline}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Applicant Number: </span>
            {job_application_number}
          </p>
          <button
            onClick={handleApply}
            className="bg-[#7091F5] ease-in-out duration-500 hover:bg-[#793FDF] w-full py-3 text-white rounded"
          >
            Apply Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
