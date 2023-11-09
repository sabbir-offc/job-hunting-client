import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxios from "./useAxios";
import Swal from "sweetalert2";

const useAppliedJobs = () => {
  const axios = useAxios();
  const { user } = useAuth();
  const {
    data: applications,
    isLoading,
    refetch,
  } = useQuery({
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

  const { mutate } = useMutation({
    mutationKey: ["deleteApplication"],
    mutationFn: async (id) => {
      // Display a confirmation dialog to the user using SweetAlert
      const result = await Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel it!",
      });

      if (result.isConfirmed) {
        const response = await axios.delete(`/applications/delete/${id}`);

        if (response.data.acknowledged) {
          Swal.fire({
            title: "Canceled!",
            text: "Application Canceled successfully.",
            icon: "success",
          });

          refetch();
        }
      } else {
        Swal.fire(
          "Deletion canceled",
          "Your Application not canceled.",
          "info"
        );
      }
    },
    onError: (error) => {
      // Handle deletion error and provide feedback to the user
      console.error("Deletion failed: ", error); // You can replace this with an error message or other UI feedback
    },
  });

  return { applications, isLoading, mutate };
};

export default useAppliedJobs;
