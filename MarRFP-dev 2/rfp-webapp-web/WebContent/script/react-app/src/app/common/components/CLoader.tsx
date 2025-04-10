import React from "react";
import styles from "./filter/Filter.css";
import screenloader from "../assets/img/screenloader.gif";

export function CLoader(props) {
  return (
    <div
      id="loading"
      style={{
        textAlign: "center",
        display: "inline",
        width:
          props.componentName &&
          props.componentName == "hotelGPPPGOOSMaintenance"
            ? "870px"
            : "100%",
        height:
          props.componentName &&
          props.componentName == "hotelGPPPGOOSMaintenance"
            ? "calc(100vh - 180px)"
            : "100%",
        top:
          props.componentName &&
          props.componentName == "hotelGPPPGOOSMaintenance"
            ? "90px"
            : "0px",
        //marginTop: "90px"
      }}
      className={styles.curtain}
    >
      <div
        style={{
          position: "relative",
          backgroundColor: "transparent",
          zIndex: 0,
          top: "50%",
        }}
      >
        <img src={screenloader} />
      </div>
    </div>
  );
}
