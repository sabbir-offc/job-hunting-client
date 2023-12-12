import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import toast from "react-hot-toast";

const MainLayout = ({ children }) => {
  //getting the user info for rendering conditionally user image.
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("log Out Successfull.");
      })
      .catch(() => {
        toast.error("Logout Failed.");
      });
  };
  const links = (
    <>
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/all-jobs">All Jobs</NavLink>
      </li>

      {user && (
        <div className="flex lg:items-center gap-3 flex-col lg:flex-row">
          <li>
            <NavLink to="/add-job">Add a Job</NavLink>
          </li>
          <li>
            <NavLink to="/my-jobs">My Jobs</NavLink>
          </li>
        </div>
      )}
      <li>
        <NavLink to="/blogs">Blogs</NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer bg-base-300 relative">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col font-kanit">
        {/* Navbar */}
        <div className="w-full navbar max-w-7xl mx-auto sticky top-0 backdrop-blur-xl rounded-b-xl z-[1] lg:z-50">
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer-3"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          <div className="flex w-full justify-around backdrop-blur-lg">
            <div className="flex items-center">
              <img src="/web-logo.png" alt="logo" className="w-14 " />
              <div className="px-2 mx-2 font-kanit">Hunting</div>
            </div>
            <div className="hidden lg:block">
              <ul className="menu menu-horizontal space-x-3">{links}</ul>
            </div>

            <div className="flex items-center gap-4">
              {!user ? (
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold rounded-md border-2 border-[#7091F5] px-4 py-2"
                      : "bg-[#7091F5] font-medium text-white px-4 py-2 "
                  }
                >
                  Login
                </NavLink>
              ) : (
                <div className="dropdown dropdown-end">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-10 rounded-full">
                      <img src={user.photoURL} />
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <p>{user.displayName}</p>
                    </li>
                    <li>
                      <Link to="/applied-jobs">Applied Jobs</Link>
                    </li>
                    <li>
                      <Link to="/bookmarked-jobs">Saved Jobs</Link>
                    </li>
                    <li>
                      <Link to="/update-profile"> Update Profile</Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogOut}
                        className="bg-[#7091F5] text-[#FFFD8C]"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side z-10">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="min-h-screen py-3 w-2/3 z-50 bg-white">
          <img src="/web-logo.png" alt="logo" className="w-12 mx-auto" />
          <ul className="menu p-1 space-y-3">{links}</ul>
        </div>
      </div>
    </div>
  );
};
MainLayout.propTypes = {
  children: PropTypes.node,
};
export default MainLayout;
