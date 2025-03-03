import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../components/Loading";
import useGetAdmitionUser from "../components/Dashboard/user/AllUsers/useGetAdmitionUser";

const MyCollageDetails = () => {
  const { dark, setActive, active } = useContext(AuthContext);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { admitedUser, isPending } = useGetAdmitionUser();
  
  console.log(admitedUser)
  const {
    university} = admitedUser;

    console.log(university)
  const {
    isLoading: isPendings,
    data: data = {},
    refetch,
  } = useQuery({
    queryKey: ["my-collage-details-university"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/my-university/${university}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });

  if (isPending || isPendings) {
    return <Loading></Loading>;
  }

  //   console.log(data);
  const {
    _id,
    name,
    mail,
    title,
    photoURL,
    type,
    description,
    moneyNedd,
    minimumMoney,
    deadline,
  } = data;

  // donetation section handel
  const handleDonate = (id) => {
    if (active) {
      if (name === user.name) {
        Swal.fire({
          icon: "error",
          title: "Donation Faild",
          text: `You can't donated in your own campagion`,
        });
        return;
      }
      navigate(`/donation/all-campagion/details/donated/${id}`);
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Donations date!",
      });
    }
  };
  return (
    <>
      <div className="flex flex-col mt-12 lg:flex-row gap-8 px-6 lg:px-16 py-8">
        {/* Left Section */}
        <div className="flex-1">
          <img
            src={data?.images[0]}
            alt="Fundraiser"
            className="rounded-lg shadow-md w-full h-[400px] object-cover"
          />
          <h1 className="text-3xl font-bold mt-4">{data?.name}</h1>
          <p className="text-gray-600 mt-2">
            <span className="font-semibold badge ">
              Types: {"Private University"}{" "}
            </span>
          </p>
          <div
            className={`${
              active ? "bg-info" : "bg-red-400"
            } mt-4 p-4 rounded-md`}
          >
            <p className="text-sm font-medium">
              <i className="fas fa-shield-alt mr-2 text-white">
                {active ? "Admisson on going" : "Closed"}
              </i>
            </p>
          </div>
          <p
            className={`${
              dark ? "text-gray-200" : "text-gray-800"
            } mt-4 text-justify`}
          >
            {data?.descriptions}
          </p>
          <img
            src={data?.images[1]}
            alt="Fundraiser"
            className="rounded-lg shadow-md w-full h-[400px] object-cover"
          />
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <h3 className="mt-6 text-lg font-semibold">Admission Requirment</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <p className="font-medium">Applications Fees</p>
              <p className="text-gray-500">
                {data?.admission_process?.fees?.application_fee}
              </p>
            </li>

            <li className="flex justify-between">
              <p className="font-medium">Semister Fees</p>
              <p className="text-gray-500">
                {data?.admission_process?.fees?.semester_fee}
              </p>
            </li>

            <li className="flex justify-between">
              <p className="font-medium">Admission Process</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.admission_process?.requirements?.map((req, index) => (
                    <p key={index} className="text-gray-700">
                      {req}
                    </p>
                  ))}
                </p>
              </div>
            </li>

            <h3 className="mt-6 text-lg font-semibold">Events</h3>

            <p
              className={`${
                dark ? "text-gray-200" : "text-gray-800"
              } mt-4 text-justify`}
            >
              {data?.events?.descriptions}
            </p>

            <li className="flex justify-between">
              <p className="font-medium">Academic</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.events?.academic?.map((event, index) => (
                    <p key={index} className="text-gray-700">
                      {event}
                    </p>
                  ))}
                </p>
              </div>
            </li>

            <li className="flex justify-between">
              <p className="font-medium">cultural</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.events?.cultural?.map((event, index) => (
                    <p key={index} className="text-gray-700">
                      {event}
                    </p>
                  ))}
                </p>
              </div>
            </li>

            <li className="flex justify-between">
              <p className="font-medium">technical</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.events?.technical?.map((event, index) => (
                    <p key={index} className="text-gray-700">
                      {event}
                    </p>
                  ))}
                </p>
              </div>
            </li>

            <h3 className="mt-6 text-lg font-semibold">Research Works</h3>
            <li className="flex justify-between">
              <p className="font-medium">Title</p>
              <p className="text-gray-500">{data?.research_works[0]?.title}</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Department</p>
              <p className="text-gray-500">
                {data?.research_works[0]?.department}
              </p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Publication Link</p>
              <a
                href={data?.research_works[0]?.publication_link}
                className="btn btn-sm "
              >
                Read Article
              </a>
            </li>

            <h3 className="mt-6 text-lg font-semibold">Sports Categories</h3>
            <li className="flex justify-between">
              <p className="font-medium">Facilities</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.sports?.facilities?.map((facility, index) => (
                    <p key={index} className="text-gray-700">
                      {facility}
                    </p>
                  ))}
                </p>
              </div>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Teams</p>
              <div className="flex flex-col">
                <p className="text-gray-500 text-right">
                  {data?.sports?.teams?.map((facility, index) => (
                    <p key={index} className="text-gray-700">
                      {facility}
                    </p>
                  ))}
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Donations Details</title>
      </Helmet>
    </>
  );
};

export default MyCollageDetails;
