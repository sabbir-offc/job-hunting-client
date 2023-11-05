import { Outlet } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Footer from "../components/Footer";
import { Toaster } from "react-hot-toast";

const Root = () => {
  return (
    <MainLayout>
      <Outlet></Outlet>
      <Footer></Footer>
      <Toaster></Toaster>
    </MainLayout>
  );
};

export default Root;
