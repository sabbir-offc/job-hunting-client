import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";

const JobCard = ({ job, loading }) => {
  const {
    job_image,
    job_title,
    logged_in_user,
    job_category,
    job_salary,
    job_description,
    job_posting_data,
    job_application_deadline,
    job_application_number,
  } = job;
  if (loading) {
    return <p>loadadfkajfkjaskdfjkjfkhajkhfjk</p>;
  }
  return (
    <div className="w-[300px] rounded-md border">
      <img
        src={job_image}
        alt={`image of ${job_title}`}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <h1 className="inline-flex items-center text-lg font-semibold">
          {job_title} <ArrowUpRight className="h-4 w-4" />
        </h1>
        <p className="mt-3 text-sm text-gray-600">{job_description}</p>
        <div className="mt-4">
          <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
            {job_category}
          </span>
        </div>
        <button
          type="button"
          className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read
        </button>
      </div>
    </div>
  );
};
JobCard.propTypes = {
  job: PropTypes.object,
};
export default JobCard;
