import React, { Fragment, useContext } from "react";
import styles from "./PropertyList.css";
import { FilterRightPanelList } from "./FilterRightPanelList";
import PropertyListContext from "../context/PropertyListContext";
import { CLoader } from "../../../common/components/CLoader";

export function FilterRightPanel(props: {
  panelData: any;
  isMakingRequest: boolean;
  setStoreRequestPayload: (data: any) => void;
}) {
  const contexts = useContext(PropertyListContext);

  /**
   *
   * @param orderBy
   */
  const handleOrderChange = (orderBy: number) => {
    contexts.getHotelPropertyList(contexts.storeRequestPayload, orderBy);
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
            marginTop: 23,
            display: "block"
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
                        userSelect: "none",
                      }}
                      id="gridNode"
                      className={`${styles.grid} ${styles.listTabledata}`}
                    >
                      <div
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
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(1)}>
                                  MARSHA
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "240px",
                                  minWidth: "240px",
                                }}
                                className={styles.gridCell}
                              >
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(2)}>
                                  Name
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "110px",
                                  minWidth: "110px",
                                }}
                                className={styles.gridCell}
                              >
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(3)}>
                                  City
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "50px",
                                  minWidth: "50px",
                                }}
                                className={styles.gridCell}
                              >
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(4)}>
                                State/ Province
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "50px",
                                  minWidth: "50px",
                                }}
                                className={styles.gridCell}
                              >
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(5)}>
                                Country/ Region
                                </a>
                              </th>
                              <th
                                style={{
                                  width: "80px",
                                  minWidth: "80px",
                                }}
                                className={styles.gridCell}
                              >
                                <a href="javascript:void(0);" onClick={() => handleOrderChange(6)}>
                                  Pre-Opening
                                </a>
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
