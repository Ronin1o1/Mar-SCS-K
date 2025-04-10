import React from "react";
import { GlobalHeader } from "../routing/HotelFormattedRateDescriptionRouting";
import styles from "./HotelFormattedRateDescriptionRouting.css";
export function Layout(props: any) {
  const changeUrl = (e) => {
    props.ISChanged(e);
  };
  const finishSave = (e) => {
    props.IsFinished(e);
  };
  return (
    <div id="GobalId" className={styles.globalContainer}>
      <div className={styles.mainContainerBody}>
        <GlobalHeader setEvent={changeUrl} setSave={finishSave} />
        {props.children}
      </div>
    </div>
  );
}
