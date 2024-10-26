import React from "react";
import { Button } from "reactstrap";
const ApplicationEmptyView = ({
  icon,
  title,
  discription,
  btnLable,
  isButton,
  onBtnClick,
}) => {
  return (
    <React.Fragment>
      <div
        className="justify-content-center d-flex"
        style={{
          alignItems: "center",
          margin: "100px 0px 20px 0px",
        }}
      >
        <img
          src={icon}
          alt={"No Data Found"}
          style={{ height: "30%", width: "30%" }}
        />
      </div>

      <div
        style={{
          color: "#000000",
          fontSize: 30,
          fontWeight: "bold",
          marginTop: 30,
        }}
        className=" justify-content-center d-flex"
      >
        {" "}
        {title}{" "}
      </div>
      <div className="justify-content-center d-flex" style={{ fontSize: 15 }}>
        {discription}
      </div>
      {isButton && (
        <Button onClick={onBtnClick} variant="contained" color="primary">
          {btnLable}
        </Button>
      )}
    </React.Fragment>
  );
};

export default ApplicationEmptyView;
