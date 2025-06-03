import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth(); // Use isLoggedIn and logout from AuthContext

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg py-3">
      <div className="container-fluid px-5">
        <Link className="navbar-brand fw-bold fs-4 text-uppercase text-light" to="/">
          <i className="bi bi-house-door-fill me-2 text-warning"></i>
          VillaScape
        </Link>
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/properties">
                Properties
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light fw-semibold" to="/contact">
                Contact
              </Link>
            </li>
            {isLoggedIn ? (
              <li className="nav-item">
                <button className="btn btn-warning fw-semibold px-4 py-2 ms-3" onClick={logout}>
                  Logout
                </button>
              </li>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="btn btn-outline-warning fw-semibold px-4 py-2 ms-3" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="btn btn-warning fw-semibold px-4 py-2 ms-3" to="/signup">
                    Sign Up
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;