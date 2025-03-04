import React, { useContext } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const ResearchWorks = () => {
  const { dark } = useContext(AuthContext);

  const { isLoading, data: research = [] } = useQuery({
    queryKey: ["collage-home-researchApp"],
    queryFn: async () => {
      try {
        const response = await axios.get(
          "https://collage-server-orcin.vercel.app/research"
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching research papers:", error);
        return [];
      }
    },
  });

  if (isLoading) {
    return <div className="text-center text-xl py-10">Loading...</div>;
  }

  return (
    <div className={`min-h-screen py-10 px-5 `}>
      {research.map((uni, index) => (
        <div key={index} className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-center border-b pb-2">
            {uni.university}
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {uni.research_papers.map((paper, idx) => (
              <div
                key={idx}
                className={`rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition duration-300 ${
                  dark ? "bg-gray-800" : "bg-white"
                }`}
              >
                <img
                  src={paper.photoUrl}
                  alt={paper.topic}
                  className="w-full h-48 object-cover"
                />
                <div className="p-5">
                  <h3 className="text-xl font-semibold">{paper.topic}</h3>
                  <p className="text-sm text-gray-400">By {paper.writer}</p>
                  <p className="text-sm text-gray-500">
                    Journal: {paper.journal}
                  </p>
                  <p className="text-xs text-gray-500">
                    Published: {paper.published_date}
                  </p>
                  <a
                    href={paper.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                  >
                    View Research
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResearchWorks;
