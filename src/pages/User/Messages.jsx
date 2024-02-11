import React, { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { getDocs, collection, where } from "firebase/firestore";
import AuthContext from "../../context/AuthProvider";

const Messages = () => {
  const { authUser, loading } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);

  const getMessages = async () => {
    try {
      const querySnapshot = await getDocs(
        collection(db, "Messages"),
        where("receiverID", "==", authUser.uid)
      );
      console.log(querySnapshot);
      const localMessages = [];
      querySnapshot.docs.forEach((document) => {
        console.log(document.data());
        localMessages.push(
          document.data().receiverID === authUser.uid && (
            <>
              <h4>{document.data().senderName}</h4>
              <p>{document.data().text}</p>
              <br />
            </>
          )
        );
      });
      setMessages(localMessages);
    } catch (e) {
      console.log(e);
      return <div>e</div>;
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return <div className="m-5">{messages}</div>;
};

export default Messages;
