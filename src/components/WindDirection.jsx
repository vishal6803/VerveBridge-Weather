import React, { useEffect, useState } from "react";
import "./WindDirection.css";

const WindDirection = ({ degree }) => {
  useEffect(() => {
    const arrow = document.getElementById("arrow");
    arrow.style.transform = `rotate(${degree}turn)`;
  }, [degree]);

  return (
    <div className="direction-container">
      <div className="arrow-container">
        <p id="n">N</p>
        <p id="s">S</p>
        <p id="w">W</p>
        <p id="e">E</p>
        {/* <div id="arrow" className="arrow"></div> */}
        <i className="fa-solid fa-arrow-up-long" id="arrow"></i>
      </div>
    </div>
  );
};

export default WindDirection;
