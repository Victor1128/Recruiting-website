import React from "react";
import { collection, getDocs } from "firebase/firestore";

const Project = ({ title, content }) => {
  return (
    <div className="project-container ">
      <h3>{title}</h3>
      <div>{content}</div>
    </div>
  );
};

export default Project;
