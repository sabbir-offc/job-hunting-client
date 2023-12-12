import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
const Blogs = () => {
  const axios = useAxios();
  const [blogs, setBlogs] = useState(null);
  useEffect(() => {
    axios.get("/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, [axios]);

  return (
    <>
      <Helmet>
        <title>Blogs | Job Hunting</title>
      </Helmet>
      <div className="max-w-7xl mx-auto my-10">
        <h1 className="text-2xl mb-10 font-lilita text-center md:text-4xl">
          Blogs
        </h1>
        <div className="grid md:grid-cols-3 place-items-center gap-3">
          {blogs?.map((blog) => (
            <div
              key={blog._id}
              className="relative h-[400px] w-[300px] rounded-md"
            >
              <img
                src={blog.thumbnail}
                alt="AirMax Pro"
                className="z-0 h-full w-full rounded-md object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent"></div>
              <div className="absolute bottom-4 left-4 text-left">
                <h1 className="text-lg font-semibold text-white">
                  {blog.title}
                </h1>
                <p className="mt-2 text-sm text-gray-300">
                  {blog.description.slice(0, 100)}
                </p>
                <button className="mt-2 inline-flex cursor-pointer items-center text-sm font-semibold text-white">
                  <Link to={`/blogs/${blog._id}`}>Read &rarr;</Link>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Blogs;
