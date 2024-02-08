import React from "react";

const Button = ({ type='button', children, action, color = "primary" }) => {
  return (
    <button type={type} onClick={action} className={"btn btn-" + color}>
      {children}
    </button>
  );
};

export default Button;