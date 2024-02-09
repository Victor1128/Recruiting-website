import React, { useState } from "react";

const Button = ({
  type = "button",
  children,
  action,
  color = "primary",
  disableAfterClick = false,
}) => {
  const [disabled, setDisabled] = useState(false);
  const onClick = () => {
    action();
    if (disableAfterClick) setDisabled(true);
  };
  return (
    !disabled && (
      <button type={type} onClick={onClick} className={"btn btn-" + color}>
        {children}
      </button>
    )
  );
};

export default Button;
