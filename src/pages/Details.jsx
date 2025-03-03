import React, { useState, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";

const Admission = () => {
  const { user } = useContext(AuthContext);
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

  const [formData, setFormData] = useState({
    candidateName: "",
    subject: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    university: "",
  });

  const [image, setImage] = useState(null);

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

    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Admission data submission
      const response = await axios.post("http://localhost:5000/admission", {
        candidateName: formData.candidateName,
        subject: formData.subject,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        dob: formData.dob,
        university: formData.university,
        userId: user._id,
        userMail: user.email,
      });

      if (response.data.success) {
        Swal.fire("Success", "Admission form submitted!", "success");

        // If Image Exists, Upload & Update User Profile
        if (image) {
          const imageData = new FormData();
          imageData.append("image", image);

          const imgResponse = await axios.post(
            `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imgbb}`,
            imageData
          );

          const imageUrl = imgResponse.data.data.url;

          await axios.patch(`http://localhost:5000/users/${user._id}`, {
            imageUrl,
          });

          Swal.fire("Success", "Profile picture updated!", "success");
        }

        setFormData({
          candidateName: "",
          subject: "",
          email: "",
          phone: "",
          address: "",
          dob: "",
          university: "",
        });
        setImage(null);
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong!", "error");
      console.error(error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Admission Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
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
          required
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
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg"
          required
        />

        <label className="block font-medium">
          Upload Profile Picture (Max 200KB, JPG/PNG)
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
          />
        </label>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Admission;
