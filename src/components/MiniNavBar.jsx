function MiniNavBar({ children }) {
  return (
    <div>
            <nav className="mini-nav">
              <ul className="mini-nav-links" >
                <li><a className="mini-nav-link" href="/addRecord">1. Upload record</a></li>
                <li><a className="mini-nav-link" href="/transcribe">2. Transcribe</a></li>
                <li><a className="mini-nav-link" href="/write">3. Write</a></li>
                <li><a className="mini-nav-link" href="/display">3. Read</a></li>
              </ul>
            </nav>
              {children}
    </div>
  )
}

export default MiniNavBar
