import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import Loading from "../components/Loading";
import { AuthContext } from "../provider/AuthProvider";
import useGetAllUsers from "../components/Dashboard/user/AllUsers/useGetAllUsers";

const Feedback = () => {
  const { user, dark } = useContext(AuthContext);
  const { users,  } = useGetAllUsers(user);  


  const {
    isLoading: isPending,
    data: feedback = [],
    refetch,
  } = useQuery({
    queryKey: ["collage-home-feedback"],
    queryFn: async () => {
      try {
        const response = await axios.get("http://localhost:5000/feedBack");
        return response.data;
      } catch (error) {
        console.error("Error fetching feedback:", error);
        return [];
      }
    },
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  // Change card every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedback.length);
    }, 10000); // 10000ms = 10 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [feedback.length]);

  if (isPending) {
    return <Loading />;
  }

  return (
    <div
      className={`${
        dark ? "" : ""
      } py-10 px-4`}
    >
      <div className="max-w-screen-xl mx-auto">
        <h2
          className={`text-3xl font-semibold text-center mb-6 ${
            dark ? "text-white" : "text-gray-900"
          }`}
        >
        
        </h2>
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6`}
        >
          {feedback.map((item, index) => {
            const { university, email, candidateName, feedback: userFeedback } =
              item;
            return (
              <div
                key={index}
                className={`p-6 rounded-lg shadow-lg transition-all ${
                  dark ? "bg-gray-800 text-white" : "bg-white text-gray-900"
                }`}
              >
                <h3
                  className={`text-xl font-semibold mb-2 ${
                    dark ? "text-yellow-400" : "text-blue-600"
                  }`}
                >
                  {university}
                </h3>
                <p
                  className={`text-sm mb-2 ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Email:</strong> {email}
                </p>
                <p
                  className={`text-sm mb-2 ${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  <strong>Candidate:</strong> {candidateName}
                </p>
                <p
                  className={`mt-2 text-lg ${
                    dark ? "text-gray-200" : "text-gray-800"
                  }`}
                >
                  {userFeedback}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
