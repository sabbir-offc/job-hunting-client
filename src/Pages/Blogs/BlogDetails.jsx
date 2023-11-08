import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import ContentLoader from "react-content-loader";

const BlogDetails = () => {
  const { id } = useParams();
  const axios = useAxios();
  const { data, isLoading } = useQuery({
    queryKey: ["blog"],
    queryFn: async () => {
      const res = axios.get(`/blogs/${id}`);
      return res;
    },
  });
  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <ContentLoader
          width={1000}
          height={800}
          viewBox="0 0 450 400"
          backgroundColor="#7091F5"
          foregroundColor="#7091F5"
        >
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="43" y="304" rx="4" ry="4" width="271" height="9" />
          <rect x="44" y="323" rx="3" ry="3" width="119" height="6" />
          <rect x="42" y="77" rx="10" ry="10" width="388" height="217" />
        </ContentLoader>
      </div>
    );
  }
  const blog = data?.data;
  const { title, description, thumbnail } = blog;

  return (
    <div className="max-w-7xl mx-auto my-10">
      <div className="md:w-3/4 mx-auto my-10 space-y-4">
        <h2 className="font-lilita text-2xl md:text-4xl">{title}</h2>
        <img
          src={thumbnail}
          alt=""
          className="mx-auto drop-shadow-2xl rounded"
        />
      </div>

      <p className="text-lg font-medium">{description}</p>
    </div>
  );
};

export default BlogDetails;
