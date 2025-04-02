import React from 'react'
import { Link, useLocation } from 'react-router-dom'


const NavBar = () => {
      let location = useLocation();
      return (
        <div className="container my-3">
          <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
            <Link className="navbar-brand" to="/">MyNoteBook</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav mr-auto">
                <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>  
                  <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
                  <Link className="nav-link" to="/about">About</Link>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      )
}

export default NavBar
