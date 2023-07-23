import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { API_URL } from "../config/config.index";
import Layout from "./Layout";
import Display from "./Display"

function ProfilePage() {
  const gotToken = localStorage.getItem("authToken");
  const { logOutUser, user, setUser, removeToken, isLoggedIn, setIsLoggedIn,  } = useContext(AuthContext);
  // console.log(user);
  // const userId = user._id
  // console.log(userId, "userId??")
  // console.log(user, "user from profile")
  const [email, setEmail] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();
  const defaultImageUrl =  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png";

  useEffect(() => {     
    axios.get('http://localhost:5005/auth/profile',
    {
      headers: { authorization: `Bearer ${gotToken}` },
    })
    .then((response) => {
      setEmail(response.data.email);
      setImageUrl(response.data.userImage);
    })
    .catch((error) => console.log(error));
  }, [] );

  const handleDeleteAccount = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (confirmDelete) {
      try {
        const gotToken = localStorage.getItem("authToken");
        if (gotToken) {
          await axios.delete(`${API_URL}/profile`, {
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
    <Layout>
      <div className="profile-maindiv">
        <div className="profile-leftdiv">
          <h1 className="profile-h1">Your profile</h1>

          <div>
            { imageUrl ? (<img src={ imageUrl } alt="user profile" className="profile-image"/>) : (<img src={ defaultImageUrl } alt="user profile" className="profile-image"/>) }
            <p className="profile-email">{ email }</p>
          </div>

          <div className="profile-leftdiv-buttonsdiv">
            <button className="blue-button"  onClick={ logOutUser }>Logout</button>
            <button className="red-button" onClick={ handleDeleteAccount }>Delete Account</button> 
          </div>
        </div>

        <div className="profile-rightdiv">
            {/* <Link to={`/editUser/${user._id}`}><button>Edit your user</button></Link> */}
            <Link to={ "/addRecord" }><button className="pink-button">Upload a recording</button></Link>
            {/* <Link to={ "/transcribe" }><button className="pink-button">Add transcribe</button></Link> */}
            <Link to={ "/record" }><button className="pink-button">Make a recording</button></Link>

            <p>Add display of existing texts here .... </p>
            <Display/>
        </div>

      </div>
    </Layout>
  );
}

export default ProfilePage;