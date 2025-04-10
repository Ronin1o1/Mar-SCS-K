import React from "react";
import styles from "./Footer.css";

export default function Footer({ DataValue }) {
  return (
    <div className={DataValue ? "" : styles.hiddenFooter}>
      <div className={`${styles.footertext} ${"footerwidget"}`} id="footerID">
        <p className={styles.footerpara}>
          Copyright © {new Date().getFullYear()} Marriott International. MARRIOTT CONFIDENTIAL AND
          PROPRIETARY INFORMATION
        </p>
      </div>
    </div>
  );
}
