import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Layout({ children }) {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main>
      <nav className="nav">
        <Link to="/" className="app-title-link">
          <div className="app-title">
            <img
              className="star-small"
              src="https://upload.wikimedia.org/wikipedia/commons/1/10/Black_4_Point_Star.png"
              alt="four pointed star"
            />{" "}
            Too Lazy to Type
          </div>
        </Link>
        <ul className="nav-links">
          <Link to={"/"} className="nav-link">
            <li>Home</li>
          </Link>
          <Link to={"/signup"} className="nav-link">
            <li>Register</li>
          </Link>
          <Link to={"/login"} className="nav-link">
            <li>Login</li>
          </Link>
          {isLoggedIn && (
            <Link to={"/profile"} className="special-nav-link">
              <li>Profile</li>
            </Link>
          )}
          {isLoggedIn && (
            <Link to={"/display"} className="special-nav-link">
              <li>Read</li>
            </Link>
          )}
        </ul>
      </nav>
      {children}
    </main>
  );
}

export default Layout;
