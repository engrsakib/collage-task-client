import React, { useState } from "react";
import useGetAdmitionUser from "../components/Dashboard/user/AllUsers/useGetAdmitionUser";
import axios from "axios";
import Swal from "sweetalert2";

const WriteFeadBack = () => {
  const { admitedUser, isPending } = useGetAdmitionUser();
  const { university, email, candidateName } = admitedUser;

  // State to hold feedback input
  const [feedback, setFeedback] = useState("");

  // Handle feedback change
  const handleFeedbackChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare data to send to server
    const feedbackData = {
      university,
      email,
      candidateName,
      feedback,
    };

    try {
      // Send data to server using Axios
      const response = await axios.post("http://localhost:5000/feedback", feedbackData);

      // If submission is successful, clear the form and show success alert
      if (response.status === 200) {
        setFeedback("");
        Swal.fire({
          icon: "success",
          title: "Feedback submitted successfully",
          text: "Thank you for your feedback!",
        });
      }
    } catch (error) {
      console.error("Error submitting feedback:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Please try again.",
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h2 className="text-3xl font-semibold mb-4">Write Your Feedback</h2>

      <form onSubmit={handleSubmit} className="w-full max-w-lg">
        <div className="mb-4">
          <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 mb-2">
            Feedback
          </label>
          <textarea
            id="feedback"
            value={feedback}
            onChange={handleFeedbackChange}
            rows="6"
            className="w-full p-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Write your feedback here..."
            required
          />
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Submit Feedback
          </button>
        </div>
      </form>
    </div>
  );
};

export default WriteFeadBack;
