import React from "react";
import styles from "./Filter.css";
import rejected from "../../assets/img/rejected.gif";
import accepted from "../../assets/img/accepted.gif";
import locked from "../../assets/img/locked.gif";
import requested from "../../assets/img/requested.gif";

export function StatusLegend() {
  return (
    <table className={`${styles.menuWdth100Height} ${styles.field_Name}`}>
        <tr><td><b>Status Legend</b></td></tr>
        <tr>
          <td><img style={{textAlign:"center"}} src={accepted}></img> <b>- Accepted</b></td>
          <td></td>
          <td ><img src={rejected}></img> <b>- Declined</b></td>
        </tr>
        <tr>
          <td><img src={locked}></img> <b>- In Progess</b></td>
          <td></td>
          <td><img src={requested}></img> <b>- Requested</b></td>
        </tr>
	  </table>
  );
}
