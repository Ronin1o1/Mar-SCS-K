/* eslint-disable react/jsx-key */
import React, { Component, Suspense } from "react";
import UserEditSalesContext, {
  UserEditSalesContextProvider,
} from "../context/UserEditSalesContext";
import styles from "../content/UserEditSales.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnCopy from "../../../../common/assets/img/button/btnCopy.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnDelete from "../../../../common/assets/img/button/btnDelete.gif";
import btnReturnUserList from "../../../../common/assets/img/button/btnReturnUserList.gif";
import btnUnSelectAll from "../../../../common/assets/img/button/btnUnSelectAll.gif";
import Settings from "../static/Settings";
import APIEdit from "../service/APIEditSales";
import { ListView } from "../../shared/listView";
import Error from "../../../../shared/components/error";
import CModal from "../../../../common/components/CModal";
import CSuspense from "../../../../common/components/CSuspense";
import { SalesFilters } from "./SalesFilters";
import { CPagination } from "../../../../common/components/CPagination";
import CopySalesGridContent from "../content/CopySalesGridContent";
//import data from "../data/data.json";
import { CLoader } from "../../../../common/components/CLoader";
import classnames from "classnames";

let contextType = null;
let userDetailsParam = {
  userid: "",
  role: "",
};

export default class UserEdit extends Component {
  constructor(props) {
    super(props);
    userDetailsParam = {
      userid: props.location.state.cn_userid,
      role: "MFPSALES",
    };
  }

