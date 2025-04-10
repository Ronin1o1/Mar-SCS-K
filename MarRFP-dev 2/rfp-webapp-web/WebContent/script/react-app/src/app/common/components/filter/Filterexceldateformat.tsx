import React, { useEffect } from "react";
import Settings from "./static/Settings";
import styles from "./Filter.css";

export function Filterexceldateformat(props) {
  const dateFormat = ["YYYY-MM-DD", "DD.MM.YYYY", "MM/DD/YYYY"];
  const getDateFormat = () => {
    return dateFormat.map((item) => {
      return <option value={item}>{item}</option>;
    });
  };

  useEffect(() => {
    props.setRequestPayload &&
      props.setRequestPayload(props.filterContext.requestPayload);
  }, [props.filterContext]);

  return (
    <>
      <table className={styles.dateFormat}>
        <tr>
          <td>
            <b>{Settings.DateFormat}</b>
          </td>
          <td style={{ height: "30px" }}>
            <select
              id={Settings.dateFormatId}
              name={Settings.dateFormatId}
              style={{ height: "20px", width: "218px" }}
              onChange={(event) => {
                props.filterContext.setRequestPayload({
                  ...props.filterContext.requestPayload,
                  strFilterValues: {
                    ...props.filterContext.requestPayload.strFilterValues,
                    exceldateformat: event.target.value,
                  },
                });
              }}
            >
              {getDateFormat()}
            </select>
          </td>
        </tr>
      </table>
    </>
  );
}
