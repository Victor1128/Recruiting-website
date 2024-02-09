import React, { useContext, useEffect } from "react";
import { useAsync } from "react-async";
import Project from "./Project";
import { db } from "../firebase";
import { getDocs, collection, where, deleteDoc, doc } from "firebase/firestore";
import { useState } from "react";
import Button from "./Button";
import AuthContext from "../context/AuthProvider";

const Portfolio = ({ userId }) => {
  const [projects, setProjects] = useState([]);
  const { authUser, loading } = useContext(AuthContext);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const GetProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Projects"),
          where("UserId", "==", userId)
        );
        console.log(querySnapshot);
        const projectsData = querySnapshot.docs.map(
          (document) =>
            document.data().UserId == userId && (
              <>
                <Project
                  key={document.id}
                  title={document.data().Title}
                  content={document.data().Content}
                />
                {authUser.uid === userId && (
                  <Button
                    color="danger"
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
              </>
            )
        );
        setProjects(projectsData);
      } catch (e) {
        console.error(e);

        return <div>e</div>;
      }
    };

    GetProjects();
  }, [refresh]);
  return <div>{projects}</div>;
};

export default Portfolio;
