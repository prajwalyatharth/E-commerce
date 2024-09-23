import React from "react";
import img3 from "../../assets/image3.png";
import img7 from "../../assets/image7.png";
import { Link } from "react-router-dom";
import useCategory from "../../hooks/useCategory";

const Homefeature = () => {
  return (
    <div className="home-feature container ">
      <div className="home-feature-bg">
        <div className="feature">
          <Link to="/all-products">
            <span className="normal-button">MEN</span>
          </Link>
          <img src={img3} alt="" />
        </div>
        <div className="feature">
          <Link to="/all-products">
            <span className="normal-button">WOMEN</span>
          </Link>
          <img src={img7} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Homefeature;
