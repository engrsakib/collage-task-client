import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import App from "../App";
import LogIn from "../auth/LogIn";
import Register from "./Register";
import Fourzero from "../components/Fourzero";
import Public from "./Public";
import Privete from "./Privete";
import Dashboard from "../components/Dashboard/Dashboard";
import User from "../components/Dashboard/user/User";
import UserEdit from "../components/Dashboard/user/UserEdit";
import Collage from "../pages/Collage";
import Details from "../pages/Details";
import Admission from "../pages/Admission";
import MyCollege from "../pages/MyCollege";
import ForgottenPassword from "../auth/ForgottenPassword";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <Fourzero></Fourzero>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/colleges",
        element:  <Collage></Collage> ,
      },
      {
        path: "/colleges/:id",
        element: <Privete> <Details></Details> </Privete>,
      },
      {
        path: "/admission",
        element: <Privete> <Admission></Admission> </Privete>,
      },
      {
        path: "/my-college",
        element: <Privete> <MyCollege></MyCollege> </Privete>,
      },
      
    ],
    
  },
  // dashboard work
  {
    path: "/dashboard",
    element: (
      <Privete>
        <Dashboard></Dashboard>
      </Privete>
    ),
    children: [
      
      {
        path: "/dashboard/profile",
        element: (
          <Privete>
            <User></User>
          </Privete>
        ),
      },
      {
        path: "/dashboard/profile/edit",
        element: (
          <Privete>
            <UserEdit></UserEdit>
          </Privete>
        ),
      },
    ],
  },
  // credentials work
  {
    path: "/auth/login",
    element: (
      <Public>
        <LogIn></LogIn>
      </Public>
    ),
  },
  {
    path: "/auth/register",
    element: (
      <Public>
        <Register></Register>
      </Public>
    ),
  },
  {
    path: "/auth/reset-password",
    element: (
      <Public>
        <ForgottenPassword></ForgottenPassword>
      </Public>
    ),
  },
]);

export default router;
