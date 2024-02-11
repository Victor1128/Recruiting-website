import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import AuthContext from "../context/AuthProvider";

// wrapper component around protected routes
const RequireAuth = ({ role = null }) => {
  // const { authUser, loading } = useContext(AuthContext);
  // console.log(authUser);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  // const userRole = authUser?.photoURL;
  console.log(isAuthenticated);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // return isAuthenticated && (role === null || userRole === role) ? (
  //   <Outlet />
  // ) : (
  //   <Navigate to="/forbidden" />
  // );

  return isAuthenticated && (role === null || userRole === role) ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" />
  );
  return <Outlet />;
};

export default RequireAuth;
