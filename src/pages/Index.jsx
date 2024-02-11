import React, { useContext, useEffect } from "react";
import AuthContext from "../context/AuthProvider";
import { auth } from "../firebase";
import ViewPortfolio from "./User/ViewPortfolio";
import ViewPortfolios from "./Recruiter/ViewPortfolios";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const { authUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (!loading) {
      if (authUser) {
        console.log("user", authUser);
        authUser.photoURL === "user"
          ? navigate("/portfolio")
          : navigate("/all-portfolios");
      } else navigate("/login");
    }
  }, [authUser, loading]);

  if (loading) return <p>Loading...</p>;

  return <></>;
};

export default Index;
