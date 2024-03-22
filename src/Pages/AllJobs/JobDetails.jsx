import { useLoaderData } from "react-router-dom";
import emailjs from "emailjs-com";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { Bookmark, BookmarkCheck } from "lucide-react";
import toast from "react-hot-toast";

const JobDetails = () => {
  const data = useLoaderData();
  const [deadline, setDeadline] = useState(null);
  const axios = useAxios();
  const { user } = useAuth();
  const email = user?.email;
  const job = data.data;
  const [bookmark, setBookmark] = useState(false);
  const {
    _id,
    job_image,
    job_title,
    user_name,
    user_email,
    minimum_salary,
    maximum_salary,
    job_category,
    job_description,
    job_application_deadline,
    job_application_number,
  } = job;

  useEffect(() => {
    const deadlineDate = new Date(job_application_deadline);
    const year = deadlineDate.getFullYear();
    const month = (deadlineDate.getMonth() + 1).toString().padStart(2, "0");
    const day = deadlineDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    setDeadline(formattedDate);
    emailjs.init("rps7HsvPhdSnjADeo");
    window.scroll(0, 0);
  }, [job_application_deadline, axios]);

  const today = new Date();
  const deadlineDate = new Date(job_application_deadline);

  const handleApply = async () => {
    const email = user?.email;
    const name = user?.displayName;
    let resumeLink = "";
    if (today > deadlineDate) {
      return Swal.fire({
        title: "Opps, Sorry!",
        text: "The Deadline for this job is over. Please try another job",
        icon: "error",
      });
    }
    const { value: formValues } = await Swal.fire({
      title: "Apply for the Job",
      html: `<form>
          <input id="user-email" class="swal2-input" placeholder="Email" value="${email}" readonly>
          <input id="user-name" class="swal2-input" placeholder="Name" value="${name}" readonly>
          <input id="resume_link" class="swal2-input" type="url" placeholder="Resume Link" required>
        </form>`,
      showCancelButton: true,
      confirmButtonText: "Submit",
      didOpen: () => {
        const resumeLinkInput = Swal.getPopup().querySelector("#resume_link");
        resumeLinkInput.addEventListener("input", (e) => {
          resumeLink = e.target.value;
        });
      },
      preConfirm: () => {
        if (!resumeLink) {
          Swal.showValidationMessage("Please enter your resume link");
        }
        return { resumeLink: resumeLink };
      },
    });

    if (formValues && formValues.resumeLink) {
      const user_email = user?.email;
      const user_name = name;
      resumeLink = formValues.resumeLink;
      const applicantInfo = {
        jobId: _id,
        job_title,
        job_image,
        job_category,
        minimum_salary,
        maximum_salary,
        user_name,
        user_email,
        resumeLink,
      };

      await axios.post("/make-application", applicantInfo).then(async (res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          const emailInfo = {
            user_name,
            user_email,
            message: `Your submitted Resume Link: ${resumeLink}`,
          };
          await emailjs
            .send(
              "service_aod4p0x",
              "template_4kwyx6h",
              emailInfo,
              "rps7HsvPhdSnjADeo"
            )
            .then(() => {
              Swal.fire(
                "Success",
                "Your application has been submitted, and a confirmation email has been sent.",
                "success"
              );
            })
            .catch((error) => {
              console.error("Failed to send email:", error);
              Swal.fire("Error", "Failed to send confirmation email", "error");
            });

          // Updating the applicant number in the database.
          axios.post(`/job-application-number/${_id}`);
        } else if (res.data.message === "You Already applied to this job.") {
          Swal.fire("Error!", `${res.data.message}`, "error");
        }
      });
    } else {
      Swal.fire("Canceled", "Your application was not submitted.", "error");
    }
  };

  const handleSave = async () => {
    setBookmark(true);
    const savedJob = {
      email,
      job_title,
      job_image,
      minimum_salary,
      maximum_salary,
      bookmark,
    };
    await axios
      .post("/saved-jobs", savedJob)
      .then((res) => {
        console.log(res.data);
        if (res.data.acknowledged) {
          toast.success("This job is saved to your bookmark");
        }
      })
      .catch((err) => console.log(err));
  };
  const progressWheel = document.querySelector(".progress");
  scroll((progress) => {
    progressWheel.style.strokeDasharray = `${progress}, 1`;
  });

  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Job Details | Job Hunting</title>
      </Helmet>

      <div className="grid md:grid-cols-5 gap-2 my-10 place-items-center px-5">
        <div className="md:col-span-3 md:pr-5 md:border-r-2 md:border-[#793FDF]">
          <img src={job_image} alt="" className="rounded drop-shadow-md" />
        </div>
        <div className="md:col-span-2 mt-5 md:mt-0 md:pl-5 space-y-4 flex flex-col justify-center">
          <h1 className="text-2xl md:text-4xl">
            <span className="font-lilita">Job Title: </span>
            {job_title}
          </h1>
          <p className="text-lg">
            <span className="font-lilita">Posted By: </span>
            {user_name}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Salary: </span>৳{minimum_salary} - ৳
            {maximum_salary}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Application Deadline: </span>
            {deadline}
          </p>
          <p className="text-lg">
            <span className="font-lilita">Applicant Number: </span>
            {job_application_number}
          </p>
          <div className="flex items-center">
            <button
              onClick={handleApply}
              disabled={user?.email === user_email ? true : false}
              className="bg-[#7091F5] disabled:bg-gray-400  ease-in-out duration-500 hover:bg-[#793FDF] w-full py-3 text-white rounded"
            >
              Apply Job
            </button>
            {bookmark ? (
              <button className="w-1/3">
                <BookmarkCheck className="text-[#7091F5] w-full h-11"></BookmarkCheck>
              </button>
            ) : (
              <button
                disabled={user?.email === user_email ? true : false}
                onClick={handleSave}
                className="w-1/3 disabled:text-gray-400 text-[#7091F5]"
              >
                <Bookmark className=" w-full h-11"></Bookmark>
              </button>
            )}
          </div>
        </div>
      </div>
      <div className="mt-10 shadow-md p-5 rounded">
        <p className="text-lg">
          <span className="font-normal font-lilita">Job Description: </span>
          {job_description}
        </p>
      </div>
    </div>
  );
};

export default JobDetails;
