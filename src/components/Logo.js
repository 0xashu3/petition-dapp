import React from "react";
import unipetition from "./images/Unipetition.png";

const Logo = () => {
  return (
    <div className="w-25 mx-auto p-5">
      <img src={unipetition} className="img-thumbnail " />
    </div>
  );
};

export default Logo;
