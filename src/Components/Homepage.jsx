import React, { useState } from "react";
import Headnav from "./Navbar";
import Products from "./Products";

const Homepage = () => {
  return (
    <div>
      <Headnav />
      <Products />
    </div>
  );
};

export default Homepage;
