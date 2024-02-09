import React, { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import Button from "./Button";
import AuthContext from "../context/AuthProvider";

const AuthDetails = () => {
  const { authUser, loading } = useContext(AuthContext);

  return (
    <div>
      {authUser ? (
        <>
          <Button
            action={() => {
              signOut(auth);
            }}
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

export default AuthDetails;
