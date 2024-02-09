import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import AuthContext from "../context/AuthProvider";

// wrapper component around protected routes
const RequireAuth = () => {
  const { authUser, loading } = useContext(AuthContext);
  console.log(authUser);
  if (loading) {
    return <p>Loading...</p>;
  }
  return authUser ? <Outlet /> : <Navigate to="/login" />;
  // return <Outlet />;
};

export default RequireAuth;
