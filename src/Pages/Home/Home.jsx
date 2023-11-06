import { useEffect } from "react";
import Hero from "../../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import JobCategoryTab from "../../components/JobCategoryTab";
import { Helmet } from "react-helmet";
const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <Helmet>
        <title>Home | Job Hunting</title>
      </Helmet>
      <Hero></Hero>
      <div className="my-10">
        <h2
          data-aos="zoom-out-left"
          data-aos-duration="1500"
          data-aos-once="false"
          className="text-2xl mb-5 text-[#793FDF] underline md:text-5xl lg:text-6xl text-center font-semibold"
        >
          Browse Job By Category
        </h2>
        <JobCategoryTab></JobCategoryTab>
      </div>
    </div>
  );
};

export default Home;
