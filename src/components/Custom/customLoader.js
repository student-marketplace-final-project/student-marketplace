import React from "react";
import { Spinner } from "reactstrap"
import "./loader.scss";
const PageLoader = () => {
  return (
    <React.Fragment>
      <div className="loader">
        <Spinner animation="border" />
      </div>
    </React.Fragment>
  );
};
 
export default PageLoader;
 