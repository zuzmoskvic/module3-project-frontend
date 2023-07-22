import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function ProfilePage() {
  const { logOutUser, user, removeToken, setUser, setIsLoggedIn } = useContext(AuthContext);
  console.log(user);
 const userId = user._id
 console.log(userId, "userId??")

  console.log(user, "user from profile")

  const navigate = useNavigate();
  
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        const gotToken = localStorage.getItem("authToken");
        if (gotToken) {
          await axios.delete(`${API_URL}/profile`, {
            headers: { authorization: `Bearer ${gotToken}` },
          });
          removeToken();
          setUser(null);
          setIsLoggedIn(false);
          navigate("/login");
        }
      } catch (err) {
        console.log("There was an error while eliminating the user account", err);
      }
    }
  };

  return (
    <Layout>
    <div>
      <div>
        <h1>ProfilePage</h1>
      </div>
      <div>
        <h1>user email: {user && user.email}</h1>
      </div>
      <div>
        <h1>Profile Photo</h1>
        {user && <img src={user.userImage} alt="User" />}
      </div>
      <button onClick={handleDeleteAccount}>Delete Account</button>
      <button onClick={logOutUser}>Logout</button>
     <Link to={`/editUser/${user._id}`}><button>Edit your user</button></Link>
     <Link to={"/addRecord"}><button>Add record</button></Link>
     <Link to={"/transcribe"}><button>Add transcribe</button></Link>
    </div>
    </Layout>
  );
}

export default ProfilePage;
