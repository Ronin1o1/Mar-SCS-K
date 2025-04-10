/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import styles from "../content/UserEdit.css";
import Settings from "../static/Settings";
//import CCheckbox from "../../../../common/components/CCheckbox";
import { ListView } from "../../shared/listView";
import screenLoader from "../../../../common/assets/img/screenloader.gif";

export const AvailableProperties = (props) => {
  useEffect(() => {
    const myDiv = document.getElementById(props.id);
    if (myDiv) {
      myDiv.scrollTop = 0;
    }
  }, [
    props.context?.isLoaded,
    props.type,
    props.resetScroll,
    props.hotellistAll,
    props.id,
  ]);

  const ValidateCondition = () => {
    if (
      (props.type == "regionProp" ||
        props.type == "brandProp" ||
        props.type == "franchiseProp") &&
      props.hotellistAll.length <= 0
    )
      return true;
    else if (
      (props.type == "selectProp" || props.type == "availProp") &&
      props.isAllHotels &&
      props.totPropPageLen == 0
    )
      return true;
    else return false;
  };

  return (
    <>
      {props.hotellistAll && (
        <table className={`${styles.menuWdth100_Height} ${styles.selectProp}`}>
          <tbody>
            <tr className={styles.selectPropTr}>
              <td className={styles.widthTen}></td>
              <td className={styles.height100Top}>
                <div className={styles.gridNode}>
                  <div className={styles.gridHeader}>
                    <table
                      className={`${styles.gridOne} ${styles.zero_Height}`}
                    >
                      <tbody>
                        <tr>
                          <th className={styles.HeaderCls}>
                            <b>{props.heading}</b>
                          </th>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {props.type == "availProp" &&
                  props?.context?.state?.userArray?.showScreenLoader ? (
                    <img
                      style={{ position: "absolute", top: "55%", left: "45%" }}
                      src={screenLoader}
                    />
                  ) : (
                    <div
                      id={props.id}
                      className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                    >
                      {props.hotellistAll.length <= 0 ? (
                        <div className={styles.gridRow}>
                          <table
                            className={styles.gridRowTable}
                            id="gridTableView"
                          >
                            <tbody>
                              <tr>
                                <td className={styles.middle}>
                                  {Settings.labels.noDataFound}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div>
                          {ValidateCondition() ? (
                            <div className={styles.gridRow}>
                              <table
                                className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                id="gridTableView"
                              >
                                <tbody>
                                  <tr>
                                    <td className={styles.middle}>
                                      {Settings.labels.allPropertiesSelected}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div>
                              {props.hotellistAll.map((data) => {
                                return (
                                  <ListView
                                    data={data}
                                    handleChange={props.handleChange}
                                    type={props.type}
                                  />
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};
export default AvailableProperties;
