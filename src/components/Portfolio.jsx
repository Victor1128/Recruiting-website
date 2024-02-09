import React, { useEffect } from "react";
import { useAsync } from "react-async";
import Project from "./Project";
import { db } from "../firebase";
import { getDocs, collection, where } from "firebase/firestore";
import { useState } from "react";

const Portfolio = ({ userId }) => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const GetProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Projects"),
          where("UserId", "==", userId)
        );
        console.log(querySnapshot);
        const projectsData = querySnapshot.docs.map((doc) =>
          doc.data().UserId == userId ? (
            <Project
              key={doc.id}
              title={doc.data().Title}
              content={doc.data().Content}
            />
          ) : null
        );
        setProjects(projectsData);
      } catch (e) {
        console.error(e);

        return <div>e</div>;
      }
    };

    GetProjects();
  }, [userId]);
  return <div>{projects}</div>;
};

export default Portfolio;
