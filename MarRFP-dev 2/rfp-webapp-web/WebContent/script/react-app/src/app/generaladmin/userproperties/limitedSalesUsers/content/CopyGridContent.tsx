/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from "react";
import UserEditContext from "../context/UserEditContext";
import APIEdit from "../service/APIEdit";
import Settings from "../static/Settings";
import styles from "../content/UserEditProperty.css";
import CCheckbox from "../../../../common/components/CCheckbox";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnCancel from "../../../../common/assets/img/button/btnCancel.gif";
import { CopySearchFilter } from "./CopySearchFilter";
import { CPagination } from "../../../../common/components/CPagination";

let contextType = null;

function CopyGridContent(data) {
  const [pageLoader, setPageLoader] = useState(true);
  const copyContent = data.data;

  useEffect(() => {
    const params = {
      userid: copyContent.userid,
      role: copyContent.role,
    };
    APIEdit.getHotelUserEditCopy(params).then((response) => {
      if (response) {
        contextType.setUserEditCopy(response);
      }
      setPageLoader(false);
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

  const handleCopyPagination = (pageNumber: number, type: string) => {
    contextType.setPNumber(pageNumber);
    contextType.setCopySearchCriteria({
      ...contextType.copySearchCriteria,
      strDialogPage: {
        page: pageNumber,
      },
    });
    contextType.refreshScroll(Settings.ids.userEditCopyListId);
  };

  return (
    <UserEditContext.Consumer>
      {(userEdit) => {
        contextType = userEdit;
        return (
          <div>
            {pageLoader ? (
              <span className="wait">{Settings.labels.loadingMessage}</span>
            ) : (
              <table
                className={` ${styles.menuWdth100_Height} ${styles.scrollOuterTable}`}
              >
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
                              <CopySearchFilter></CopySearchFilter>
                            </td>
                          </tr>
                          <tr className={styles.floatRight}>
                            <td>
                              <CPagination
                                totalPages={contextType.state.totPropSelPageLen}
                                context={contextType}
                                handlePaginationAPI={() => {
                                  handleCopyPagination(
                                    contextType.state.totPropSelPageLen,
                                    "Property"
                                  );
                                }}
                              />
                            </td>
                          </tr>
                          <tr className={styles.clearBoth}>
                            <></>
                          </tr>
                          <></>
                          <tr></tr>
                          <tr className={styles.selectPropTr}>
                            <td className={styles.selectTDProp}>
                              <div className={styles.gridNode}>
                                <div className={styles.copyInnerDiv}>
                                  <table
                                    className={`${styles.gridOne} ${styles.zero_Height} ${styles.tableWidth}`}
                                  >
                                    <tbody>
                                      <tr className={styles.outerDiv}>
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
                                          {contextType.state.userEditCopyData
                                            .userEditCopyList.length <= 0 ? (
                                            <div
                                              className={styles.gridDataRow}
                                            ></div>
                                          ) : (
                                            <div>
                                              {
                                                <table
                                                  id={
                                                    Settings.ids
                                                      .userEditCopyListId
                                                  }
                                                  className={` ${styles.gridRowTable} ${styles.zero_Height} ${styles.tableWidth} ${styles.applyScroll}`}
                                                >
                                                  <tbody>
                                                    {contextType.state.userEditCopyData.userEditCopyList.map(
                                                      (data) => {
                                                        return (
                                                          <tr
                                                            className={
                                                              styles.gridCellTrInner
                                                            }
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
                                                              {data.cn_lastname}
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
                                                        );
                                                      }
                                                    )}
                                                  </tbody>
                                                </table>
                                              }
                                            </div>
                                          )}
                                        </div>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                              <div className={styles.buttonContainer}>
                                <div className={styles.buttonPosition}>
                                  <img
                                    src={btnUpdate}
                                    onClick={(e) => {
                                      contextType.updateCopy(e);
                                    }}
                                  />
                                  <>&nbsp;</>
                                  <img
                                    src={btnCancel}
                                    onClick={(e) => {
                                      contextType.copyUser_onclick(true);
                                    }}
                                  />
                                </div>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            )}
          </div>
        );
      }}
    </UserEditContext.Consumer>
  );
}

export default CopyGridContent;
