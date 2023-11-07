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
        element: <AddJob></AddJob>,
      },
      {
        path: "my-jobs",
        element: (
          <PrivateRoutes>
            <MyJobs></MyJobs>,
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
export default router;
