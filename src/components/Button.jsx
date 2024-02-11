import React, { useState } from "react";

const Button = ({
  type = "button",
  children,
  action,
  color = "primary",
  disableAfterClick = false,
  className,
}) => {
  const [disabled, setDisabled] = useState(false);
  const onClick = () => {
    action && action();
    if (disableAfterClick) setDisabled(true);
  };
  return (
    !disabled && (
      <button
        type={type}
        onClick={onClick}
        className={"btn btn-" + color + " " + className}
      >
        {children}
      </button>
    )
  );
};

export default Button;
