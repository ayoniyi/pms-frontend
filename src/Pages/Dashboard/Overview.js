import React from "react";

//component
import Menu from "../../Components/Menu";
import Container from "../../Components/Container";

const currentPage = "Overview";

const Overview = () => {
  return (
    <div>
      <Menu currentPage={currentPage} />
      <Container>
        <p>Overview</p>
      </Container>
    </div>
  );
};

export default Overview;
