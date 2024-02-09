import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthProvider";
import Portfolio from "../../components/Portfolio";
import { db } from "../../firebase";
import {
  getDocs,
  collection,
  where,
  deleteDoc,
  doc,
  orderBy,
} from "firebase/firestore";
import Project from "../../components/Project";

const ViewPortfolios = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const GetProjects = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(db, "Projects"),
          orderBy("UserId", "asc")
        );
        console.log(querySnapshot);
        const projectData = [];
        let lastId = "";
        querySnapshot.docs.forEach((document) => {
          projectData.push(
            <>
              {lastId != document.data().UserId ? (
                <div>asdfghjkmnbvcxazsxcdvbn</div>
              ) : null}
              <Project
                key={document.id}
                title={document.data().Title}
                content={document.data().Content}
              />
            </>
          );
          lastId = document.data().UserId;
        });
        setProjects(projectData);
      } catch (e) {
        console.error(e);

        return <div>e</div>;
      }
    };

    GetProjects();
  }, []);

  return <div>{projects}</div>;
};

export default ViewPortfolios;
