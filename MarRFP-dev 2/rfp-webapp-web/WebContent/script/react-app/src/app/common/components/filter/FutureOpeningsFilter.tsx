import React, { useState } from "react";
import styles from "./Filter.css";
import Utils from "../../../common/utils/Utils";

export function FutureOpeningsFilter(props) {
  const [futureDates, setFutureDates] = useState({
    strFromDate: "",
    strToDate: "",
    allFutureChecked: false,
  });

  const setDateAutoFormat = (strDate) => {
    let dateArray = strDate.split("/");
    let imonth = parseInt(dateArray[0], 10);
    let iday = parseInt(dateArray[1], 10);
    let iyear = parseInt(dateArray[2], 10);
    if (iyear < 100) {
      if (iyear > 90) iyear += 1900;
      else iyear += 2000;
    }
    let strMonth;
    let strDay;
    let strTemp = String(imonth);
    if (strTemp.length == 1) strMonth = "0" + strTemp;
    else strMonth = strTemp;

    strTemp = String(iday);
    if (strTemp.length == 1) strDay = "0" + strTemp;
    else strDay = strTemp;
    return strMonth + "/" + strDay + "/" + String(iyear);
  };

  const handleRequestPayload = (allFutureChecked: boolean) => {
    props.filterContext.setRequestPayload({
      ...props.filterContext.requestPayload,
      strFilterValues: {
        ...props.filterContext.requestPayload.strFilterValues,
        futureOpeningFilter: {
          ...props.filterContext.requestPayload.strFilterValues
            .futureOpeningFilter,
          strFromDate:
            futureDates.strFromDate
              ? setDateAutoFormat(futureDates.strFromDate)
              : "",
          strToDate:
            futureDates.strToDate
              ? setDateAutoFormat(futureDates.strToDate)
              : "",
          allFutureOpenings: allFutureChecked ? "Y" : "",
        },
      },
    });
  };

  const handleDateFormat = (isEndDate: boolean = false) => {
    props.filterContext.setIsDataChange(true);
    const inputDate = isEndDate
      ? futureDates.strToDate
      : futureDates.strFromDate;
    if (Utils.checkDate(inputDate)) {
        setFutureDates({
          ...futureDates,
          strFromDate: futureDates.strFromDate
            ? setDateAutoFormat(futureDates.strFromDate)
            : "",
          strToDate: futureDates.strToDate
            ? setDateAutoFormat(futureDates.strToDate)
            : "",
        });
        handleRequestPayload(futureDates.allFutureChecked);
    }
  };

  return (
    <table className={styles.zeroHeight}>
      <tbody>
        <tr>
          <td>
            <table className={styles.zeroHeight}>
              <tbody>
                <tr>
                  <td className={styles.field_Name}>Future Openings</td>
                </tr>
                <tr>
                  <td className={styles.field_Name}>
                    <input
                      id="filterValues.futureOpeningFilter.allFutureOpenings"
                      name="filterValues.futureOpeningFilter.allFutureOpenings"
                      type="checkbox"
                      defaultValue="Y"
                      onChange={(event) => {
                        props.filterContext.setIsDataChange(true);
                        setFutureDates({
                          ...futureDates,
                          allFutureChecked: event.target.checked,
                        });
                        handleRequestPayload(event.target.checked);
                      }}
                    />{" "}
                    All Future Openings
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
        <tr>
          <td className={styles.Cell}>
            <table className={styles.menuWdth100Height}>
              <tbody>
                <tr>
                  <td className={styles.field_Name}>
                    From:{" "}
                    <input
                      className={styles.FilterSelect}
                      maxLength={10}
                      onKeyPress={Utils.DateNumberOnly_onkeypress}
                      id="filterValues.futureOpeningFilter.strFromDate"
                      name="filterValues.futureOpeningFilter.strFromDate"
                      style={{
                        height: "22px",
                        width: "85px",
                      }}
                      onChange={(event) => {
                        setFutureDates({
                          ...futureDates,
                          strFromDate: event.target.value,
                        });
                      }}
                      onBlur={() => handleDateFormat()}
                      value={futureDates.strFromDate}
                    />
                  </td>
                  <td className={styles.field_Name}>
                    To:{" "}
                    <input
                      className={styles.FilterSelect}
                      maxLength={10}
                      onKeyPress={Utils.DateNumberOnly_onkeypress}
                      id="filterValues.futureOpeningFilter.strToDate"
                      name="filterValues.futureOpeningFilter.strToDate"
                      style={{
                        height: "22px",
                        width: "85px",
                      }}
                      onChange={(event) => {
                        setFutureDates({
                          ...futureDates,
                          strToDate: event.target.value,
                        });
                      }}
                      onBlur={() => {
                        handleDateFormat(true);
                      }}
                      value={futureDates.strToDate}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
