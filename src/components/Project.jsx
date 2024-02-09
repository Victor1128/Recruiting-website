import React from "react";
import { collection, getDocs } from "firebase/firestore";

const Project = ({ title, content }) => {
  return (
    <>
      <h3>{title}</h3>
      <div>{content}</div>
    </>
  );
};

export default Project;
