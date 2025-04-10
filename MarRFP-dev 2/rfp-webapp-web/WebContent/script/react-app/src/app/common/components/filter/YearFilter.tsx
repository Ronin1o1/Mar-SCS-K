import React, { useEffect, useState } from "react";
import styles from "./Filter.css";

export function YearFilter(props) {
  const payLoad = JSON.parse(localStorage.getItem("REQUEST_PAYLOAD"));
  const session_year =
    payLoad !== undefined && payLoad !== false
      ? payLoad?.strFilterValues?.year
      : "";
  const getYears = () => {
    return props.filterContext.filterViewLists?.periodList?.map((item) => {
      return <option value={item.period}>{item.period}</option>;
    });
  };
  useEffect(() => {
    props.setRequestPayload &&
      props.setRequestPayload(props.filterContext.requestPayload);
  }, [props.filterContext]);

  return (
    <table
      className={styles.field_Name}
      width="100%"
      cellSpacing={3}
      cellPadding={2}
    >
      <tbody>
        <tr>
          <td>
            Year:
          </td>
          <td
            style={{
              height: "30px",
            }}
          >
            {props.isUpdateMultiple ? (
              <select
                id="filterValues.year"
                name="filterValues.year"
                className={styles.FilterSelect}
                style={{
                  height: "15px",
                  width: "48px",
                }}
                value={
                  props.isUpdateMultiple &&
                  props.filterContext?.updateMutipleRequestEvents
                    ?.yearChangeEvent
                    ? props.filterContext.requestPayload?.strFilterValues?.year
                    : session_year
                }
                onChange={(event) => {
                  props.isUpdateMultiple &&
                    props.filterContext.setupdateMutipleRequestInitialChangeEvents(
                      {
                        ...props.filterContext.updateMutipleRequestEvents,
                        yearChangeEvent: true,
                      }
                    );
                  const showOptions = props.showOptions?.pfo?.showOptions;
                  showOptions?.showAccountFilter || props.isUpdateMultiple
                    ? (props.filterContext.setRequestPayload({
                        ...props.filterContext.requestPayload,
                        strFilterValues: {
                          ...props.filterContext.requestPayload.strFilterValues,
                          year: parseInt(event.target.value),
                          accountFilter: {
                            ...props.filterContext.requestPayload
                              .strFilterValues.accountFilter,
                            accountrecid: null,
                          },
                        },
                      }),
                      props.filterContext.handleYearChange(
                        props.filterContext.requestPayload.strFilterValues
                          ?.accountFilter?.accountType,
                        parseInt(event.target.value)
                      ))
                    : props.filterContext.setRequestPayload({
                        ...props.filterContext.requestPayload,
                        strFilterValues: {
                          ...props.filterContext.requestPayload.strFilterValues,
                          year: parseInt(event.target.value),
                        },
                      });
                  props.filterContext.setIsDataChange(true);
                }}
              >
                {getYears()}
              </select>
            ) : (
              <select
                id="filterValues.year"
                name="filterValues.year"
                className={styles.FilterSelect}
                style={{
                  height: "20px",
                  width: "218px",
                }}
                onChange={(event) => {
                  const showOptions = props.showOptions?.pfo?.showOptions;
                  showOptions?.showAccountFilter || props.isUpdateMultiple
                    ? (props.filterContext.setRequestPayload({
                        ...props.filterContext.requestPayload,
                        strFilterValues: {
                          ...props.filterContext.requestPayload.strFilterValues,
                          year: parseInt(event.target.value),
                          accountFilter: {
                            ...props.filterContext.requestPayload
                              .strFilterValues.accountFilter,
                            accountrecid: null,
                          },
                        },
                      }),
                      props.filterContext.handleYearChange(
                        props.filterContext.requestPayload.strFilterValues
                          ?.accountFilter?.accountType,
                        parseInt(event.target.value)
                      ))
                    : props.filterContext.setRequestPayload({
                        ...props.filterContext.requestPayload,
                        strFilterValues: {
                          ...props.filterContext.requestPayload.strFilterValues,
                          year: parseInt(event.target.value),
                        },
                      });
                  props.filterContext.setIsDataChange(true);
                }}
              >
                {getYears()}
              </select>
            )}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