  componentDidMount() {
    contextType.setLoader(true);
    contextType.setUserDetail({
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
    });
    const params = {
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
      showProperties: true,
      showAccounts: true,
      showManaged: true,
      optSel: "P",
      alphaOrderProp: "",
      filterByMorF: "F",
      alphaOrderAcct: "",
      accountpricingtype: "",
      accountsegment: "",
      strCurrPagePropSel: JSON.stringify({
        page: contextType.selectPnumber,
        maxpagelen: 200,
      }),
      strCurrPageProp: JSON.stringify({
        page: contextType.pNumber,
        maxpagelen: 200,
      }),
      strCurrPageAcctSel: JSON.stringify({
        page: contextType.selectPnumber,
        maxpagelen: 200,
      }),
      strCurrPageAcct: JSON.stringify({
        page: contextType.pNumber,
        maxpagelen: 200,
      }),
      totPropSelPageLen: 1,
    };

    APIEdit.populateAccountList(params).then((data) => {
      contextType.setAccountData(data, "");
      contextType.setLoader(false);
    });
    localStorage.removeItem("selectAccountPageNum");
    document.addEventListener("keydown", this.onEnterButton);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onEnterButton);
  }

  onEnterButton(event) {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id == "up-su-unselect-all") {
        contextType.accountUnSelectAll();
      } else if (focusedElem.id && focusedElem.id.includes("up-su-rtnbtn")) {
        contextType.returnToMain();
      } else if (focusedElem.id && focusedElem.id == "up-su-updatebtn") {
        contextType.accountUpdate();
      }
    }
  }

  handlePaginationAPI(pageNumber: number) {
    contextType.setPNumber(pageNumber);
    contextType.setAccountSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(
      "availAccount",
      pageNumber,
      contextType.selectPnumber
    );
    const accountlistAllScrollContainerScroll = document.getElementById(
      "accountlistAllScrollContainer"
    );
    if (accountlistAllScrollContainerScroll) {
      accountlistAllScrollContainerScroll.scrollTop = 0;
    }
  }

  handlePaginationAPIAcctProp(pageNumber: number) {
    contextType.setSelectPnumber(pageNumber);
    contextType.setAccountSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(
      "selectAccount",
      contextType.selectPnumber,
      pageNumber
    );
    const accountlistScrollContainerScroll = document.getElementById(
      "accountlistScrollContainer"
    );
    if (accountlistScrollContainerScroll) {
      accountlistScrollContainerScroll.scrollTop = 0;
    }
  }

  render() {
    return (
      <UserEditSalesContextProvider>
        <UserEditSalesContext.Consumer>
          {(UserEditSalesContextValue) => {
            contextType = UserEditSalesContextValue;
            return (
              <React.Fragment>
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{ position: "absolute", top: "55%", left: "45%" }}
                    src={screenLoader}
                  />
                ) : (
                  <form>
                    <CModal
                      title={Settings.labels.userList}
                      onClose={(e) => {
                        contextType.copyUser_onclick(true);
                      }}
                      show={contextType.showCopyPage}
                      xPosition={-231}
                      yPosition={-285}
                    >
                      <Suspense fallback={<CSuspense />}>
                        <CopySalesGridContent data={userDetailsParam} />
                      </Suspense>
                    </CModal>
                    <table
                      className={`${styles.menuWdth100_Height} ${styles.overflowValue} ${styles.userEditContainer}`}
                    >
                      <tbody>
                        <tr>
                          <td className={styles.heightTwenty}>
                            <label className={styles.labelText}>
                              {contextType.state.user.cn_firstname}
                            </label>
                            <label className={styles.labelText}>
                              <>&nbsp;</>
                              {contextType.state.user.cn_lastname}
                              <>&nbsp;</>
                            </label>
                            <label className={styles.labelText}>
                              {`(${contextType.state.user.eid})`}
                            </label>
                          </td>
                        </tr>
                        <tr
                          className={`${styles.BGDarkBlueStyle} ${styles.top} ${styles.block}`}
                        >
                          <td height={2} className={styles.heightTop}></td>
                        </tr>
                        <tr>
                          <td
                            className={`${styles.WidthCls} ${styles.paddingCls}`}
                          >
                            <a href="javascript:void(0);">
                              <img
                                src={btnCopy}
                                className={classnames(
                                  styles.borderZero,
                                  styles.cursorDefault
                                )}
                                onClick={(e) => contextType.copyUser_onclick(e)}
                              />
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <td
                            height={2}
                            className={`${styles.labelText} ${styles.paddingCls} ${styles.heightTop} ${styles.accountPadding} ${styles.pb5}`}
                          >
                            {Settings.labels.account}
                          </td>
                        </tr>
                        <tr
                          className={`${styles.BGDarkBlueStyle} ${styles.top} ${styles.block}`}
                        >
                          <td height={2} className={styles.heightTop}></td>
                        </tr>
                        <tr className={styles.block}>
                          <td className={styles.padRight}>
                            <>&nbsp;</>
                          </td>
                          <td>
                            <SalesFilters></SalesFilters>
                          </td>
                        </tr>
                        <tr className={`${styles.block} ${styles.pt3}`}>
                          <td className={styles.rightLeftPaddingTop}>
                            <CPagination
                              totalPages={contextType.selTotalPages}
                              context={contextType}
                              handlePaginationAPI={
                                this.handlePaginationAPIAcctProp
                              }
                              fontBold={"bold"}
                              resetInput={contextType.resetInput}
                              noResetOnSearch={true}
                            />
                          </td>
                          {contextType.showErrorPage == false ? (
                            <td>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <CPagination
                                        totalPages={contextType.totalPages}
                                        context={contextType}
                                        handlePaginationAPI={
                                          this.handlePaginationAPI
                                        }
                                        pageType={contextType.searchClick}
                                        resetInput={contextType.resetInput}
                                        fontBold={"bold"}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          ) : (
                            <td>{""}</td>
                          )}
                        </tr>

                        <tr className={`${styles.top} ${styles.block}`}>
                          <td>
                            <table
                              className={`${styles.menuWdth100_Height} ${styles.selectProp}`}
                            >
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
                                                <b>
                                                  {
                                                    Settings.labels
                                                      .selectAccount
                                                  }
                                                </b>
                                              </th>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                      <div
                                        id="accountlistScrollContainer"
                                        className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                      >
                                        {(contextType.state.userArray
                                          .accountlist &&
                                          contextType.state.userArray
                                            .accountlist.length) <= 0 ? (
                                          <div className={styles.gridRow}>
                                            <table
                                              className={styles.gridRowTable}
                                              id="gridTableView"
                                            >
                                              <tbody>
                                                <tr>
                                                  <td className={styles.middle}>
                                                    {
                                                      Settings.labels
                                                        .noDataFound
                                                    }
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        ) : (
                                          <div>
                                            {contextType.state.accountlist &&
                                            contextType.state.userArray
                                              .accountlist <= 0 ? (
                                              <div className={styles.gridRow}>
                                                <table
                                                  className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                  id="gridTableView"
                                                >
                                                  <tbody>
                                                    <tr>
                                                      <td
                                                        className={
                                                          styles.middle
                                                        }
                                                      >
                                                        {
                                                          Settings.labels
                                                            .allAccountsSelected
                                                        }
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </div>
                                            ) : (
                                              <div>
                                                {contextType.state.userArray.accountlist.map(
                                                  (data) => {
                                                    return (
                                                      <ListView
                                                        data={data}
                                                        handleChange={
                                                          contextType.handleChangeInput
                                                        }
                                                        type="selectAcct"
                                                      />
                                                    );
                                                  }
                                                )}
                                              </div>
                                            )}
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </td>
                          {contextType.showErrorPage == false ? (
                            <td>
                              <table
                                className={`${styles.menuWdth100_Height} ${styles.selectProp}`}
                              >
                                <tbody>
                                  <tr className={styles.selectPropTr}>
                                    <td className={styles.widthTen}></td>
                                    <td className={styles.height100Top}>
                                      <div
                                        className={`${styles.gridNode} ${styles.gridMargin}`}
                                      >
                                        <div className={styles.gridHeader}>
                                          <table
                                            className={`${styles.gridOne} ${styles.zero_Height}`}
                                          >
                                            <tbody>
                                              <tr>
                                                <th
                                                  className={styles.HeaderCls}
                                                >
                                                  <b>
                                                    {
                                                      Settings.labels
                                                        .availAccount
                                                    }
                                                  </b>
                                                </th>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </div>
                                        <div
                                          id="accountlistAllScrollContainer"
                                          className={`${styles.gridViewHS} ${styles.scrollDiv}`}
                                        >
                                          {contextType.state.userArray
                                            .accountlistAll.length <= 0 ? (
                                            <div className={styles.gridRow}>
                                              <table
                                                className={styles.gridRowTable}
                                                id="gridTableView"
                                              >
                                                <tbody>
                                                  <tr>
                                                    <td
                                                      className={styles.middle}
                                                    >
                                                      {
                                                        Settings.labels
                                                          .noDataFound
                                                      }
                                                    </td>
                                                  </tr>
                                                </tbody>
                                              </table>
                                            </div>
                                          ) : (
                                            <div>
                                              {contextType.state.userArray
                                                .accountlistAll <= 0 ? (
                                                <div className={styles.gridRow}>
                                                  <table
                                                    className={`${styles.gridRowTable} ${styles.zero_Height} ${styles.selectPropTr}`}
                                                    id="gridTableView"
                                                  >
                                                    <tbody>
                                                      <tr>
                                                        <td
                                                          className={
                                                            styles.middle
                                                          }
                                                        >
                                                          {
                                                            Settings.labels
                                                              .allAccountsSelected
                                                          }
                                                        </td>
                                                      </tr>
                                                    </tbody>
                                                  </table>
                                                </div>
                                              ) : (
                                                <div>
                                                  {contextType.state.userArray.accountlistAll.map(
                                                    (data) => {
                                                      return (
                                                        <ListView
                                                          data={data}
                                                          handleChange={
                                                            contextType.handleChangeInput
                                                          }
                                                          type="availAcct"
                                                        />
                                                      );
                                                    }
                                                  )}
                                                </div>
                                              )}
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          ) : (
                            <Error />
                          )}
                        </tr>

                        <tr className={styles.block}>
                          <td className={styles.rightLeftPaddingBottom}>
                            <table>
                              <tr className={styles.alignMiddle}>
                                {contextType.state.userArray.accountlist
                                  .length > 0 ? (
                                  <td>
                                    <a href="javascript:void(0);">
                                      <img
                                        src={btnDelete}
                                        className={classnames(
                                          styles.borderZero,
                                          styles.cursorDefault
                                        )}
                                        onClick={(e) =>
                                          contextType.accountDelete(e)
                                        }
                                      />
                                    </a>
                                  </td>
                                ) : (
                                  <td>
                                    <>&nbsp;</>
                                  </td>
                                )}
                                <td className={styles.pl4}>
                                  <b>
                                    <label>
                                      {Settings.labels.totalAccounts}
                                    </label>
                                  </b>
                                </td>
                                <td>
                                  <b>
                                    <label>
                                      {contextType.state.user.acctcount}
                                    </label>
                                  </b>
                                </td>
                                <td>
                                  <>&nbsp;</>
                                </td>
                                <td>
                                  <>&nbsp;</>
                                </td>
                                <td>
                                  <>&nbsp;</>
                                </td>
                              </tr>
                            </table>
                          </td>
                          {contextType.showErrorPage == false ? (
                            <td>
                              <table>
                                <tr>
                                  <td>
                                    <a>
                                      <img
                                        id="up-su-unselect-all"
                                        tabIndex={0}
                                        src={btnUnSelectAll}
                                        className={`${styles.borderZero} ${styles.cursorPointer}`}
                                        onClick={(e) =>
                                          contextType.accountUnSelectAll(e)
                                        }
                                        alt={Settings.labels.unselectAllAcct}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <a>
                                      <img
                                        id="up-su-updatebtn"
                                        tabIndex={0}
                                        src={btnUpdate}
                                        className={`${styles.borderZero} ${styles.cursorPointer}`}
                                        onClick={(e) =>
                                          contextType.accountUpdate(e)
                                        }
                                        alt={Settings.labels.hotellistAlt}
                                      />
                                    </a>
                                  </td>
                                  <td>
                                    <a>
                                      <img
                                        id="up-su-rtnbtn"
                                        tabIndex={0}
                                        src={btnReturnUserList}
                                        className={`${styles.borderZero} ${styles.cursorPointer}`}
                                        onClick={(e) =>
                                          contextType.returnToMain(e)
                                        }
                                        alt={Settings.labels.returnUserList}
                                      />
                                    </a>
                                  </td>
                                </tr>
                              </table>
                            </td>
                          ) : (
                            <td>{""}</td>
                          )}
                        </tr>
                        <tr>
                          <td>
                            <input
                              id={contextType.state.user.acctcount}
                              name={contextType.state.user.acctcount}
                              type={Settings.inputType.hidden}
                              value={contextType.state.user.acctcount}
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    {!contextType.isLoaded && <CLoader></CLoader>}
                  </form>
                )}
                <style>{`                    
                    img {
                      cursor: default;
                    }
                    `}</style>
              </React.Fragment>
            );
          }}
        </UserEditSalesContext.Consumer>
      </UserEditSalesContextProvider>
    );
  }
}
