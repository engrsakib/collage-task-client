import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading";

const fetchSearchResults = async (search) => {
  if (!search) return [];
  const { data } = await axios.get(`http://localhost:5000/university/search/${search}`);
  return data;
};

const fetchResearchData = async () => {
  try {
    const response = await axios.get("http://localhost:5000/research");
    return response.data;
  } catch (error) {
    console.error("Error fetching research papers:", error);
    return [];
  }
};

const Search = () => {
  const [search, setSearch] = useState("");
  
  const { data: results, isLoading: isLoadingSearch } = useQuery({
    queryKey: ["search", search],
    queryFn: () => fetchSearchResults(search),
    enabled: !!search,
  });

  const { data: research = [], isLoading: isLoadingResearch } = useQuery({
    queryKey: ["collage-home-researchApp"],
    queryFn: fetchResearchData,
  });

  return (
    <div className="w-full flex justify-center items-center p-4">
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Search university..."
          value={search}
          onChange={(e) => setSearch(e?.target?.value)}
          className="w-full p-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 input input-success"
        />
        {search && results?.length > 0 && (
          <ul className="absolute w-full bg-white border border-gray-300 mt-2 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {isLoadingSearch ? (
              <Loading />
            ) : (
              results?.map((university) => (
                <li key={university.id} className="p-3 flex justify-between items-center hover:bg-gray-100 cursor-pointer">
                  <span>{university.name}</span>
                  <a href={`/colleges/${university._id}`} className="text-blue-500">Details</a>
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Search;
