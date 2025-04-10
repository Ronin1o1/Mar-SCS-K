import React from "react";
import styles from "./CPageTitle.css";
function CPageTitle(props) {
  return (
    <div
      className={` ${props.titlePadding ? "" : props.compName === "requestReport"? styles.mb5 : styles.container} ${"titleContainer"}`}
      style={props.titleContainer}
    >
      <table className={`${styles.fullHeight}`}>
        <tr>
          <td
            className={` 
              ${
                props.showSubNav
                  ? styles.Header + " " + styles.headerPadding
                  : styles.Header
              } ${
              props.titlePadding
                ? styles.Header + " " + styles.paddingTopTitleBar
                : styles.Header
            }
            `}
            style={props.titleSpace}
          >
            {props.title}
          </td>
        </tr>
        <tr className={styles.BGDarkBlueStyle}>
          <td style={{ height: 2 }} valign="top"></td>
        </tr>
        <tr style={{ height: 2 }}>
          <td></td>
        </tr>
      </table>
    </div>
  );
}

export default CPageTitle;
