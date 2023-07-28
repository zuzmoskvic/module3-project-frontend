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
        setErrorMessage("Signup failed.Please try a different email or login.");
      });
  };

  return (
    <Layout>
      <div className="LoginPage">
        <h1>Signup</h1>

        <form
          className="login-form"
          onSubmit={handleSignup}
          encType="multipart/form-data"
        >
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label className="login-label">Profile picture</label>
          <input
            className="login-input"
            type="file"
            name="userImage"
            onChange={handleUserImage}
          />

          <label className="login-label">Password</label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

          <button className="pink-button" type="submit">
            Sign up
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Already have an account?</p>
        <Link to={"/login"} className="login-link">
          Login
        </Link>
      </div>
    </Layout>
  );
}

export default Signup;
