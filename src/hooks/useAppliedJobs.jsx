import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";

const useAppliedJobs = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: applications, isLoading } = useQuery({
    queryKey: ["applications", user],
    queryFn: async () => {
      try {
        const res = await axios.get(`/applications?user_email=${user?.email}`);
        return res.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  });
  return { applications, isLoading };
};

export default useAppliedJobs;
