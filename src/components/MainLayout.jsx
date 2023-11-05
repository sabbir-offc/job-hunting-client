import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MainLayout = ({ children }) => {
  const links = (
    <>
      <li>
        <NavLink>Home</NavLink>
      </li>
      <li>
        <NavLink>All Jobs</NavLink>
      </li>
      <li>
        <NavLink>Applied Jobs</NavLink>
      </li>
      <li>
        <NavLink>Add a Jobs</NavLink>
      </li>
      <li>
        <NavLink>My Jobs</NavLink>
      </li>
      <li>
        <NavLink>Blogs</NavLink>
      </li>
    </>
  );
  return (
    <div className="drawer bg-base-300">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* Navbar */}
        <div className="w-full navbar max-w-7xl mx-auto">
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
              <img
                src="/src/assets/web-logo.png"
                alt="logo"
                className="w-14 "
              />
              <div className="px-2 mx-2 font-kanit">Hunting</div>
            </div>
            <div className="hidden lg:block">
              <ul className="menu menu-horizontal space-x-3">{links}</ul>
            </div>
            <div className=" dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">
                    Profile
                    <span className="badge">New</span>
                  </a>
                </li>
                <li>
                  <a>Settings</a>
                </li>
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="min-h-screen py-3 w-2/3 bg-base-100">
          <img
            src="/src/assets/web-logo.png"
            alt="logo"
            className="w-12 mx-auto"
          />
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
