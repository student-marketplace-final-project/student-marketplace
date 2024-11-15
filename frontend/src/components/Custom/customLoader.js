import React from "react";
import { Spinner } from "reactstrap"
import "./loader.scss";
//spinner when data is taking time to load
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
 