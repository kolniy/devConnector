import React from "react";
import spinner from "./loader.gif";

const Spinner = () => {
  return (
    <>
      <div className="spinner-style">
        <img
          src={spinner}
          style={{ width: "100px", margin: "auto", display: "bloack" }}
          alt="...Loading"
        />
      </div>
    </>
  );
};

export default Spinner;
