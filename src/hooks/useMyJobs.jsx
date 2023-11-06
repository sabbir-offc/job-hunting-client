import { useQuery } from "@tanstack/react-query";
import useAxios from "./useAxios";
import useAuth from "./useAuth";

const useMyJobs = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const {
    refetch,
    data: jobs,
    isLoading,
  } = useQuery({
    queryKey: ["myJobs", user, axios],
    queryFn: async () => {
      try {
        if (user) {
          const res = await axios.get(`/jobs?user_email=${user?.email}`);
          return res.data;
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });
  return { isLoading, jobs, refetch };
};

export default useMyJobs;
