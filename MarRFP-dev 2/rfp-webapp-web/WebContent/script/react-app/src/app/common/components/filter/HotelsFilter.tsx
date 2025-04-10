
import React from "react";
import styles from "./Filter.css";

export function HotelsFilter(props) {
  const getHotelList = () => {
    const hotelsList =["All hotels", "Volunteered Rates", "GPP Rates", "Prior Year Portfolio"]
    return hotelsList.map((item) => {
      return <option value={item}>{item}</option>;
    });
  };

  return (
    <table
      className={styles.field_Name}
      width="100%"
      cellSpacing={3}
      cellPadding={2}
    >
      <tbody>
        <tr>
          <td>Hotels</td>
          <td
            style={{
              height: "30px",
            }}
          >
            {}
            <select
              id="filterValues.solicittype"
              name="filterValues.solicittype"
              className={styles.FilterSelect}
              style={{
                height: "20px",
                width: "218px",
              }}
              onChange={(event) => {
                props.filterContext.setRequestPayload({
                  ...props.filterContext.requestPayload,
                  strFilterValues: {
                    ...props.filterContext.requestPayload.strFilterValues,
                    solicittype: event.target.value,
                  },
                });
                props.filterContext.setIsDataChange(true);
              }}
            >
              {getHotelList()}
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
