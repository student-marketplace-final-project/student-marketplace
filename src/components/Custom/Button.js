import React from "react";
import { Button } from "reactstrap";

function Buttons({
  type,
  children,
  classname,
  className,
  size,
  handlesubmit,
  onClick,
}) {
  return (
    <Button
      type={type}
      className={className}
      name={classname}
      size={size}
      onSubmit={handlesubmit}
      onClick={onClick}
    >
      {children}
    </Button>
  );
}

export default Buttons;
