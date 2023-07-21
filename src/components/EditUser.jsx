import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../context/auth.context";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";

function EditUser() {
  const { logOutUser, user, removeToken, setUser, setIsLoggedIn } = useContext(AuthContext);
  const { userId } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  useEffect(() => {
    try {
      
      const gotToken = localStorage.getItem("authToken");
      if (gotToken) {
        axios
          .post(`http://localhost:5005/auth/editUser/${userId}`,{
            headers: { authorization: `Bearer ${gotToken}` },
          })
          .then((response) => {
            const { email } = response.data;
            setEmail(email);
            setUserImage(userImage);
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
  /*const handlePassword = (e) => setPassword(e.target.value);
  const handleUserImage = (e) => setUserImage(e.target.files[0]);*/

  const handleEditUser = (e) => {
    e.preventDefault();
    /*const formData = new FormData();
    formData.append("email", email);
    formData.append("userImage", userImage);
    formData.append("password", password);*/
const userToEdit = {email}
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
  };

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
}

export default EditUser;
