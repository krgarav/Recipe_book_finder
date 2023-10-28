import React, { useState } from "react";
import Headnav from "./Headnav";
import Products from "./Products";
import { useDispatch, useSelector } from "react-redux";
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
