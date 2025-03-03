import React, { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet";
import { AuthContext } from "../../provider/AuthProvider";
import useGetAllUsers from "../Dashboard/user/AllUsers/useGetAllUsers";
import Clg from "../../pages/Clg";


const HomeUniversity = () => {
  const { setdark, dark, user } = useContext(AuthContext);
  const { users } = useGetAllUsers(user);

  const {
    isLoading: isPending,
    data: College = [],
    refetch,
  } = useQuery({
    queryKey: ["collage"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/university");
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });
  

  return (
    <>
        <div className="mt-20">
            <h1 className="text-3xl font-bold text-center mb-6">OUR Reputed University</h1>
        </div>
    
        <div className="container mt-20 lg:mt-36">
            {
                College.map((clg, i)=><Clg key={i} clg={clg} />)
            }
        </div>

      <Helmet>
        <meta charSet="utf-8" />
        <title>Colleges</title>
      </Helmet>
    </>
  );
};

export default HomeUniversity;
