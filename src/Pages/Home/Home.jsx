import { useEffect } from "react";
import Hero from "../../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
import JobCategoryTab from "../../components/JobCategoryTab";
const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="max-w-7xl mx-auto">
      <Hero></Hero>
      <div className="my-10">
        <h2 className="text-2xl mb-5 text-[#793FDF] underline hover:scale-110 duration-500 ease-in-out md:text-5xl lg:text-6xl text-center font-semibold">
          Browse Job By Category
        </h2>
        <JobCategoryTab></JobCategoryTab>
      </div>
    </div>
  );
};

export default Home;
