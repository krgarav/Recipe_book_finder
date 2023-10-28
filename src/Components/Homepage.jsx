import React, { useState } from "react";
import Headnav from "./Headnav";
import Products from "./Products";

const Homepage = () => {
  return (
    <div>
      <Headnav />
      <br/>
      <br/>
      <Products />
    </div>
  );
};

export default Homepage;
