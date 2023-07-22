function Layout({ children }) {
    return (
      <div>

          <body>
            <main>
            <nav>
            <div className="app-title"> Too Lazy to Type</div>
            <ul className="nav-links" >
              <li><a className="nav-link" href="/login">Login</a></li>
              <li><a className="nav-link" href="/signup">Register</a></li>
              <li><a className="nav-link" href="/">About us</a></li>
              <li><a className="nav-link" href="/">Contact us</a></li>
            </ul>
            </nav>
              {children}
            </main>
          </body>    

      </div>
    )
  }



  export default Layout