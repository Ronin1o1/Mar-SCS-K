import React from "react";
import styles from "../assets/css/commonBase.css";
import revisit from "../assets/img/revisit.gif";

export function CMasterListTable(props) {
  function handleNavigation(data) {
    props.viewHandler(data);
  }
  return props.componentName !== "SelectRateProgram" ? (
    <table className={styles.fullHeight}>
      <tbody>
        <tr style={{ height: "100%" }} id="gridTR">
          <td style={{ width: "10px" }} />
          <td valign="top" height="100%">
            <div
              style={{
                height: "auto",
                userSelect: "none",
                borderBottom: props.borderBottom ? props.borderBottom : null,
                width: props.tableWidth ? props.tableWidth : "280px",
              }}
              id="gridNode"
              className={styles.grid}
            >
              <div
                style={{ width: props.tableWidth ? props.tableWidth : "280px" }}
                className={styles.gridHeader}
                id={styles.gridHeader}
              >
                <table
                  style={{ height: "32px" }}
                  className={styles.gridRowTable}
                  id="gridTableHeader"
                >
                  <tbody>
                    <tr>
                      <th
                        style={{ width: "20px" }}
                        className={styles.gridCell}
                      />
                      <th style={{ width: "60px" }} className={styles.gridCell}>
                        Room Pool
                      </th>
                      <th
                        style={{ width: "100px" }}
                        className={styles.gridCell}
                      >
                        Status
                      </th>
                      <th
                        style={{ width: "100px" }}
                        className={styles.gridCell}
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* gridheader */}
              <div
                style={{
                  height: props.tableBodyHeight
                    ? props.tableBodyHeight
                    : "auto",
                  overflow: "auto",
                }}
                id={styles.gridView}
                className={styles.gridView}
              >
                {/* gridrow */}

                {Array.isArray(props.retriveList) &&
                  props.retriveList &&
                  props.retriveList.length > 0 &&
                  props.retriveList?.map((item, index) => {
                    return (
                      <div
                        className={`${
                          index % 2 ? `${styles.gridRow}` : styles.gridRowOdd
                        }`}
                      >
                        <table
                          style={{ height: "21px" }}
                          className={styles.gridRowTable}
                          id="gridTableView"
                        >
                          <tbody>
                            <tr className={styles.rightPanelRow}>
                              <td
                                style={{ width: "20px" }}
                                className={styles.gridCell}
                              >
                                {item?.hasSyncAlert ? (
                                  <img src={revisit} />
                                ) : (
                                  " "
                                )}
                              </td>
                              <td
                                style={{ width: "60px" }}
                                className={styles.gridCell}
                              >
                                {item?.roomPool}
                              </td>
                              {item?.hasSyncAlert ? (
                                <td
                                  style={{ width: "100px" }}
                                  className={styles.gridCell}
                                >
                                  <font color="Red">Updates Needed</font>
                                </td>
                              ) : (
                                <td
                                  style={{ width: "100px" }}
                                  className={styles.gridCell}
                                >
                                  {item?.hasSyncAlert
                                    ? "Updates Needed"
                                    : item?.hasRoomDefinition
                                    ? "Details Exist"
                                    : "No Details Entered"}
                                </td>
                              )}

                              <td
                                style={{ width: "80px" }}
                                className={styles.gridCell}
                              >
                                {!props.isReadOnly ? (
                                  <a
                                    href="javascript:void(0);"
                                    style={{
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                      color: "#3166cc",
                                    }}
                                    onClick={() => handleNavigation(item)}
                                  >
                                    {" "}
                                    View
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
              </div>
              {/* gridview */}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  ) : (
    <table className={styles.fullHeight}>
      <tbody>
        <tr style={{ height: "100%" }} id="gridTR">
          <td style={{ width: "10px" }} />
          <td>
            <div
              style={{ height: "auto", userSelect: "none", width: "297px" }}
              id="gridNode"
              className={styles.grid}
            >
              <div className={styles.gridHeader} id={styles.gridHeader}>
                <table
                  style={{ height: "32px" }}
                  className={styles.gridRowTable}
                  id="gridTableHeader"
                >
                  <tbody>
                    <tr>
                      {props.componentName === "SelectRateProgram" && (
                        <th
                          style={{ width: "20px" }}
                          className={styles.gridCell}
                        />
                      )}
                      <th
                        style={{ width: "20px" }}
                        className={styles.gridCell}
                      />
                      <th style={{ width: "60px" }} className={styles.gridCell}>
                        Rate Program
                      </th>
                      <th
                        style={{ width: "100px" }}
                        className={styles.gridCell}
                      >
                        Status
                      </th>
                      <th
                        style={{ width: "100px" }}
                        className={styles.gridCell}
                      />
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* gridheader */}
              <div
                style={
                  props.componentName === "SelectRateProgram"
                    ? {
                        minHeight: "10px",
                        maxHeight: "calc(100vh - 290px)",
                        overflow: "auto",
                      }
                    : { height: "400px", overflow: "scroll" }
                }
                id={styles.gridView}
                className={styles.gridView}
              >
                {/* gridrow */}

                {Array.isArray(props.retriveList) &&
                  props.retriveList &&
                  props.retriveList.length > 0 &&
                  props.retriveList?.map((item, index) => {
                    return (
                      <div
                        className={`${
                          index % 2 ? `${styles.gridRow}` : styles.gridRowOdd
                        }`}
                      >
                        <table
                          style={{ height: "21px" }}
                          className={styles.gridRowTable}
                          id="gridTableView"
                        >
                          <tbody>
                            <tr>
                              {props.componentName === "SelectRateProgram" && (
                                <td
                                  style={{ width: "20px" }}
                                  className={styles.gridCell}
                                >
                                  {" "}
                                </td>
                              )}
                              <td
                                style={{ width: "20px" }}
                                className={styles.gridCell}
                              >
                                {" "}
                              </td>
                              <td
                                style={{ width: "60px" }}
                                className={styles.gridCell}
                              >
                                {item?.rateProgram}
                              </td>
                              <td
                                style={{ width: "100px" }}
                                className={styles.gridCell}
                              >
                                {item?.hasRoomDefinition
                                  ? "Details Exist"
                                  : "No Details Entered"}
                              </td>
                              <td
                                style={{ width: "80px" }}
                                className={styles.gridCell}
                              >
                                {!props.isReadOnly ? (
                                  <a
                                    href="javascript:void(0);"
                                    style={{
                                      textDecoration: "underline",
                                      cursor: "pointer",
                                      color: "#3166cc",
                                    }}
                                    onClick={() => handleNavigation(item)}
                                  >
                                    {" "}
                                    View
                                  </a>
                                ) : (
                                  ""
                                )}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
              </div>
              {/* gridview */}
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
