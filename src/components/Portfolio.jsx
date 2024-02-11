import React, { useContext, useEffect } from "react";
import Project from "./Project";
import { db } from "../firebase";
import { getDocs, collection, where, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Button from "./Button";
import AuthContext from "../context/AuthProvider";

const Portfolio = ({ userId, children }) => {
  const [projects, setProjects] = useState([]);
  const { authUser, loading } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    setUserName(authUser.displayName);
    const GetProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Projects"),
          where("UserId", "==", userId)
        );
        console.log(querySnapshot);
        const projectsData = querySnapshot.docs.map(
          (document) =>
            document.data().UserId === userId &&
            (setUserName(document.data().UserName),
            (
              <>
                <div className="container d-flex flex-row p-2 justify-content-between">
                  <Project
                    key={document.id}
                    title={document.data().Title}
                    content={document.data().Content}
                  />
                  {authUser.uid === userId && (
                    <Button
                      color="danger"
                      className="flex-end"
                      action={async () => {
                        await deleteDoc(
                          doc(collection(db, "Projects"), document.id)
                        );
                        setRefresh(!refresh);
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </div>
                <br />
              </>
            ))
        );
        setProjects(projectsData);
      } catch (e) {
        console.error(e);

        return <div>e</div>;
      }
    };

    GetProjects();
  }, [refresh, authUser.uid, userId]);
  return (
    <main className="d-flex justify-content-center flex-column align-items-center">
      <div className="d-flex justify-content-between w-50">
        <h1>{userName}'s portfolio</h1>
        {children}
      </div>
      <div className="w-100">{projects}</div>
    </main>
  );
};

export default Portfolio;
