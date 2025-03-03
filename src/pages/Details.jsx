import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { AuthContext } from "../provider/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const Details = () => {
  const { dark, setActive, active } = useContext(AuthContext);

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { id: dataId } = useParams();

  const {
    isLoading: isPending,
    data: data = [],
    refetch,
  } = useQuery({
    queryKey: ["collage-details"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/university/${dataId}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching blogs:", error);
        return [];
      }
    },
  });

  console.log(data);
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
            <span className="font-semibold badge ">Types: {"University"} </span>
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
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
          <p className="text-gray-600">
            Name: {name} <br /> Mail: {mail}
          </p>
          <div className="my-4">
            <div className="relative h-4 w-full bg-gray-200 rounded-full">
              <div
                className="absolute top-0 left-0 h-4 bg-yellow-500 rounded-full"
                style={{ width: "74%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-500 mt-1">74%</p>
          </div>

          <button
            onClick={() => {
              handleDonate(_id);
            }}
            className="btn btn-primary w-full my-2"
          >
            Donate Now
          </button>

          <h3 className="mt-6 text-lg font-semibold">Other Informations</h3>
          <ul className="mt-4 space-y-2">
            <li className="flex justify-between">
              <p className="font-medium">Minimum Donations Amount</p>
              <p className="text-gray-500">{minimumMoney} TK</p>
            </li>
            {/* <li className="flex justify-between">
              <p className="font-medium">Davinder Sapra</p>
              <p className="text-gray-500">$5,000</p>
            </li>
            <li className="flex justify-between">
              <p className="font-medium">Anonymous</p>
              <p className="text-gray-500">$500</p>
            </li> */}
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

export default Details;
