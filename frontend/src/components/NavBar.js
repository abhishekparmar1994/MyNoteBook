import React, { useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import NoteContext from '../context/notes/noteContext';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { updateToken } = useContext(NoteContext);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/auth/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('auth-token')
        }
      });
      
      if (response.ok) {
        localStorage.removeItem('auth-token');
        updateToken(null);
        navigate('/login');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="container my-3">
      <nav className="navbar fixed-top navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand mx-3" to="/">MyNoteBook</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
              <Link className="nav-link" to="/about">About</Link>
            </li>
          </ul>
          {!localStorage.getItem('auth-token') ? (
            <div className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login">Login</Link>
              <Link className="btn btn-primary mx-1" to="/signup">Signup</Link>
            </div>
          ) : (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
