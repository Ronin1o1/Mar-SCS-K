import React, { Fragment, useContext } from "react";
import styles from "./HotelPGOOSMaintenance.css";
import { FilterRightPanelList } from "./FilterRightPanelList";
import HotelPGOOSMaintenanceContext from "../context/HotelPGOOSMaintenanceContext";
import { CLoader } from "../../../../common/components/CLoader";

export function FilterRightPanel(props: {
  panelData: any;
  isMakingRequest: boolean;
  removalReasonFunc: (isAreaRemoval: boolean) => void;
  removalReason: any;
  getPGOOSAuditTrailDetail: (data: any) => void;
  PGOOSAuditTrailDetail: any;
  setStoreRequestPayload: (data: any) => void;
}) {
  const contexts = useContext(HotelPGOOSMaintenanceContext);

  /**
   *
   * @param orderBy
   */
  const handleOrderChange = (orderBy: number) => {
    contexts.getHotelPGOOSList(contexts.storeRequestPayload, orderBy);
  };

  return (
    <Fragment>
      {props.isMakingRequest && <CLoader />}
      <td style={{ width: "100%" }}>
        <div
          className={styles.awesome}
          style={{
            borderTop: "2px solid #aca899",
            borderLeft: "2px solid #aca899",
            // width: "100%",
            marginTop: 27,
            display: "block",
          }}
        >
          <form name="thisForm" id="thisForm" method="post" autoComplete="off">
            <table className={styles.fullHeight}>
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
                        height: "calc(100vh - 147px)",
                        userSelect: "none",
                      }}
                      id="gridNode"
                      className={`${styles.grid} ${styles.pgoosTabledata}`}
                    >
                      <div
                        style={{ width: "901px" }}
                        className={styles.gridHeader}
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
                                >
                                  Marsha
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "50px",
                                  minWidth: "50px",
                                }}
                                className={styles.gridCell}
                              >
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => handleOrderChange(1)}
                                  style={{ marginRight: "0px" }}
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
                                  onClick={() => handleOrderChange(2)}
                                  style={{ marginRight: "0px" }}
                                >
                                  PGOOS Removal Reason
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "50px",
                                  minWidth: "50px",
                                }}
                                className={styles.gridCell}
                              >
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => handleOrderChange(3)}
                                  style={{ marginRight: "0px" }}
                                >
                                  GPP PGOOS
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
                                  onClick={() => handleOrderChange(4)}
                                >
                                  GPP PGOOS Removal Reason
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "50px",
                                  minWidth: "50px",
                                }}
                                className={styles.gridCell}
                              >
                                <a
                                  href="javascript:void(0);"
                                  onClick={() => handleOrderChange(5)}
                                >
                                  Will Not Price
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
                                  onClick={() => handleOrderChange(6)}
                                >
                                  City
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
                                  style={{ marginRight: "0px" }}
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
                                  onClick={() => handleOrderChange(8)}
                                >
                                  Country/ Region
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "110px",
                                  minWidth: "110px",
                                }}
                                className={styles.gridCell}
                              >
                                Who's Changed
                              </th>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <FilterRightPanelList {...props} />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>
      </td>
    </Fragment>
  );
}
