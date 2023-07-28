import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const navigate = useNavigate();
  const { setToken, authenticateUser, setIsLoggedIn } = useContext(AuthContext);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const userToLogin = { email, password };
      const { data } = await axios.post(`${API_URL}/auth/login`, userToLogin);
      const actualToken = data.authToken;
      setToken(actualToken);
      authenticateUser();
      setIsLoggedIn(true);
      navigate("/profile", { state: { userToLogin } });
    } catch (error) {
      setErrorMessage("Invalid username or password.");
    }
  };

  return (
    <Layout>
      <div className="LoginPage">
        <h1>Login</h1>

        <form className="login-form" onSubmit={handleLoginSubmit}>
          <label className="login-label">Email address</label>
          <input
            className="login-input"
            type="email"
            name="email"
            value={email}
            autoComplete="email"
            onChange={handleEmail}
          />

          <label className="login-label">Password </label>
          <input
            className="login-input"
            type="password"
            name="password"
            value={password}
            autoComplete="current-password"
            onChange={handlePassword}
          />

          <button className="pink-button" type="submit">
            Login
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p>Don't have an account yet?</p>
        <Link to={"/signup"} className="login-link">
          {" "}
          Create account
        </Link>
      </div>
    </Layout>
  );
}

export default Login;
