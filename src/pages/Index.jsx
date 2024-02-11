import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Index = () => {
  // const { authUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const userRole = useSelector((state) => state.auth.role);
  useEffect(() => {
    // if (!loading) {
    if (isAuthenticated) {
      // console.log("user", authUser);
      userRole === "user"
        ? navigate("/portfolio")
        : navigate("/all-portfolios");
    } else navigate("/login");
    // }
  }, [isAuthenticated]);

  // if (loading) return <p>Loading...</p>;

  return <></>;
};

export default Index;
