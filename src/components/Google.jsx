import React, { useContext } from "react";
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from "../provider/AuthProvider";
import { useNavigate } from "react-router-dom";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from "sweetalert2";
import Loading from "./Loading";

const Google = () => {
  const { setUser, setLoadding, Loading, user } = useContext(AuthContext);

  const navigate = useNavigate();
  const handleGoogleLogin = () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    if (Loading) {
      return <Loading></Loading>;
    }

    signInWithPopup(auth, provider)
      .then((result) => {
        const users = result.user;

        const name = users?.displayName;
        const photoUrl = users?.photoURL;
        const email = users?.email;

        const newUser = {
          name,
          email,
          photoUrl,
          crateDate: users?.metadata?.creationTime,
          lastSignInDate: users?.metadata?.lastSignInTime,
          status: "active",
          role: "user",
        };

        if (!user || user.mail !== users.email) {
          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(newUser),
          })
            .then((res) => res.json())
            .then((data) => {
              setLoadding(true);
              setUser(newUser);
              Swal.fire("User LogIn success", "", "success");
              setLoadding(false);
              navigate("/");
            })
            .catch((error) => {
              console.error("Error saving user:", error);
              Swal.fire("Failed to save user data.");
            });
        }
      })
      .catch((error) => {
        console.error("Google Sign-In Error:", error);
        Swal.fire("Something went wrong during login!");
      });
  };
  return (
    <div className="flex justify-center mt-4">
      <div
        className="btn bg-red-300 hover:bg-red-500 text-white flex items-center gap-2 px-4 py-2 rounded-lg"
        onClick={handleGoogleLogin}
      >
        <FcGoogle className="text-xl" /> {/* Google icon */}
        Login with Google
      </div>
    </div>
  );
};

export default Google;
