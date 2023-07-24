import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { API_URL } from "../config/config.index";
const AuthContext = createContext();

const AuthContextWrapper = (props) => {
  const [user, setUser] = useState(null);
  const [tokenState, setTokenState] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const setToken = (token) => {
    localStorage.setItem("authToken", token);
    setTokenState(token);
  };

  const authenticateUser = async () => {
    const gotToken = localStorage.getItem("authToken");
    if (gotToken) {
      try {
        const { data } = await axios.get(`${API_URL}/auth/verify`, {
          headers: { authorization: `Bearer ${gotToken}` },
        });
        const { user, userImage } = data
        console.log("data from authenticate user", data)
        setUser({ ...user, userImage: userImage });
        setIsLoading(false);
        setIsLoggedIn(true);
      } catch (err) {
        console.log("There was an error during authentication", err);
        setUser(null);
        setIsLoading(false);
        setIsLoggedIn(false);
      }
    } else {
      setUser(null);
      setIsLoading(false);
      setIsLoggedIn(false);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  useEffect(() => {
   authenticateUser();
  }, []);

  return (
    <AuthContext.Provider value={ { setToken, authenticateUser, isLoading, isLoggedIn, setIsLoggedIn, user, logOutUser } }>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextWrapper };