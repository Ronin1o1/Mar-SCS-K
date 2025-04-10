import React, { Fragment, useContext } from "react";
import { CLoader } from "../../../../common/components/CLoader";
import styles from "../../../../common/assets/css/commonBase.css";
import { HotelGPPPGOOSTableRows } from "./HotelGPPPGOOSTableRows";
import GPPPGOOSMaintenanceContext from "../context/GPPPGOOSMaintenanceContext";

export function HotelGPPPGOOSRightPanel(props: any) {
  const contexts = useContext(GPPPGOOSMaintenanceContext);

  const handleOrderChange = (orderBy: number) => {
    document.getElementById("gridView").scrollTop = 0;
    contexts.getHotelPGOOSList(contexts.storeRequestPayload, orderBy);
  };

  return (
    <Fragment>
      {props.isMakingRequest && (
        <CLoader componentName="hotelGPPPGOOSMaintenance" />
      )}
      <div>
        <form name="thisForm" id="thisForm" method="post" autoComplete="off">
          <table>
            <tbody>
              <tr style={{ height: "100%" }} id="gridTR">
                <td
                  style={{
                    height: "100%",
                    verticalAlign: "top",
                  }}
                >
                  <div
                    style={{
                      height: "calc(100vh - 150px)",
                      userSelect: "none",
                    }}
                    id="gridNode"
                    className={`${styles.grid} ${styles.gppTabledata}`}
                  >
                    <div
                      className={`${styles.gridHeader} ${styles.gppTabledata}`}
                      id="gridHeader"
                    >
                      <table
                        style={{
                          height: "32px",
                        }}
                        className={styles.gridRowTable}
                        id="gridTableHeader"
                        cellSpacing={0}
                        cellPadding={0}
                      >
                        <tbody>
                          <tr>
                            <th
                              style={{
                                width: "60px",
                                minWidth: "60px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(0)}
                                style={{ fontWeight: "bold" }}
                              >
                                MARSHA
                              </a>
                            </th>
                            <th
                              style={{
                                width: "220px",
                                minWidth: "220px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(1)}
                                style={{ fontWeight: "bold" }}
                              >
                                Name
                              </a>
                            </th>
                            <th
                              style={{
                                width: "61px",
                                minWidth: "61px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(2)}
                                style={{ fontWeight: "bold" }}
                              >
                                PGOOS
                              </a>
                            </th>
                            <th
                              style={{
                                width: "150px",
                                minWidth: "150px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(3)}
                                style={{ fontWeight: "bold" }}
                              >
                                PGOOS Removal Reason
                              </a>
                            </th>
                            <th
                              style={{
                                width: "110px",
                                minWidth: "110px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(5)}
                                style={{ fontWeight: "bold" }}
                              >
                                City
                              </a>
                            </th>
                            <th
                              style={{
                                width: "66px",
                                minWidth: "66px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(6)}
                                style={{ fontWeight: "bold" }}
                              >
                                State/ Province
                              </a>
                            </th>
                            <th
                              style={{
                                width: "60px",
                                minWidth: "60px",
                              }}
                              className={styles.gridCell}
                            >
                              <a
                                href="javascript:void(0);"
                                onClick={() => handleOrderChange(7)}
                                style={{ fontWeight: "bold" }}
                              >
                                Country/ Region
                              </a>
                            </th>
                            <th
                              style={{
                                width: "100px",
                                minWidth: "100px",
                              }}
                              className={styles.gridCell}
                            ></th>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    <HotelGPPPGOOSTableRows {...props} />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </Fragment>
  );
}
