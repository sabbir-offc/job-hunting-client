import PropTypes from "prop-types";

const JobTable = ({ job }) => {
  const {
    job_image,
    job_title,
    logged_in_user,
    job_category,
    job_salary,
    job_application_deadline,
  } = job;
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
            <div className="text-sm opacity-80">
              Posted By: {logged_in_user}
            </div>
          </div>
        </div>
      </td>
      <td>
        {job_application_deadline} <br />
        <span className="badge badge-ghost badge-sm">{job_category}</span>
      </td>
      <td>Salary: {job_salary}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

JobTable.propTypes = {
  job: PropTypes.object,
};
export default JobTable;
