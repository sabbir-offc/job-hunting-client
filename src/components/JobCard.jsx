import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  const {
    _id,
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
    <div className="w-[300px] rounded-md border">
      <img
        src={job_image}
        alt={`image of ${job_title}`}
        className="h-[200px] w-full rounded-t-md object-cover"
      />
      <div className="p-4">
        <div className="">
          <h1 className="inline-flex items-center text-lg font-semibold">
            {job_title} <ArrowUpRight className="h-4 w-4" />
          </h1>
          <p className="mt-3 text-sm text-gray-600">
            {job_description.slice(0, 30)}
          </p>
          <div className="mt-4">
            <span className="mb-2 mr-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-[10px] font-semibold text-gray-900">
              {job_category}
            </span>
          </div>
        </div>

        <div className="w-full mt-3">
          <Link
            className="w-full px-4 text-white hover:bg-[#793FDF] ease-in-out duration-500 py-2 rounded-md bg-[#7091F5]"
            to={`/job/${_id}`}
          >
            Read
          </Link>
        </div>
      </div>
    </div>
  );
};
JobCard.propTypes = {
  job: PropTypes.object,
};
export default JobCard;
