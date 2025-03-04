import React, { useContext, useRef, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";
import Google from "../components/Google";
import { sendPasswordResetEmail } from "firebase/auth";

const LogIn = () => {
  const { dark, logInMail, setUser, user, auth } = useContext(AuthContext);
  const location = useLocation();
  const [formData, setFormData] = useState({
    mail: "",
    password: "",
    remember: false,
  });
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    logInMail(formData.mail, formData.password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
        Swal.fire("LogIn successed", "", "success");
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire("Mail or password is wrong", "", "info");
      });
  };

  // Auto-fill Functions for Admin, User, Volunteer
  const handleAutoFill = (role) => {
    let credentials = {};
    if (role === "admin") {
      credentials = {
        mail: "tamanna1123@tamanna.com",
        password: "aaR141@1",
      };
    } else if (role === "user") {
      credentials = {
        mail: "user@example.com",
        password: "@Iuser123",
      };
    } else if (role === "volunteer") {
      credentials = {
        mail: "volunteer@example.com",
        password: "@Pvolunteer123",
      };
    }
    setFormData(credentials);
  };

  const emailRef = useRef();
  // reset
  const handleReset = ()=>{
    const email = emailRef.current.value;
    if(!email){
      Swal.fire("Please write your mail","","error");
    }else{
      sendPasswordResetEmail(auth, email)
  .then(() => {
    // Password reset email sent!
    // ..
    Swal.fire("please check your mail","","success");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
    }
  }

  return (
    <>
      <div className="flex flex-col lg:flex-row items-center min-h-screen bg-gray-100 p-4">
        {/* Left Side Image */}
        <div className="hidden lg:flex w-1/2 justify-center">
          <img
            src="https://i.ibb.co.com/XZy2mLQ7/design-community-concept-illustration-114360-1402.jpg"
            alt="login"
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        {/* Right Side Form */}
        <div className="flex flex-col justify-center items-center w-full lg:w-1/2 p-6">
          <div
            className={`relative ${
              dark ? "border border-yellow-300" : "bg-white"
            } p-8 rounded-lg shadow-md max-w-md w-full`}
          >
            <h2
              className={`text-center text-xl font-bold mb-6 ${
                dark ? "text-gray-200" : "text-gray-800"
              }`}
            >
              USER LOGIN
            </h2>
            <form onSubmit={handleSubmit}>
              {/* Mail Field */}
              <div className="mb-4">
                <input
                  type="text"
                  name="mail"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={formData.mail}
                  ref={emailRef}
                  required
                  onChange={handleChange}
                />
              </div>
              {/* Password Field */}
              <div className="mb-4 relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiFillEyeInvisible size={20} />
                  ) : (
                    <AiFillEye size={20} />
                  )}
                </div>
              </div>
              {/* Remember Me and Forgot Password */}
              <div className="flex justify-between items-center mb-6">
                <label className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    name="remember"
                    className="checkbox checkbox-primary"
                    checked={formData.remember}
                    onChange={handleChange}
                    required
                  />
                  <span>Remember Me</span>
                </label>
                <a onClick={handleReset} className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              {/* Submit Button */}
              <button type="submit" className="btn btn-primary w-full">
                LOGIN
              </button>
            </form>
            {/* Register Section */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link
                  to={`/auth/register`}
                  className=" link-info link hover:underline font-semibold"
                >
                  Register
                </Link>
              </p>
            </div>
            {/* Role Selection Buttons */}
            <div className="flex flex-wrap gap-2 justify-center mt-4">
              <button
                className="btn btn-info"
                onClick={() => handleAutoFill("admin")}
              >
                User Credentials
              </button>
              
            </div>
            <button><Google></Google></button>
          </div>
          
        </div>
      </div>
      <Helmet>
        <title>LogIn</title>
      </Helmet>
    </>
  );
};

export default LogIn;
