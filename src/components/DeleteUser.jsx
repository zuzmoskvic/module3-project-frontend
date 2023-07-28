import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function DeleteUser() {
  const { logOutUser } = useContext(AuthContext);
  const { userId } = useParams();
  const gotToken = localStorage.getItem("authToken");

  const navigate = useNavigate();

  const handleDeleteAccount = () => {
    const confirmed = window.confirm("Are you sure you want to delete your account?");
    if (confirmed) {
      axios
        .delete(`${API_URL}/auth/deleteUser/${userId}`, {
          headers: { Authorization: `Bearer ${gotToken}` },
        })
        .then(() => {
          localStorage.removeItem('authToken');
          logOutUser();
          navigate("/");
        })
        .catch((err) => console.log(err));
    }
  };
  

  return (
    <Layout>
      <div className="DeletePage">
        <button className="red-button" onClick={handleDeleteAccount}>Delete Account</button>
      </div>
    </Layout>
  );
}

export default DeleteUser;
