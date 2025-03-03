import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import useGetAllUsers from "../components/Dashboard/user/AllUsers/useGetAllUsers";
import axios from "axios";
import Loading from "../components/Loading";
import { useQuery } from "@tanstack/react-query";
import useGetAdmitionUser from "../components/Dashboard/user/AllUsers/useGetAdmitionUser";

const MyCollege = () => {
  
    const { admitedUser, refetch } = useGetAdmitionUser();

    console.log(admitedUser)

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>My College</title>
      </Helmet>
    </>
  );
};

export default MyCollege;
