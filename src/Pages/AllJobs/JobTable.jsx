import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useMyJobs from "../../hooks/useMyJobs";
import Swal from "sweetalert2";

const JobTable = ({ job }) => {
  const location = useLocation();
  const axios = useAxios();
  const { refetch } = useMyJobs();
  const {
    _id,
    job_image,
    job_title,
    user_name,
    job_category,
    job_salary,
    job_application_deadline,
  } = job;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`/jobs/delete/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            return refetch();
          }
        });
        return Swal.fire({
          title: "Deleted!",
          text: "Job Deleted Successfull.",
          icon: "success",
        });
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
            <Link
              to={`/update-job/${_id}`}
              className="rounded-lg py-1 bg-[#793FDF] text-white  btn-sm"
            >
              Update
            </Link>
            <button
              onClick={() => handleDelete(_id)}
              className="rounded-lg bg-[#7091F5] text-white  btn-sm"
            >
              Delete
            </button>
          </div>
        ) : (
          <Link to={`/job/${_id}`} className="btn btn-ghost btn-xs">
            Details
          </Link>
        )}
      </th>
    </tr>
  );
};

JobTable.propTypes = {
  job: PropTypes.object,
};
export default JobTable;
