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
  const [portfolios, setPortfolios] = useState([]);
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
        const docs = querySnapshot.docs.map((doc) => doc.data().UserId);
        const unique = docs.filter(
          (value, index, array) => array.indexOf(value) === index
        );
        console.log("unique ", unique);
        const portfolios = unique.map((document) => (
          <>
            <Portfolio userId={document} />
            <br /> <br />
          </>
        ));
        setPortfolios(portfolios);
      } catch (e) {
        console.error(e);

        return <div>e</div>;
      }
    };

    GetProjects();
  }, []);

  return <div>{portfolios}</div>;
};

export default ViewPortfolios;
