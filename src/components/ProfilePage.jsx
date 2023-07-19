import React, { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const { logOutUser, user, removeToken, setUser, setIsLoggedIn } = useContext(AuthContext);
  console.log(user);
  const {id} = useParams();

  const navigate = useNavigate();
  
  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete) {
      try {
        const gotToken = localStorage.getItem("authToken");
        if (gotToken) {
          await axios.delete("http://localhost:5005/profile", {
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
    </div>
  );
}

export default ProfilePage;
