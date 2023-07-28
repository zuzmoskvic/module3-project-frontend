import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function DeleteUser() {
  const { user, logOutUser } = useContext(AuthContext);
  const { userId } = useParams();

  const gotToken = localStorage.getItem("authToken");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    try {
      if (gotToken) {
        axios
          .get(`${API_URL}/auth/deleteUser/${userId}`, {
            headers: { authorization: `Bearer ${gotToken}` },
          })
          .then(() => {})
          .catch((error) => {
            console.log(error);
            setErrorMessage("Failed to fetch user data. Please try again.");
          });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch user data. Please try again.");
    }
  }, []);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    const requestBody = { email: user.email };
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (confirmDelete && gotToken) {
      try {
        await axios.post(`${API_URL}/auth/deleteUser/${userId}`, requestBody, {
          headers: { authorization: `Bearer ${gotToken}` },
        });
        localStorage.removeItem('authToken');
        logOutUser();
        navigate("/signup");
      } catch (err) {
        console.log(
          "There was an error while eliminating the user account",
          err
        );
      }
    }
  };

  return (
    <Layout>
      <div>
        <button className="red-button" onClick={handleDeleteAccount}>
          Delete Account
        </button>
      </div>
    </Layout>
  );
}

export default DeleteUser;
