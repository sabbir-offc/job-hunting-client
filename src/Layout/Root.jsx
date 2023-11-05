import { Outlet } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Footer from "../components/Footer";

const Root = () => {
  return (
    <MainLayout>
      <Outlet></Outlet>
      <Footer></Footer>
    </MainLayout>
  );
};

export default Root;
