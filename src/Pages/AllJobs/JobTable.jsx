import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useMyJobs from "../../hooks/useMyJobs";

const JobTable = ({ job }) => {
  const location = useLocation();
  const axios = useAxios();
  const { refetch, jobs } = useMyJobs();
  const {
    _id,
    job_image,
    job_title,
    user_name,
    job_category,
    job_salary,
    job_application_deadline,
  } = job;

  console.log(jobs);
  const handleDelete = (id) => {
    axios.delete(`/jobs/delete/${id}`).then((res) => {
      if (res.data.deletedCount > 0) {
        alert("Deleted product.");
        return refetch();
      }
    });
  };

  return (
    <tr>
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={job_image} alt={`image of ${job_title}`} />
            </div>
          </div>
          <div>
            <div className="font-bold">{job_title}</div>
            <div className="text-sm opacity-80">Posted By: {user_name}</div>
          </div>
        </div>
      </td>
      {location.pathname === "/all-jobs" && (
        <td>
          {job_application_deadline} <br />
          <span className="badge badge-ghost badge-sm">{job_category}</span>
        </td>
      )}
      {location.pathname === "/all-jobs" && <td>Salary: {job_salary}</td>}
      <th>
        {location.pathname === "/my-jobs" ? (
          <div className="space-x-2">
            <button className="rounded-lg bg-[#793FDF] text-white  btn-sm">
              Update
            </button>
            <button
              onClick={() => handleDelete(_id)}
              className="rounded-lg bg-[#7091F5] text-white  btn-sm"
            >
              Delete
            </button>
          </div>
        ) : (
          <button className="btn btn-ghost btn-xs">Details</button>
        )}
      </th>
    </tr>
  );
};

JobTable.propTypes = {
  job: PropTypes.object,
};
export default JobTable;
