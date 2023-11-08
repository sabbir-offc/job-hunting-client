import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import useMyJobs from "../../hooks/useMyJobs";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";

const JobTable = ({ job }) => {
  const location = useLocation();
  const axios = useAxios();
  const { refetch } = useMyJobs();
  const [deadline, setDeadline] = useState(null);

  const {
    _id,
    job_image,
    job_title,
    user_name,
    job_category,
    minimum_salary,
    maximum_salary,
    job_application_deadline,
  } = job;
  useEffect(() => {
    const deadlineDate = new Date(job_application_deadline);
    const year = deadlineDate.getFullYear();
    const month = (deadlineDate.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
    const day = deadlineDate.getDate().toString().padStart(2, "0");
    const formattedDate = `${day}-${month}-${year}`;
    setDeadline(formattedDate);
  }, [job_application_deadline]);
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
    <tr className="bg-base-300">
      <td>
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={job_image} alt={`image of ${job_title}`} />
            </div>
          </div>
          <div>
            <div className="font-bold">{job_title}</div>
            {location.pathname === "/applied-jobs" ? (
              ""
            ) : (
              <div className="text-sm opacity-80">Posted By: {user_name}</div>
            )}
          </div>
        </div>
      </td>
      {location.pathname === "/all-jobs" && (
        <td>
          {deadline} <br />
        </td>
      )}
      {location.pathname === "/my-jobs" ? (
        ""
      ) : (
        <td className="w-fit">
          <p className="text-base">
            Salary: ৳{minimum_salary} - ৳{maximum_salary}
          </p>
        </td>
      )}
      {location.pathname === "/all-jobs" && (
        <td>
          <p>{job_category}</p>
        </td>
      )}
      <th>
        {location.pathname === "/my-jobs" && (
          <div className="items-center justify-center flex gap-3">
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
        )}
        {location.pathname === "/all-jobs" && (
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
