import React from "react";
import { useContext } from "react";
import { Link, Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

const NavBar = () => {
  const { authUser, loading } = useContext(AuthContext);
  console.log(authUser);
  if (loading) {
    return <p>Loading...</p>;
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link className="nav-link" to="/">
              Home
            </Link>
          </li>
          {authUser && authUser.photoURL === "recruiter" && (
            <li className="nav-item">
              <Link to="/all-portfolios" className="nav-link">
                Portfolios
              </Link>
            </li>
          )}
          {authUser && authUser.photoURL === "user" && (
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
          {authUser && (
            <li className="nav-item">
              <Link to="/signout" className="nav-link">
                Logout
              </Link>
            </li>
          )}
          {!authUser && (
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          )}
          {!authUser && (
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
