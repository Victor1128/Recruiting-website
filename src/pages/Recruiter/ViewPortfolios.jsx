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
  addDoc,
} from "firebase/firestore";
import Project from "../../components/Project";
import Button from "../../components/Button";

const ViewPortfolios = () => {
  const [projects, setProjects] = useState([]);
  const { authUser, loading } = useContext(AuthContext);

  const sendMessage = async (receiverID) => {
    try {
      await addDoc(collection(db, "Messages"), {
        text: `Congratulations! You have been recruited by ${authUser.displayName}!`,
        receiverID: receiverID,
        senderId: authUser.uid,
        senderName: authUser.displayName,
      });
    } catch (e) {
      console.log(e);
      return <div>e</div>;
    }
  };

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
                <>
                  <h1>{document.data().UserName}'s portfolio</h1>
                  <Button
                    color="success"
                    disableAfterClick={true}
                    action={() => sendMessage(document.data().UserId)}
                  >
                    Recruit
                  </Button>
                </>
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
