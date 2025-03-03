import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import useGetAllUsers from "../components/Dashboard/user/AllUsers/useGetAllUsers";
import axios from "axios";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useGetAdmitionUser from "../components/Dashboard/user/AllUsers/useGetAdmitionUser";
import MyCollageDetails from "./MyCollageDetails";

const MyCollege = () => {
  
    const { admitedUser, refetch, isPending } = useGetAdmitionUser();

    if (isPending) {
        return <Loading></Loading>;
    }

    

  return (
    <>
        <div>
            <MyCollageDetails ></MyCollageDetails>
        </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My College</title>
      </Helmet>
    </>
  );
};

export default MyCollege;
