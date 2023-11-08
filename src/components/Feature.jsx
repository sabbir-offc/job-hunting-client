import { Copy, Code, Heart, Filter, Text, Bookmark } from "lucide-react";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const Feature = () => {
  const axios = useAxios();
  const [jobs, setJobs] = useState(null);
  useEffect(() => {
    axios.get("/jobs").then((res) => setJobs(res.data));
  }, [axios]);
  return (
    <section className="my-10">
      <div className="mx-auto max-w-7xl px-2 lg:px-8">
        <div className="mb-4 max-w-lg">
          <p className="text-lg font-semibold uppercase tracking-widest text-black">
            {jobs?.length}+ Jobs
          </p>
          <h2 className="mt-6 text-3xl font-bold leading-tight text-black">
            In This Website
          </h2>
        </div>
        <hr />
        <div className="mt-8 grid grid-cols-1 items-center gap-8 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-start">
            <Filter className="h-9 w-9 text-gray-700"></Filter>
            <div className="ml-5 flex-1">
              <h3 className="text-xl font-semibold text-black">
                Job Filtering System
              </h3>
              <p className="mt-3 text-base text-gray-600">
                {`We've enhanced the applied jobs page to give you more control
                over your job search. Now, you can easily filter your applied
                jobs by category, making it simpler to find the opportunities
                that align with your career goals.`}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Text className="h-9 w-9 text-gray-700"></Text>
            <div className="ml-5 flex-1">
              <h3 className="text-xl font-semibold text-black">
                Easy to post job
              </h3>
              <p className="mt-3 text-base text-gray-600">
                {`Our intuitive job posting page simplifies the process of reaching top talent and filling open positions with qualified candidates. With just a few clicks, you can seamlessly create detailed job postings that attract the right applicants.Effortless Job Posting in Minutes.`}
              </p>
            </div>
          </div>
          <div className="flex items-start">
            <Bookmark className="h-9 w-9 text-gray-700"></Bookmark>
            <div className="ml-5 flex-1">
              <h3 className="text-xl font-semibold text-black">
                You Can Save a Job
              </h3>
              <p className="mt-3 text-base text-gray-600">
                {`Saving Jobs for Later
In today's fast-paced world, it's easy to lose track of important information. That's why many online job portals allow users to save jobs for later reference. This feature is especially useful for job seekers who are actively applying for positions.`}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
