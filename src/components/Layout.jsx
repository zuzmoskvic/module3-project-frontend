import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Layout({ children }) {
  // const gotToken = localStorage.getItem("authToken");
  const { isLoggedIn } = useContext(AuthContext);

    return (
          <main>
            <nav>
            <Link to="/" className="app-title-link"><div className="app-title"><img className="star-small" src="https://upload.wikimedia.org/wikipedia/commons/1/10/Black_4_Point_Star.png" alt="four pointed star"/> Too Lazy to Type</div></Link>
              <ul className="nav-links" >
                <li><a className="nav-link" href="/">Home</a></li>
                <li><a className="nav-link" href="/signup">Register</a></li>
                <li><a className="nav-link" href="/login">Login</a></li>
                {isLoggedIn && (<li><a className="special-nav-link" href="/profile">Profile</a></li>
                )}
                {isLoggedIn && (<li><a className="special-nav-link" href="/display">Read</a></li>
                )}
              </ul>
            </nav>
              {children}
          </main>    
    )
  }

export default Layout