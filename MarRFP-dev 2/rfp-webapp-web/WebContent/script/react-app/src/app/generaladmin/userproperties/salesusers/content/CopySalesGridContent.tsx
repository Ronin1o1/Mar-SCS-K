/* eslint-disable react/jsx-key */
import React, { useEffect } from "react";
import UserEditSalesContext from "../context/UserEditSalesContext";
import APIEdit from "../service/APIEditSales";
import Settings from "../static/Settings";
import styles from "../content/UserEditSales.css";
import CCheckbox from "../../../../common/components/CCheckbox";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnCancel from "../../../../common/assets/img/button/btnCancel.gif";
import { CopySalesSearchFilter } from "../content/CopySalesSearchFilter";
import { CPagination } from "../../../../common/components/CPagination";
import Error from "../../../../shared/components/error";

let contextType = null;

function CopySalesGridContent(data) {
  const copyContent = data.data;

  useEffect(() => {
    const params = {
      userid: copyContent.userid,
      role: copyContent.role,
    };
    APIEdit.getSalesUserEditCopy(params).then((response) => {
      if (response) {
        contextType.setUserEditCopy(response);
        contextType.stopLoader();
      }
    });
  }, []);

  const handleOnChange = (event) => {
    let strEidList = "";
    if (event.target.checked) {
      strEidList = event.target.value + ",";
      if (contextType.eidList) {
        if (contextType.eidList.indexOf(event.target.value) == -1) {
          strEidList += contextType.eidList + ",";
        }
      }
      strEidList = strEidList.slice(0, -1);
    } else {
      if (contextType.eidList) {
        strEidList = contextType.eidList.replace(event.target.value, "");
      }
    }
    contextType.setEidList(strEidList);
  };

  const handleCopyPagination = (pageNumber: number) => {
    contextType.setCopyPNumber(pageNumber);
    contextType.setCopySearchCriteria({
      ...contextType.copySearchCriteria,
      strDialogPage: {
        page: pageNumber,
      },
    });
    contextType.onCopyClickSearch(pageNumber);
  };

  return (
    <UserEditSalesContext.Consumer>
      {(userEditSales) => {
        contextType = userEditSales;
        return (
          <div>
            {contextType.state.showLoader ? (
              <span className="wait">{Settings.labels.loadingMessage}</span>
            ) : (
              <table className={` ${styles.menuWdth100_Height}`}>
                <tbody>
                  <tr className={styles.top}>
                    <td className={styles.top}>
                      <table className={styles.copyInnerTableContainer}>
                        <tbody>
                          <tr className={styles.top}>
                            <td className={styles.copyInnerTableVertical}>
                              {Settings.labels.currentAuthorizedList}
                            </td>
                          </tr>
                          <tr
                            className={`${styles.BGDarkBlueStyle} ${styles.top}`}
                          >
                            <td height={2} className={styles.heightTop}></td>
                          </tr>
                          <tr>
                            <td>
                              <CopySalesSearchFilter
                                addSpace={false}
                              ></CopySalesSearchFilter>
                            </td>
                          </tr>
                          <tr className={styles.floatRight}>
                            <td>
                              <CPagination
                                totalPages={
                                  contextType.state.userEditCopyData
                                    .totalDialogPages
                                }
                                context={contextType}
                                resetInput={contextType.resetInput}
                                handlePaginationAPI={handleCopyPagination}
                              />
                            </td>
                          </tr>
                          {contextType.showCErrorPage == false ? (
                            <tr className={styles.selectPropTr}>
                              <td className={styles.selectTDProp}>
                                <div className={styles.gridNode}>
                                  <div className={styles.copyInnerDiv}>
                                    <table
                                      className={`${styles.gridOne} ${styles.zero_Height} ${styles.tableSize}`}
                                    >
                                      <tbody>
                                        <tr className={styles.tableWidth}>
                                          <th className={styles.gridCellWidth}>
                                            {Settings.tableColumns.eid.header}
                                          </th>
                                          <th className={styles.gridCellWidth}>
                                            {Settings.tableColumns.lname.header}
                                          </th>
                                          <th className={styles.gridCellWidth}>
                                            {Settings.tableColumns.fname.header}
                                          </th>
                                        </tr>
                                        <tr>
                                          <div className={styles.gridDataTable}>
                                            <div>
                                              {contextType.state
                                                .userEditCopyData
                                                .userEditCopyList.length >
                                                0 && (
                                                <table
                                                  id="copyTableGrid"
                                                  className={` ${styles.gridRowTable} ${styles.zero_Height} ${styles.tableSize} ${styles.applyScrollAuto}`}
                                                >
                                                  <tbody>
                                                    {contextType.state.userEditCopyData.userEditCopyList.map(
                                                      (data, index) => {
                                                        return (
                                                          <>
                                                            <tr
                                                              className={`${
                                                                index % 2 > 0
                                                                  ? styles.gridCellEven
                                                                  : styles.gridCellOdd
                                                              }`}
                                                            >
                                                              <td
                                                                className={
                                                                  styles.gridCellTd
                                                                }
                                                              >
                                                                <CCheckbox
                                                                  type={
                                                                    Settings
                                                                      .inputType
                                                                      .checkbox
                                                                  }
                                                                  id={
                                                                    data.cn_userid
                                                                  }
                                                                  name={
                                                                    data.cn_userid
                                                                  }
                                                                  value={
                                                                    data.cn_userid
                                                                  }
                                                                  onChangeHandler={(
                                                                    e
                                                                  ) =>
                                                                    handleOnChange(
                                                                      e
                                                                    )
                                                                  }
                                                                ></CCheckbox>
                                                                {data.eid}
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.gridCellTd
                                                                }
                                                              >
                                                                {
                                                                  data.cn_lastname
                                                                }
                                                              </td>
                                                              <td
                                                                className={
                                                                  styles.gridCellTd
                                                                }
                                                              >
                                                                {
                                                                  data.cn_firstname
                                                                }
                                                              </td>
                                                            </tr>
                                                            {index % 2 >= 1 && (
                                                              <div
                                                                className={
                                                                  styles.gridRowCopy
                                                                }
                                                              ></div>
                                                            )}
                                                          </>
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              )}
                                            </div>
                                          </div>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </div>
                                <div className={styles.alignCenter}>
                                  <div
                                    className={`${styles.buttonPosition} ${styles.cursorArrow}`}
                                  >
                                    <img
                                      className={styles.cursorArrow}
                                      src={btnUpdate}
                                      onClick={(e) => {
                                        contextType.updateCopy();
                                      }}
                                    />
                                    <img
                                      className={`${styles.cursorArrow} ${styles.ml14}`}
                                      src={btnCancel}
                                      onClick={(e) => {
                                        contextType.copyUser_onclick(true);
                                      }}
                                    />
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ) : (
                            <Error />
                          )}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
            <style>
              {`
              img {
                cursor: default !important;
              }
              `}
            </style>
          </div>
        );
      }}
    </UserEditSalesContext.Consumer>
  );
}

export default CopySalesGridContent;
