import { useEffect } from "react";
import Hero from "../../components/Hero";
import AOS from "aos";
import "aos/dist/aos.css";
const Home = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div>
      <Hero></Hero>
    </div>
  );
};

export default Home;
