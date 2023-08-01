import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";
import hamburger from "../img/Hamburger_icon.svg"
import { useState } from "react";

function Layout({ children }) {
  const [showMenu, setShowMenu] = useState(false);
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <main>
      {/* Hamburger menu link with onClick event */}
      <Link className="hamburger-menu" onClick={() => setShowMenu(!showMenu)}><img  alt="menu" src={hamburger}/></Link>

          {/* Pop-up menu (dropdown menu) */}
          {showMenu && (
        <div className="popup-menu">
          <Link to={"/"} className="nav-link">
            Home
          </Link>
          <Link to={"/signup"} className="nav-link">
            Register
          </Link>
          <Link to={"/login"} className="nav-link">
            Login
          </Link>
          {isLoggedIn && (
            <Link to={"/profile"} className="special-nav-link">
              Profile
            </Link>
          )}
          {isLoggedIn && (
            <Link to={"/display"} className="special-nav-link">
              Read
            </Link>
          )}
        </div>
      )}

      {/* Regular menu */}
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
