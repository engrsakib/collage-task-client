import React, { useContext } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { MdMenu, MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { Helmet } from "react-helmet";
import { FaUserGraduate } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import useGetAllUsers from "./user/AllUsers/useGetAllUsers";
import Loading from "../Loading";

const Dashboard = () => {
  const {user, dark} = useContext(AuthContext);
  // console.log(user)

  const { users, refetch, isPending } = useGetAllUsers(user);

  if (isPending) {
    <Loading></Loading>;
  }
  refetch();




  const adminDashboard = (
    <>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        Home
      </NavLink>
      <NavLink
        to="/dashboard/all-users"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${
            (users?.role == "donor" || users?.role == "volunteer") && "hidden"
          }`
        }
      >
        All users
      </NavLink>
      <NavLink
        to="/dashboard/all-blood-donation-request"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${users?.role == "donor" && "hidden"}`
        }
      >
        All Blood Donation Request
      </NavLink>
      <NavLink
        to="/dashboard/content-management"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${users?.role == "donor" && "hidden"}`
        }
      >
        Content Management
      </NavLink>
    </>
  );

  const donorMenu = (
    <>
      <NavLink
        to="/dashboard"
        end
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${
            isActive ? "btn-active" : ""
          } ${(users?.role == "admin" || user?.role == "volunteer") && "hidden"}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/dashboard/my-donation-requests"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        My Donation Requests Page
      </NavLink>

      <NavLink
        to="/dashboard/create-donation-request"
        className={({ isActive }) =>
          `btn btn-outline btn-accent btn-wide ${isActive ? "btn-active" : ""}`
        }
      >
        Create Donation Request
      </NavLink>
    </>
  );

  return (
    <>
     

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Content for child routes */}
          <Outlet />
        </div>
  
        <Helmet>
        <title>{`${users.name}`}</title>
        </Helmet>
      </div>
    </>
  );
};

export default Dashboard;
