import React from "react";
import "./Loader.css";

const Loader = () => {
  return (
    <div className="ai-matrix-loader">
      <div className="digit">0</div>
      <div className="digit">1</div>
      <div className="digit">0</div>
      <div className="digit">1</div>
      <div className="digit">1</div>
      <div className="digit">0</div>
      <div className="digit">0</div>
      <div className="digit">1</div>
      <div className="glow"></div>
    </div>
  );
};

export default Loader;
