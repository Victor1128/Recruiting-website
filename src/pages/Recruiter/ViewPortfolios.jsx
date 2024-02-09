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
        const docs = querySnapshot.docs;
        docs.sort((a, b) => (a.data().UserId > b.data().UserId ? 1 : -1));
        console.log(querySnapshot);
        const projectData = [];
        let lastId = "";
        docs.forEach((document) => {
          projectData.push(
            <>
              {lastId != document.data().UserId ? (
                <div>{document.data().UserName}'s portfolio</div>
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
