import React from "react";
import styles from "./PGOOSPropagation.css";
import Settings from "../static/Settings";

export function PgoosPropagationFinishPage(props: any) {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.bodyContainer}>
        <table className={styles.section}>
          <tr>
            <td className={styles.header}>{Settings.finishTitle}</td>
          </tr>
          <tr className={styles.headerHR}>
            <td style={{ height: 2 }} valign="top"></td>
          </tr>
          <tr style={{ height: "10px" }}>
            <td></td>
          </tr>
          <tr style={{ verticalAlign: "top" }}>
            <b>
              The action items are being processed. View the PGOOS Error report
              to determine what did successfully publish to MARSHA and what
              PGOOS errors there are.
            </b>
          </tr>
        </table>
      </div>
    </div>
  );
}
