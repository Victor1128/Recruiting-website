import React, { useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Button from "./Button";

const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) setAuthUser(user);
      else setAuthUser(null);
    });
  }, []);

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
