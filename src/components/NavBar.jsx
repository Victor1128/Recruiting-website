import React from "react";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

import { useSelector } from "react-redux";

const NavBar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {isAuthenticated && userRole === "recruiter" && (
            <li className="nav-item">
              <Link to="/all-portfolios" className="nav-link">
                Portfolios
              </Link>
            </li>
          )}
          {isAuthenticated && userRole === "user" && (
            <>
              <li className="nav-item">
                <Link to="/portfolio" className="nav-link">
                  My Projects
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/create" className="nav-link">
                  Create Project
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/messages" className="nav-link">
                  Messages
                </Link>
              </li>
            </>
          )}
          {isAuthenticated && (
            <li className="nav-item">
              <Link to="/signout" className="nav-link">
                Logout
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {!isAuthenticated && (
            <li className="nav-item">
              <Link to="/sign-up" className="nav-link">
                Register
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
