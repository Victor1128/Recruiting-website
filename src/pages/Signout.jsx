import React, { useContext } from "react";
import Button from "../components/Button";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Signout = () => {
  const navigate = useNavigate();
  const { authUser, loading } = useContext(AuthContext);
  return (
    <div className="d-flex justify-content-center flex-column align-items-center">
      {authUser ? (
        <>
          <Button
            action={() => {
              signOut(auth);
            }}
            color="danger"
          >
            Sign Out
          </Button>
          <p>{`Signed In as ${authUser.email}`}</p>
        </>
      ) : (
        <p> Signed Out </p>
      )}
    </div>
  );
};

export default Signout;
