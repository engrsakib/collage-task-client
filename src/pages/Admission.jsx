import React, { useContext, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import useGetAllUsers from "../components/Dashboard/user/AllUsers/useGetAllUsers";
import Loading from "../components/Loading";

const Admission = () => {
  const { dark, setActive, user } = useContext(AuthContext);
  const { users, isPending } = useGetAllUsers(user);
  const navigate = useNavigate();
  const universities = [
    "East West University",
    "Southeast University",
    "University of Liberal Arts Bangladesh",
    "Dhaka International University",
    "American International University-Bangladesh",
    "Independent University, Bangladesh",
    "BRAC University",
    "North South University",
  ];

  if (isPending) {
    return <Loading></Loading>;
  }

  const [formData, setFormData] = useState({
    candidateName: users.name,
    subject: "",
    email: users.email,
    phone: "",
    address: users.district,
    upazila: users.upazila,
    dob: "",
    university: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      Swal.fire("Error", "Please select an image", "error");
      return;
    }

    if (file.size > 200 * 1024) {
      Swal.fire("Error", "Image size must be less than 200KB", "error");
      return;
    }

    if (!file.type.startsWith("image/")) {
      Swal.fire("Error", "Only JPG and PNG images are allowed", "error");
      return;
    }

    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) {
      Swal.fire("Error", "Please upload an image", "error");
      return;
    }

    const imageData = new FormData();
    imageData.append("image", formData.image);

    try {
      // Upload image to ImgBB
      const imgResponse = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,
        imageData
      );

      const imageUrl = imgResponse.data.data.url;

      // Send data to backend
      const response = await axios.post(
        "https://collage-server-orcin.vercel.app/admission",
        {
          candidateName: formData.candidateName,
          subject: formData.subject,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          dob: formData.dob,
          university: formData.university,
          image: imageUrl,
        }
      );

      if (response) {
        Swal.fire(
          "Success",
          "Admission form submitted successfully!",
          "success"
        );
        navigate("/my-college");

        const response = await axios.put(
          `https://collage-server-orcin.vercel.app/users/role/${users?._id}`,
          {
            university: formData.university,
          }
        );

        setFormData({
          candidateName: "",
          subject: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          university: "",
          image: null,
        });
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <>
      <div className="max-w-lg mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Admission Form</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* University Selection */}
          <label className="block font-medium">
            Select University
            <select
              name="university"
              value={formData.university}
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
              required
            >
              <option value="">Choose a university</option>
              {universities.map((uni, index) => (
                <option key={index} value={uni}>
                  {uni}
                </option>
              ))}
            </select>
          </label>

          {/* Input Fields */}
          <input
            type="text"
            name="candidateName"
            value={formData.candidateName}
            onChange={handleChange}
            placeholder="Candidate Name"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            placeholder="Subject"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Candidate Email"
            className="w-full p-2 border rounded-lg"
            readOnly
          />
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Candidate Phone Number"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded-lg"
            required
          />

          <input
            type="text"
            name="address"
            value={formData.upazila}
            onChange={handleChange}
            placeholder="Address"
            className="w-full p-2 border rounded-lg"
            required
          />
          <input
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />

          {/* Image Upload */}
          <label className="block font-medium">
            Upload Image (Max 200KB, JPG/PNG)
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
      <Helmet>
        <title>Admission Form</title>
      </Helmet>
    </>
  );
};

export default Admission;
