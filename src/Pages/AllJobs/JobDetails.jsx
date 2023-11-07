import { useLoaderData } from "react-router-dom";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
const JobDetails = () => {
  const data = useLoaderData();
  const job = data.data;
  const axios = useAxios();

  const [deadline, setDeadline] = useState(null);
  const { user } = useAuth();
  const {
    _id,
    job_image,
    job_title,
    user_name,
    user_email,
    job_salary,
    job_description,
    job_application_deadline,
    job_application_number,
  } = job;
  const today = new Date();
  const deadlineDate = new Date(job_application_deadline);

  useEffect(() => {
    const deadlineDate = new Date(job_application_deadline);
    const year = deadlineDate.getFullYear();
    const month = (deadlineDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = deadlineDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    setDeadline(formattedDate);
  }, [job_application_deadline]);

  const handleApply = async () => {
    const email = user?.email;
    const name = user?.displayName;

    const htmlTemplate = `
      <div>
        <input id="user-email" class="swal2-input" placeholder="Email" value="${email}" readonly>
        <input id="user-name" class="swal2-input" placeholder="Name" value="${name}" readonly>
        <input id="resume_link" type="url" name="resumeLink" required class="swal2-input" placeholder="Resume Link" value="">
      </div>`;

    if (today > deadlineDate) {
      return Swal.fire({
        title: "Opps, Sorry!",
        text: "The Deadline for this job is over. Please try to another job",
        icon: "error",
      });
    } else {
      const { value } = await Swal.fire({
        title: "Apply for the Job",
        html: htmlTemplate,
        showCancelButton: true,
        confirmButtonText: "Submit",
      });
      const user_email = document.getElementById("user-email").value;
      const user_name = document.getElementById("user-name").value;
      const resumeLink = document.getElementById("resume_link").value;
      const applicantInfo = {
        job_title,
        job_image,
        job_salary,
        user_name,
        user_email,
        resumeLink,
      };
      if (value && resumeLink) {
        await axios.post("/make-application", applicantInfo).then((res) => {
          if (res.data.acknowledged) {
            Swal.fire(
              "Success",
              "Your application has been submitted.",
              "success"
            );
          }
        });
        await axios
          .post(`/job-application-number/${_id}`)
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));
      } else {
        Swal.fire("Canceled", "Your application was not submitted.", "error");
      }
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
            disabled={user?.email === user_email ? true : false}
            className="bg-[#7091F5] disabled:bg-gray-400  ease-in-out duration-500 hover:bg-[#793FDF] w-full py-3 text-white rounded"
          >
            Apply Job
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
