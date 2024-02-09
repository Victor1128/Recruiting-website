import React, { useEffect, useState, useContext } from "react";
import Button from "../../components/Button";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";
import AuthContext from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const { authUser, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    setError("");
  }, [title, content]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(title, content, authUser.uid);
    console.log(authUser);
    try {
      const docRef = await addDoc(collection(db, "Projects"), {
        Title: title,
        Content: content,
        UserId: authUser.uid,
      });
      navigate("/portfolio");
    } catch (e) {
      console.error("Error adding document: ", e);
      setError(e.message);
    }
  };

  return (
    <main>
      <h1>Create Project</h1>
      <p className="error-div">{error}</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <Button type="submit">Create</Button>
      </form>
    </main>
  );
};

export default CreateProject;
