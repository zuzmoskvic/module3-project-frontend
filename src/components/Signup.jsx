import { useState } from "react";
import { API_URL } from "../config/config.index";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./Layout";

function Signup() {
  const [email, setEmail] = useState("");
  const [userImage, setUserImage] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleUserImage = (e) => setUserImage(e.target.files[0]);

  const handleSignup = (e) => {
    e.preventDefault();
    //const requestBody = { email, password };
    const formData = new FormData();
    formData.append("email", email);
    formData.append("userImage", userImage);
    formData.append("password", password);

    axios
      .post(`${API_URL}/auth/signup`, formData)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.log(error)
        
      });
      
  };

  return (
    <Layout>
    <div className="LoginPage">
      <h1>Signup</h1>

      <form onSubmit={handleSignup} enctype="multipart/form-data">
        <label>Email:</label>
        <input type="email" name="email" value={email} onChange={handleEmail} />

        <label>User Image</label>
        <input type="file" name="userImage"  onChange={handleUserImage} />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Sign up</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>
    </div>
    </Layout>
  );
}

export default Signup;