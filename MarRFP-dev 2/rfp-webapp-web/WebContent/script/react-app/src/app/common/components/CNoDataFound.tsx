import React from "react";
import styles from "./filter/Filter.css";

export function CNoDataFound() {
  return (
    <table
      style={{  width: "100%" }}
      className={`${styles.gridRowTable} ${styles.zeroHeight}`}
      id="gridTableView"
    >
      <tbody>
        <tr style={{ background: "#FFF" }}>
          <td style={{ verticalAlign: "middle", textAlign: "center" }}>
            No Data Found!!
          </td>
        </tr>
      </tbody>
    </table>
  );
}
