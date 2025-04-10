import React from "react";
import styles from "./Filter.css";

export function ColorLegend(props) {
  return (
    <tr>
      <table
        style={{ border: "0", borderSpacing: "2", padding: "0", width: "100%" }}
        className={styles.field_Value}
      >
        <tr>
          <td className="field_Name" style={{ fontWeight: "bold" }}>
            {" "}
            Color Legend{" "}
          </td>
        </tr>
        {/* <tr>
          <td> Fixed Priced Hotels</td>
          <td className="apFieldValue" style={{ color: "purple" }}>
            {" "}
            GPP Priced Hotels
          </td>
        </tr> */}
        <tr>
          <td className={styles.vpFieldValue} style={{ color: "#0057c1" }}>
            {" "}
            Volume Producer Hotels<>&nbsp;</>
          </td>
          <td className={styles.fpFieldValue} style={{ color: "#b95c00" }}>
            {" "}
            Float Priced Hotels
          </td>
        </tr>
        <tr>
          <td className="npFieldValue" style={{ color: "#d90000" }}>
            {" "}
            No General Pricing Hotels
          </td>
          <td className="nnFieldValue" style={{ color: "#008040" }}>
            {" "}
            No Bid Hotels
          </td>
        </tr>
        {/* <tr>
          <td className="nopFieldValue" style={{ color: "#640000" }}>
            No Off Cycle pricing
          </td>
          <td></td>
        </tr> */}
      </table>
    </tr>
  );
}
