import React, { useContext } from "react";
import AuthContext from "../../context/AuthProvider";
import Portfolio from "../../components/Portfolio";

const ViewPortfolio = () => {
  const { authUser, loading } = useContext(AuthContext);
  console.log(authUser.uid);
  return Portfolio({ userId: authUser.uid });
};

export default ViewPortfolio;
