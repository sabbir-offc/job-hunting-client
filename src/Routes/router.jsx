import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Home from "../Pages/Home/Home";
import Error from "../Pages/Error/Error";
import AllJobs from "../Pages/AllJobs/AllJobs";
import AddJob from "../Pages/AddJob/AddJob";

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
        path: "add-job",
        element: <AddJob></AddJob>,
      },
    ],
  },
]);
export default router;
