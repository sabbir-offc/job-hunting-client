import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";

const useTanstack = () => {
  const axios = useAxios();
  const {
    refetch,
    data: jobs,
    isLoading,
  } = useQuery({
    queryKey: ["jobs"],
    queryFn: async () => {
      try {
        const res = await axios.get(`/jobs`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });
  return { isLoading, jobs, refetch };
};

export default useTanstack;
