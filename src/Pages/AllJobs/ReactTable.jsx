import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAxios from "../../hooks/useAxios";
import useMyJobs from "../../hooks/useMyJobs";
import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";

const ReactTable = ({ job }) => {
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
    job_application_number,
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
    <tr className="divide-x divide-gray-200">
      <td className="whitespace-nowrap px-4 py-4">
        <div className="flex items-center">
          <div className="h-10 w-10 flex-shrink-0">
            <img
              className="h-10 w-10 mask mask-squircle object-cover"
              src={job_image}
              alt=""
            />
          </div>
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{job_title}</div>
            {location.pathname !== "/saved-jobs" && (
              <div className="text-sm text-gray-500">
                Posted By: {user_name}
              </div>
            )}
          </div>
        </div>
      </td>
      {location.pathname === "/all-jobs" && (
        <td className="px-1">
          {deadline} <br />
        </td>
      )}
      <td className="whitespace-nowrap px-4 py-4">
        <p className="text-base">
          Salary: ৳{minimum_salary} - ৳{maximum_salary}
        </p>
      </td>
      {location.pathname === "/applied-jobs" ||
      location.pathname === "/saved-jobs" ? (
        ""
      ) : (
        <td className="text-center">
          <p>{job_application_number}</p>
        </td>
      )}
      {location.pathname !== "/saved-jobs" && (
        <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500">
          {job_category}
        </td>
      )}
      {location.pathname !== "/applied-jobs" &&
        (location.pathname !== "/saved-jobs" ? (
          <th className="px-3">
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
              <Link
                to={`/job/${_id}`}
                className="btn btn-ghost btn-xs bg-[#793FDF] text-white"
              >
                Details
              </Link>
            )}
          </th>
        ) : (
          ""
        ))}
    </tr>
  );
};
ReactTable.propTypes = {
  job: PropTypes.object,
};
export default ReactTable;
