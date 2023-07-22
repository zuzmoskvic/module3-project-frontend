import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from '../config/config.index';

function EditUser() {
  const {  user } = useContext(AuthContext);
  const { userId } = useParams();
  console.log(userId, "userId")
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  //const [userImage, setUserImage] = useState("");
  //const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

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

  const handleEditUser = (e) => {
    e.preventDefault();

axios
.put
(`${API_URL}/auth/editUser/${userId}`, {email})
.then((response) => {
  console.log(response.data)
})
/*const userToEdit = {email}

console.log(userToEdit, "usertoedit")

    try {
      const gotToken = localStorage.getItem("authToken");
      axios
        .post(`http://localhost:5005/auth/editUser/${userId}`, userToEdit, {
          headers: { authorization: `Bearer ${gotToken}` },
        })
        .then(() => {
          navigate("/profile");
        })
        .catch((error) => {
          console.log(error);
          setErrorMessage("There was an error editing the user. Please try again.");
        });
    } catch (error) {
      console.log(error);
      setErrorMessage("There was an error editing the user. Please try again.");
    }
  };*/

  return (
    <div className="EditUserPage">
      <h1>Edit User</h1>

      <form onSubmit={handleEditUser} encType="multipart/form-data">
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        

        <button type="submit">Save Changes</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <Link to={"/profile"}>
        <button>Back to Profile</button>
      </Link>
    </div>
  );
}}

export default EditUser
