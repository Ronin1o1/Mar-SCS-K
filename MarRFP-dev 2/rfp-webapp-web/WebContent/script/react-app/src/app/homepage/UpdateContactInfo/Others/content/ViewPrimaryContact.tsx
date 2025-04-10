/* eslint-disable react/jsx-key */
import React from "react";
import styles from "./ViewPrimaryContact.css";
import btnClose from "../../../../common/assets/img/button/btnClose.gif";
import Settings from "../../static/Settings";
import SalesUpdateContactInfoContext, {
  SalesUpdateContactInfoContextProvider,
} from "../context/SalesUpdateContactInfoContext";
import { CPagination } from "../../../../common/components/CPagination";

let contextType = null;

export const ViewPrimaryContact = (props) => {
  const handleOnChange = (event) => {
    props.handleChange(event);
  };

  return (
    <SalesUpdateContactInfoContextProvider>
      <SalesUpdateContactInfoContext.Consumer>
        {(SalesUpdateContactInfoContext) => {
          contextType = SalesUpdateContactInfoContext;

          return (
            <>
              <div id="pcDiv" className={styles.width_modal_view_primary}>
                <table className={styles.zero_Height_table}>
                  <tr>
                    <td className={` ${styles.center} ${styles.tablePadding}`}>
                      <a href="javascript:void(0);">
                        <img
                          src={btnClose}
                          className={styles.borderZero}
                          alt={Settings.updateContactInfo.closeText}
                          onClick={(e) => handleOnChange(e)}
                        />
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2} className={styles.headerTitleCls}>
                      {Settings.updateContactInfo.primaryContactsTitle}
                      <hr className={styles.hrCls}></hr>
                    </td>
                  </tr>
                  <tr>
                    <td
                      className={` ${styles.instructions} ${styles.paddingLeft_10}`}
                    >
                      {
                        Settings.updateContactInfo
                          .primaryContactModalInstructions_1
                      }
                      <br></br>
                      {
                        Settings.updateContactInfo
                          .primaryContactModalInstructions_2
                      }
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.heightTen}></td>
                  </tr>
                  <tr>
                    <td className={styles.paddingLeft_10}>
                      {Settings.updateContactInfo.pcForHA}
                    </td>
                  </tr>
                  <tr>
                    <td className={styles.paddingLeft_10}>
                      <CPagination
                        totalPages={props.totalPage}
                        context={contextType}
                        // eslint-disable-next-line @typescript-eslint/no-empty-function
                        handlePaginationAPI={() => {}}
                      />
                    </td>
                  </tr>
                  <tr className={styles.heightHundred} id="gridTR">
                    <td className={styles.heightHundred} valign="top">
                      <div
                        className={`${styles.grid} ${styles.gridNodeCls_View_Primary}`}
                        id="gridNode"
                      >
                        <div
                          className={`${styles.gridHeader} ${styles.height_1100}`}
                          id="gridHeader"
                        >
                          <table
                            className={styles.gridRowTableCls}
                            cellPadding="0"
                            cellSpacing="0"
                            id="gridTableHeader"
                          >
                            <tbody>
                              <tr>
                                <th
                                  className={` ${styles.gridCellCls} ${styles.width_150}`}
                                >
                                  <a href="javascript:void(0);"
                                    onClick={(e) =>
                                      contextType.changePCOrderBy(0)
                                    }
                                  >
                                    {Settings.updateContactInfo.personText}
                                  </a>
                                </th>
                                <th
                                  className={` ${styles.gridCellCls} ${styles.width_300}`}
                                >
                                  <a href="javascript:void(0);"
                                    onClick={(e) =>
                                      contextType.changePCOrderBy(1)
                                    }
                                  >
                                    {Settings.updateContactInfo.hotelText}
                                  </a>
                                </th>
                                <th
                                  className={` ${styles.gridCellCls} ${styles.width_300}`}
                                >
                                  <a href="javascript:void(0);"
                                    onClick={(e) =>
                                      contextType.changePCOrderBy(2)
                                    }
                                  >
                                    {Settings.updateContactInfo.acctText}
                                  </a>
                                </th>
                                <th
                                  className={` ${styles.gridCellCls} ${styles.width_200} ${styles.boldText}`}
                                >
                                  {Settings.updateContactInfo.email}
                                </th>
                                <th
                                  className={` ${styles.gridCellCls} ${styles.width_150} ${styles.boldText}`}
                                >
                                  {Settings.updateContactInfo.phoneNumberText}
                                </th>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <div
                          className={`${styles.gridViewData} ${styles.scrollDiv} `}
                        >
                          {(props.data && props.data) <= 0 ? (
                            <div className={styles.gridRow}>
                              <table
                                className={styles.gridRowTable_21}
                                id="gridTableView"
                              >
                                <tbody>
                                  <tr>
                                    <td
                                      className={` ${styles.middle} ${styles.backgroundGrey}`}
                                    >
                                      {Settings.updateContactInfo.noDataFound}
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          ) : (
                            <div>
                              {props.data.map((data, index) => {
                                return (
                                  <table
                                    className={styles.gridRowTable_21}
                                    cellPadding="0"
                                    cellSpacing="0"
                                    id="gridTableView"
                                  >
                                    <tbody>
                                      {" "}
                                      <tr
                                        className={`${
                                          index % 2
                                            ? styles.gridRow
                                            : styles.gridRowOdd
                                        }`}
                                      >
                                        <td
                                          className={` ${styles.gridCellCls} ${styles.width_150} `}
                                        >
                                          <span>{data.personname}</span>
                                        </td>
                                        <td
                                          className={` ${styles.gridCellCls} ${styles.width_300}`}
                                        >
                                          <span>
                                            {data.marshaCode} - {data.hotelName}
                                          </span>
                                        </td>
                                        <td
                                          className={` ${styles.gridCellCls} ${styles.width_300}`}
                                        >
                                          <span>{data.accountname}</span>
                                        </td>
                                        <td
                                          className={` ${styles.gridCellCls} ${styles.width_200}`}
                                        >
                                          {data.email}
                                        </td>
                                        <td
                                          className={` ${styles.gridCellCls} ${styles.width_150}`}
                                        >
                                          {data.phoneNumber}
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                </table>
              </div>
            </>
          );
        }}
      </SalesUpdateContactInfoContext.Consumer>
    </SalesUpdateContactInfoContextProvider>
  );
};
export default ViewPrimaryContact;
