import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

// wrapper component around protected routes
const RequireAuth = ({ role = null }) => {
  const { authUser, loading } = useContext(AuthContext);
  console.log(authUser);
  if (loading) {
    return <p>Loading...</p>;
  }
  return authUser && (role === null || authUser.displayName === role) ? (
    <Outlet />
  ) : (
    <Navigate to="/forbidden" />
  );
  // return <Outlet />;
};

export default RequireAuth;
