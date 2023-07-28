import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

function Layout({ children }) {
  // const gotToken = localStorage.getItem("authToken");
  const { isLoggedIn } = useContext(AuthContext);

    return (
          <main>
            <nav className="nav">
            <Link to="/" className="app-title-link"><div className="app-title"><img className="star-small" src="https://upload.wikimedia.org/wikipedia/commons/1/10/Black_4_Point_Star.png" alt="four pointed star"/> Too Lazy to Type</div></Link>
              <ul className="nav-links" >
                <li><Link className="nav-link" href="/">Home</Link></li>
                <li><Link className="nav-link" href="/signup">Register</Link></li>
                <li><Link className="nav-link" href="/login">Login</Link></li>
                {isLoggedIn && (<li><Link className="special-nav-link" href="/profile">Profile</Link></li>
                )}
                {isLoggedIn && (<li><Link className="special-nav-link" href="/display">Read</Link></li>
                )}
              </ul>
            </nav>
              {children}
          </main>    
    )
  }

export default Layout