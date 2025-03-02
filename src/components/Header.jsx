import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { GoSun } from "react-icons/go";
import { FaMoon, FaUserCircle, FaBars } from "react-icons/fa";
import { auth } from "../Firebase/firebase.congig";
import { signOut } from "firebase/auth";
import Swal from "sweetalert2";
import useGetAllUsers from "./Dashboard/user/AllUsers/useGetAllUsers";

const Header = () => {
  const { setdark, dark, user } = useContext(AuthContext);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const [visible, setVisible] = useState(true);
  const { users } = useGetAllUsers(user);

  useEffect(() => {
    const handleScroll = () => {
      let st = window.scrollY;
      setVisible(st < lastScrollTop);
      setLastScrollTop(st);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollTop]);

  const handleSignOut = () => {
    Swal.fire({
      title: "Do you want to Sign Out?",
      showDenyButton: true,
      confirmButtonText: "Sign Out",
      denyButtonText: `Cancel`,
    }).then((result) => {
      if (result.isConfirmed) {
        signOut(auth)
          .then(() => Swal.fire("Signed Out!", "", "success"))
          .catch((error) => console.error("Sign-out error:", error));
      }
    });
  };

  const menu = (
    <>
      <NavLink to="/" className={({ isActive }) => `text-xl ${isActive ? "text-info" : "text-gray-600"}`}>
        Home
      </NavLink>
      <NavLink to="/colleges" className={({ isActive }) => `text-xl ${isActive ? "text-info" : "text-gray-600"}`}>
        Colleges
      </NavLink>
      <NavLink to="/admission" className={({ isActive }) => `text-xl ${isActive ? "text-info" : "text-gray-600"}`}>
        Admission
      </NavLink>
      <NavLink to="/my-college" className={({ isActive }) => `text-xl ${isActive ? "text-info" : "text-gray-600"}`}>
        My College
      </NavLink>
    </>
  );

  return (
    <div className={`fixed top-0 w-full transition-transform duration-300 p-3 shadow-md z-50 ${visible ? "translate-y-0" : "-translate-y-full"} ${dark ? "bg-gray-900 text-gray-50" : "bg-gray-100 text-gray-900"}`}>
      <div className="flex justify-between items-center">
        <button className="lg:hidden p-2" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <FaBars className="text-2xl" />
        </button>
        
        <Link to="/" className="text-2xl font-bold text-red-800">
          AcadEase
        </Link>
        
        <div className="hidden lg:flex space-x-6">{menu}</div>
        
        <div className="flex items-center space-x-4">
          <button onClick={() => setdark(!dark)} className="btn btn-circle">
            {dark ? <GoSun className="text-yellow-400 text-xl" /> : <FaMoon className="text-indigo-600 text-xl" />}
          </button>
          <button onClick={() => setShowUserMenu(!showUserMenu)} className="btn btn-ghost btn-circle">
            {user ? (
              <img className="w-10 h-10 rounded-full shadow-lg" src={users?.photoUrl || user?.photoURL || "https://via.placeholder.com/40"} alt="User" />
            ) : (
              <FaUserCircle className="text-2xl" />
            )}
          </button>
          
          {showUserMenu && (
            <div className={`absolute right-0 mt-2 w-40 rounded-md shadow-lg z-50 ${dark ? "bg-gray-800 text-gray-50" : "bg-gray-50 text-gray-900"}`}>
              {!user ? (
                <div className="p-2">
                  <Link to="/auth/login" className="block px-4 py-2 hover:bg-gray-200 rounded">LogIn</Link>
                  <Link to="/auth/register" className="block px-4 py-2 hover:bg-gray-200 rounded">SignUp</Link>
                </div>
              ) : (
                <div className="p-2">
                  <Link to="/dashboard/profile" className="block px-4 py-2 hover:bg-gray-200 rounded">Profile</Link>
                  <button onClick={handleSignOut} className="block w-full text-left px-4 py-2 hover:bg-gray-200 rounded">Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {showMobileMenu && (
        <div className="lg:hidden absolute left-0 top-full w-full bg-gray-200 p-4 shadow-md rounded-md z-50 flex flex-col space-y-2">
          {menu}
        </div>
      )}
    </div>
  );
};

export default Header;
