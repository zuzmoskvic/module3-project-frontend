import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config/config.index';
import Layout from './Layout';


function EditUser() {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const gotToken = localStorage.getItem("authToken")

  useEffect(() => {
    try {
      
      const gotToken = localStorage.getItem("authToken");
      if (gotToken) {
        axios
          .get(`${API_URL}/auth/editUser/${userId}`,{
            headers: { authorization: `Bearer ${gotToken}` },
          })
          .then((response) => {
            setEmail(response.data.email);
            console.log(response.data.email, "response")
          })
          .catch((error) => {
            console.log(error);
            setErrorMessage("Failed to fetch user data. Please try again.");
          });
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to fetch user data. Please try again.");
    }
  }, [userId]);

 const handleEmail = (e) => setEmail(e.target.value);
//  const handlePassword = (e) => setPassword(e.target.value);
 const handleUserImage = (e) => setUserImage(e.target.files[0]);
 

const handleEditUser = (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("email", email);
  formData.append("userImage", userImage);

   axios
  .put(`${API_URL}/auth/editUser/${userId}`, formData , {
    headers: { authorization: `Bearer ${gotToken}` },
  })
    .then(() => {
      navigate("/profile");
    })
    .catch((error) => {
      console.log(error)
    });
};


return (
    <Layout>
    <div className="EditUserPage">
      <h1>Edit User</h1>

      <form className="login-form" onSubmit={handleEditUser} encType="multipart/form-data" >
          <label className="login-label">Email:</label>
          <input className="login-input" type="email" name="email" value={email} onChange={handleEmail} />

          <label className="login-label">User Image:</label>
          <input className="login-input" type="file" name="userImage" onChange={handleUserImage} />
          

          <button className="pink-button" type="submit">Save Changes</button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <Link to={"/profile"} className="login-link"> Back to Profile</Link>
    </div>
    </Layout>
  );
}

export default EditUser
