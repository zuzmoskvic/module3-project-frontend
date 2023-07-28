import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";

function ProfilePage() {
  const gotToken = localStorage.getItem("authToken");
  const { logOutUser, user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const defaultImageUrl =
    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  useEffect(() => {
    axios
      .get(`${API_URL}/auth/profile`, {
        headers: { authorization: `Bearer ${gotToken}` },
      })
      .then((response) => {
        setEmail(response.data.email);
        setImageUrl(response.data.userImage);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <Layout>
      <div className="profile-maindiv">
        <div className="profile-leftdiv">
          <h1 className="profile-h1">Your profile</h1>

          <div>
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="user profile"
                className="profile-image"
              />
            ) : (
              <img
                src={defaultImageUrl}
                alt="user profile"
                className="profile-image"
              />
            )}
            <p className="profile-email">{email}</p>
          </div>

          <div className="profile-leftdiv-buttonsdiv">
            <button className="blue-button" onClick={logOutUser}>
              Logout
            </button>
            <Link to={`/editUser/${user._id}`}>
              <button className="blue-button">Edit user</button>
            </Link>
            <Link to={`/deleteUser/${user._id}`}>
              <button className="red-button">Delete user</button>
            </Link>
          </div>
        </div>

        <div className="profile-rightdiv">
          <div className="profile-rightdiv-buttonsdiv">
            <Link to={"/addRecord"}>
              <button className="pink-button">Upload a recording</button>
            </Link>
            <Link to={"/record"}>
              <button className="pink-button">Make a recording</button>
            </Link>
          </div>

          <div className="home-rightdiv">
            <Link to={"/display"}>
              <button className="read-button">Read your texts</button>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default ProfilePage;
