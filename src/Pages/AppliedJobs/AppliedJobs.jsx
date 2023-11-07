import { useQuery } from "@tanstack/react-query";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const AppliedJobs = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const { data: applications } = useQuery({
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

  console.log(applications);
  return <div></div>;
};

export default AppliedJobs;
