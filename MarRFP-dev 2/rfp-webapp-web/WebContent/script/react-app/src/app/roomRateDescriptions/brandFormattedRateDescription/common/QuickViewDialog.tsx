import React, { FC } from "react";
import btnClose from "../../../common/assets/img/button/btnClose.gif";
import Settings from "../static/Settings";
import styles from "./QuickViewDialog.css";

interface IQuickViewDialog {
  rateProductSearch: any;
  closeDialog: (e) => void;
  showContents: boolean;
  quickViewLoadingMsg: string;
}
const QuickViewDialog: FC<IQuickViewDialog> = (props): JSX.Element => {
  return (
    <>
      <table className={styles.mainTable}>
        {props.showContents &&
        props.rateProductSearch.rateProductListView &&
        props.rateProductSearch.rateProductListView.length > 0 ? (
          <>
            <tr>
              <td>
                <div className={styles.quickView}>
                  <table
                    className={` ${styles.mainTable} ${styles.tableMargin} `}
                  >
                    {props.rateProductSearch.rateProductListView.map((data) => {
                      return (
                        <>
                          <tr>
                            <td>{data.rp_ListName}</td>
                          </tr>
                          <tr>
                            <td>
                              <table className={styles.mainTable}>
                                {data.rateProductGroupView.length > 0 &&
                                  data.rateProductGroupView.map((item) => {
                                    return (
                                      <>
                                        <tr>
                                          <td className={styles.width_5}></td>
                                          <td>{item?.rp_GroupName.trim()}</td>
                                        </tr>
                                        <tr>
                                          <td className={styles.width_5}></td>
                                          <td>
                                            <table className={styles.mainTable}>
                                              {item.rateProductView.map(
                                                (itemval) => {
                                                  return (
                                                    <>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.width_10
                                                          }
                                                        ></td>
                                                        <td
                                                          className={
                                                            styles.width_30
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
                                                            styles.width_30
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
                                  })}
                              </table>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </table>
                </div>
              </td>
            </tr>
            <tr>
              <td className={styles.bottomMargin}>
                <img
                  className={styles.centerAlign}
                  src={btnClose}
                  onClick={(e) => {
                    props.closeDialog(e);
                  }}
                />
              </td>
            </tr>
          </>
        ) : (
          <tr>
            <td>
              {props.quickViewLoadingMsg == "" ? Settings.labels.noProdDef : ""}
            </td>
          </tr>
        )}
      </table>
    </>
  );
};

export default QuickViewDialog;
