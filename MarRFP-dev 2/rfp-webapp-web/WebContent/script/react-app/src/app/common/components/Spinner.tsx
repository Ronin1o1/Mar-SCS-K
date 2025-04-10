
import React from "react";
import spinnerImg from "../assets/img/loading-buffering.gif"
import styles from "./Spinner.css";

export const Spinner = (props) => {
   return (
  <div>
      <img src={spinnerImg} width="20px" height="20px" className = {styles.curtain} />
  </div>
  );
};

export default Spinner;
