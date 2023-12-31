import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AllJobs from "../Pages/AllJobs/AllJobs";
import AddJob from "../Pages/AddJob/AddJob";
import MyJobs from "../Pages/MyJobs/MyJobs";
import PrivateRoutes from "./PrivateRoutes";
import JobDetails from "../Pages/AllJobs/JobDetails";
import useAxios from "../hooks/useAxios";
import UpdateJob from "../Pages/MyJobs/UpdateJob";
import AppliedJobs from "../Pages/AppliedJobs/AppliedJobs";
import Blogs from "../Pages/Blogs/Blogs";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import CreateBlog from "../Pages/Blogs/CreateBlog";
import Bookmarked from "../Pages/Bookmarked/Bookmarked";
import UpdateUserProfile from "../Pages/UpdateUserProfile/UpdateUserProfile";

const axios = useAxios();
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    errorElement: <Error></Error>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
      {
        path: "all-jobs",
        element: <AllJobs></AllJobs>,
      },
      {
        path: "job/:id",
        element: (
          <PrivateRoutes>
            <JobDetails></JobDetails>,
          </PrivateRoutes>
        ),
        loader: ({ params }) => axios.get(`/jobs/${params.id}`),
      },
      {
        path: "update-job/:id",
        element: (
          <PrivateRoutes>
            <UpdateJob></UpdateJob>
          </PrivateRoutes>
        ),
        loader: ({ params }) => axios.get(`/jobs/${params.id}`),
      },
      {
        path: "add-job",
        element: (
          <PrivateRoutes>
            <AddJob></AddJob>,
          </PrivateRoutes>
        ),
      },
      {
        path: "create-blog",
        element: <CreateBlog></CreateBlog>,
      },
      {
        path: "blogs",
        element: <Blogs></Blogs>,
      },
      {
        path: "blogs/:id",
        element: <BlogDetails></BlogDetails>,
      },
      {
        path: "update-profile",
        element: <UpdateUserProfile />,
      },
      {
        path: "my-jobs",
        element: (
          <PrivateRoutes>
            <MyJobs></MyJobs>,
          </PrivateRoutes>
        ),
      },
      {
        path: "applied-jobs",
        element: (
          <PrivateRoutes>
            <AppliedJobs></AppliedJobs>
          </PrivateRoutes>
        ),
      },
      {
        path: "bookmarked-jobs",
        element: (
          <PrivateRoutes>
            <Bookmarked></Bookmarked>
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;
