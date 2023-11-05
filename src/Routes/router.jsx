import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
      {
        path: "/",
      },
      {
        path: "login",
        element: <Login></Login>,
      },
      {
        path: "register",
        element: <Register></Register>,
      },
    ],
  },
]);
export default router;
