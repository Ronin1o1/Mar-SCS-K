import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styles from "../content/ModifyRateDescription.css";
import Settings from "../static/Settings";

let marshaCode;
let hotelName;

function RateDescriptionModalContent(props) {
  const history = useHistory();
  const urlParms = useLocation().search;

  marshaCode = new URLSearchParams(urlParms).get(Settings.queryId.marshaCode);
  hotelName = new URLSearchParams(urlParms).get(Settings.queryId.hotelName);

  useEffect(() => {}, []);

  return (
    <div className={styles.descriptionTableContainer}>
      <table>
        {props.data === null ? (
          <tr>
            <td>{Settings.label.ProductDefinition} </td>
          </tr>
        ) : (
          <tr>
            {props.data?.map((productView, i) => {
              return (
                <td key={i} className={styles.mainModalTable}>
                  {" "}
                  <div className={styles.ListName}>
                    <table className="zero-Height">
                      <tr>
                        <td>{productView?.rp_ListName}</td>
                      </tr>
                      <tr>
                        <td>
                          <tr>
                            <td className={styles.smallWidth}></td>
                            <td>
                              <table className={styles.mainTable}>
                                {productView?.rateProductGroupView.length > 0 &&
                                  productView?.rateProductGroupView.map(
                                    (item) => {
                                      return (
                                        <>
                                          <tr>
                                            <td className={styles.width_5}></td>
                                            <td>{item?.rp_GroupName.trim()}</td>
                                          </tr>
                                          <tr>
                                            <td className={styles.width_5}></td>
                                            <td>
                                              <table
                                                className={styles.mainTable}
                                              >
                                                {item.rateProductView.map(
                                                  (itemval) => {
                                                    return (
                                                      <>
                                                        <tr>
                                                          <td
                                                            className={
                                                              styles.widthColumn
                                                            }
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.largeWidth
                                                            }
                                                            align="left"
                                                          >
                                                            {itemval.availabilityInd ==
                                                              "Y" && "Yes"}
                                                            {itemval.availabilityInd ==
                                                              "N" && "No"}
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.largeWidth
                                                            }
                                                            align="left"
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.noWrap
                                                            }
                                                          >
                                                            {itemval.rp_CodeName.trim()}
                                                          </td>
                                                          <td
                                                            className={
                                                              styles.widthColumn
                                                            }
                                                            align="left"
                                                          ></td>
                                                          {itemval.bshowQuantity &&
                                                          itemval.uom_Type !=
                                                            null &&
                                                          itemval.quantity !=
                                                            null ? (
                                                            <td
                                                              align="left"
                                                              className={
                                                                styles.noWrap
                                                              }
                                                            >
                                                              {itemval.quantity}
                                                            </td>
                                                          ) : (
                                                            <>&nbsp;</>
                                                          )}
                                                          <td
                                                            className={`${styles.width_10} ${styles.noWrap}`}
                                                            align="left"
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.noWrap
                                                            }
                                                            align="left"
                                                          >
                                                            {itemval.uom_Type !=
                                                              null &&
                                                            itemval.uom_Name !=
                                                              null ? (
                                                              <>
                                                                <span
                                                                  className={
                                                                    styles.boldText
                                                                  }
                                                                >
                                                                  {itemval?.uom_Type.trim()}
                                                                  :<>&nbsp;</>
                                                                </span>
                                                                <span>
                                                                  {itemval?.uom_Name.trim()}
                                                                </span>
                                                              </>
                                                            ) : (
                                                              <>&nbsp;</>
                                                            )}
                                                          </td>
                                                          <td
                                                            className={`${styles.width_10} ${styles.noWrap}`}
                                                            align="left"
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.noWrap
                                                            }
                                                            align="left"
                                                          >
                                                            {itemval.typeListName !=
                                                              null &&
                                                            itemval.typeName !=
                                                              null ? (
                                                              <>
                                                                <span
                                                                  className={
                                                                    styles.boldText
                                                                  }
                                                                >
                                                                  {itemval?.typeListName.trim()}
                                                                  :<>&nbsp;</>
                                                                </span>
                                                                <span>
                                                                  {itemval?.typeName.trim()}
                                                                </span>
                                                              </>
                                                            ) : (
                                                              <>&nbsp;</>
                                                            )}
                                                          </td>
                                                          <td
                                                            className={`${styles.width_10} ${styles.noWrap}`}
                                                            align="left"
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.noWrap
                                                            }
                                                            align="left"
                                                          >
                                                            {itemval.brandType !=
                                                              null &&
                                                            itemval.brandName !=
                                                              null ? (
                                                              <>
                                                                <span
                                                                  className={
                                                                    styles.boldText
                                                                  }
                                                                >
                                                                  {itemval?.brandType.trim()}
                                                                  :<>&nbsp;</>
                                                                </span>
                                                                <span>
                                                                  {itemval?.brandName.trim()}
                                                                </span>
                                                              </>
                                                            ) : (
                                                              <>&nbsp;</>
                                                            )}
                                                          </td>
                                                          <td
                                                            className={`${styles.width_10} ${styles.noWrap}`}
                                                            align="left"
                                                          ></td>
                                                          <td
                                                            className={
                                                              styles.noWrap
                                                            }
                                                            align="left"
                                                          >
                                                            {itemval.text !=
                                                              null &&
                                                              itemval?.text}
                                                          </td>
                                                        </tr>
                                                      </>
                                                    );
                                                  }
                                                )}
                                              </table>
                                            </td>
                                          </tr>
                                        </>
                                      );
                                    }
                                  )}
                              </table>
                            </td>
                          </tr>
                        </td>
                      </tr>
                    </table>
                  </div>
                </td>
              );
            })}
          </tr>
        )}
      </table>
    </div>
  );
}

export default RateDescriptionModalContent;
