import React, { useContext } from "react";
import { AuthContext } from "../../../../provider/AuthProvider";
import useGetAllUsers from "./useGetAllUsers";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Loading";

const useGetAdmitionUser = () => {
  const { dark, setActive, active, user } = useContext(AuthContext);
  const { users } = useGetAllUsers(user);

  const {
    isLoading: isPending,
    data: admitedUser = [],
    refetch,
  } = useQuery({
    queryKey: ["collage-myusers-admitation"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `https://collage-server-orcin.vercel.app/admission/${users?.email}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });

  return { admitedUser, refetch, isPending };
};

export default useGetAdmitionUser;
