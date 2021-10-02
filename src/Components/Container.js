import React from "react";

import "../Pages/Dashboard/Dashboard.css";

const Container = (props) => {
  return (
    <>
      <div className="dashboard-container">
        <div className="dashboardContainer-content">{props.children}</div>
      </div>
    </>
  );
};

export default Container;
