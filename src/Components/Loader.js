import React from "react";

import LoadIcon from "../Assets/images/iconlogo.svg";

const Loader = () => {
  return (
    <div className="loaderBox">
      <img src={LoadIcon} alt="loading.." />
    </div>
  );
};

export default Loader;
