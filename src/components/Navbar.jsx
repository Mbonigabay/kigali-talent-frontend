import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { logout } from '../features/auth/authSlice';

export default function Navbar() {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-expand-lg bg-transparent">
      <div className="container">
        <Link to="/" className="navbar-brand pacifico-regular">
          Kigali Talent
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarNav"
        >
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            {/* Conditionally render links based on authentication status and user role */}
            {isAuthenticated && user && user.role === 'ROLE_APPLICANT' && (
              <li className="nav-item">
                <Link to="/user" className="nav-link">
                  My Dashboard
                </Link>
              </li>
            )}
            {isAuthenticated && user && user.role === 'ROLE_ADMIN' && (
              <li className="nav-item">
                <Link to="/admin" className="nav-link">
                  Admin Dashboard
                </Link>
              </li>
            )}
            {/* Conditionally render links based on authentication status */}
            {!isAuthenticated ? (
              <>
                <li className="nav-item">
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/register" className="nav-link">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="btn btn-link nav-link"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
