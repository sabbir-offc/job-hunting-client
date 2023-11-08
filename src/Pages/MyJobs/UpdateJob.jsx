import { Helmet } from "react-helmet";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxios from "../../hooks/useAxios";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";

const UpdateJob = () => {
  const data = useLoaderData();
  const job = data.data;

  const {
    _id,
    job_image,
    job_title,
    job_description,
    job_category,
    minimum_salary,
    maximum_salary,
    job_posting_data,
    job_application_deadline,
  } = job;
  const [postingDate, setPostingDate] = useState(new Date(job_posting_data));
  const [deadlineDate, setDeadlineDate] = useState(
    new Date(job_application_deadline)
  );
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const axios = useAxios();
  const handleUpdateJob = (e) => {
    e.preventDefault();
    const form = e.target;
    const job_image = form.image.value;
    const job_title = form.job_title.value;
    const job_description = form.description.value;
    const job_category = form.job_category.value;
    const minimum_salary = form.minimum_salary.value;
    const maximum_salary = form.maximum_salary.value;
    const job_posting_data = postingDate;
    const job_application_deadline = deadlineDate;

    const toastId = toast.loading("Job adding...");

    const jobData = {
      job_image,
      job_title,
      job_description,
      job_category,
      minimum_salary,
      maximum_salary,
      job_posting_data,
      job_application_deadline,
    };

    axios
      .put(`/jobs/${_id}`, jobData)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          toast.success("Job Updated Successfully.", { id: toastId });
          form.reset();
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="max-w-7xl lg:mx-auto px-5 my-10">
      <Helmet>
        <title>Update Job | Job Hunting</title>
      </Helmet>
      <h1 className="text-2xl md:text-4xl lg:text-6xl text-center font-prompt text-[#7091F5]  my-6">
        Update The Job
      </h1>
      <form onSubmit={handleUpdateJob}>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="url"
            name="image"
            id="image"
            defaultValue={job_image}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="image"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Photo URL
          </label>
        </div>
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            name="job_title"
            id="job_title"
            defaultValue={job_title}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="job_title"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Title
          </label>
        </div>

        <div className="relative z-0 w-full mb-6 group">
          <select
            defaultValue={job_category}
            name="job_category"
            className="select select-bordered w-full "
          >
            <option disabled selected>
              Select Job Category
            </option>
            <option value="On Site Job">On Site Job</option>
            <option value="Remote Job">Remote Job</option>
            <option value="Hybrid">Hybrid</option>
            <option value="Part Time">Part Time</option>
          </select>
          <label
            htmlFor="job_salary"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          ></label>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="minimum_salary"
              id="minimum_salary"
              defaultValue={minimum_salary}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="minimum_salary"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Minimum Salary
            </label>
          </div>
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="text"
              name="maximum_salary"
              id="maximum_salary"
              defaultValue={maximum_salary}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
            />
            <label
              htmlFor="maximum_salary"
              className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
            >
              Maximum Salary
            </label>
          </div>
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="z-[1] w-full mb-6 group flex flex-col">
            <label
              htmlFor=""
              className="text-sm text-gray-500 duration-300 transhtmlForm origin-[0]  peer-focus:text-blue-600 peer-focus:dark:text-blue-500   "
            >
              Select Posting Date
            </label>
            <DatePicker
              selected={postingDate}
              onChange={(date) => setPostingDate(date)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
          <div className="z-[1] w-full mb-6 group flex flex-col">
            <label
              htmlFor=""
              className="text-sm text-gray-500 duration-300 transhtmlForm origin-[0]  peer-focus:text-blue-600 peer-focus:dark:text-blue-500   "
            >
              Application Deadline
            </label>
            <DatePicker
              selected={deadlineDate}
              onChange={(date) => setDeadlineDate(date)}
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            />
          </div>
        </div>
        <div className="w-full relative z-0 mb-5">
          <textarea
            type="text"
            name="description"
            id="description"
            defaultValue={job_description}
            className="resize-none block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            rows="4"
            required
          />
          <label
            htmlFor="description"
            className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Job Description
          </label>
        </div>

        <button
          type="submit"
          className="text-white ease-in-out duration-300 font-prompt bg-[#793FDF] hover:bg-[#7091F5]  font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center "
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateJob;
