// LoadingBar.js
import React from "react";
import "./LoadingBar.css";

const LoadingBar = () => {
  return (
    <div className="loading-bar-container">
      <div className="loading-bar">
        <div className="progress"></div>
      </div>
    </div>
  );
};

export default LoadingBar;
