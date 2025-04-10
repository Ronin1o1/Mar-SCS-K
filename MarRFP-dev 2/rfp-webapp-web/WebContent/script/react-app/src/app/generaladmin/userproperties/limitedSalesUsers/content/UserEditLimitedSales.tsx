/* eslint-disable react/jsx-key */
import React, { Component } from "react";
import UserEditLimitedSalesContext, {
  UserEditLimitedSalesContextProvider,
} from "../context/UserEditLimitedSalesContext";
import styles from "../content/UserEditLimitedSales.css";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import btnUpdate from "../../../../common/assets/img/button/btnUpdate.gif";
import btnDelete from "../../../../common/assets/img/button/btnDelete.gif";
import btnReturnUserList from "../../../../common/assets/img/button/btnReturnUserList.gif";
import btnUnSelectAll from "../../../../common/assets/img/button/btnUnSelectAll.gif";
import Settings from "../static/Settings";
import APIEditLimitedSalesAccount from "../service/APIEditLimitedSalesAccount";
import { ListView } from "../../shared/listView";
import { SalesFilters } from "./LimitedSalesFilters";
import { CPagination } from "../../../../common/components/CPagination";
import UserEditProperty from "./UserEditProperty";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;
let userDetailsParam = {
  userid: "",
  role: "",
};
export default class UserEditLimitedSales extends Component {
  constructor(props) {
    super(props);
    userDetailsParam = {
      userid: props.location.state.cn_userid,
      role: "MFPFSALE",
    };
  }

  componentDidMount() {
    contextType.setLoader(true);
    contextType.setUserDetail({
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
    });

    this.handleAccountPaging(1);
    document.addEventListener("keydown", this.onEnterButtonAcc);
  }

  componentWillUnmount(): void {
    document.removeEventListener("keydown", this.onEnterButtonAcc);
  }

  onEnterButtonAcc(event) {
    if (event.keyCode == 13) {
      const focusedElem = document.activeElement;
      if (focusedElem.id && focusedElem.id == "up-lsu-unselect-all-acc") {
        contextType.accountUnSelectAll();
      } else if (
        focusedElem.id &&
        focusedElem.id.includes("up-lsu-rtnbtn-acc")
      ) {
        contextType.returnToMain();
      } else if (focusedElem.id && focusedElem.id == "up-lsu-updatebtn-acc") {
        contextType.accountUpdate();
      }
    }
  }

  handleAccountPaging = (pageNumber: number) => {
    const params = {
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
      showProperties: true,
      showAccounts: true,
      showManaged: true,
      optSel: "P",
      alphaOrderProp: "",
      filterByMorF: "O",
      alphaOrderAcct: "",
      accountpricingtype: "",
      accountsegment: "",
      strCurrPagePropSel: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageProp: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageAcctSel: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageAcct: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      totPropSelPageLen: 1,
    };

    APIEditLimitedSalesAccount.populateAccountList(params).then((data) => {
      contextType.setAccountData(data);
      contextType.setLoader(false);
      contextType.setIsParentAPICalled(true)
    });
  };

  handleNextAccount = (pageNumber: number) => {
    const params = {
      userid: userDetailsParam.userid,
      role: userDetailsParam.role,
      showProperties: true,
      showAccounts: true,
      showManaged: true,
      optSel: "P",
      alphaOrderProp: "",
      filterByMorF: "O",
      alphaOrderAcct: "",
      accountpricingtype: "",
      accountsegment: "",
      strCurrPagePropSel: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageProp: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageAcctSel: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      strCurrPageAcct: JSON.stringify({ page: pageNumber, maxpagelen: 200 }),
      totPropSelPageLen: 1,
    };

    APIEditLimitedSalesAccount.populateAccountList(params).then((data) => {
      contextType.setAccountList(data);
      contextType.setLoader(false);
    });
  };

  handlePaginationAPI(pageNumber: number) {
    contextType.setPNumber(pageNumber);
    contextType.setAccountSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    contextType.onClickSearch(pageNumber);
    const scrollContailer = document.getElementById(
      "accountlistAllScrollContainer"
    );
    if (scrollContailer) {
      scrollContailer.scrollTop = 0;
    }
  }

  handlePaginationAPIAcctProp = (pageNumber: number) => {
    contextType.setPNumber(pageNumber);
    contextType.setAccountSearchCriteria({
      ...contextType.searchCriteria,
      strCurrPageProp: {
        page: pageNumber,
      },
    });
    const scrollContailer = document.getElementById(
      "accountlistScrollContainer"
    );
    if (scrollContailer) {
      scrollContailer.scrollTop = 0;
    }
    this.handleNextAccount(pageNumber);
  };

  refreshScroll = (id: string) => {
    const scrollContailer = document.getElementById(id);
    if (scrollContailer) {
      scrollContailer.scrollTop = 0;
    }
  };

  render() {
    return (
      <UserEditLimitedSalesContextProvider>
        <UserEditLimitedSalesContext.Consumer>
          {(UserEditLimitedSalesContextValue) => {
            contextType = UserEditLimitedSalesContextValue;
            return (
              <React.Fragment>
                {contextType.state.showScreenLoader ? (
                  <img
                    style={{ position: "absolute", top: "55%", left: "45%" }}
                    src={screenLoader}
                  />
                ) : (
                  <form>
                    {contextType.isParentAPICalled && <UserEditProperty {...this.props} />}
                    <table
                      className={`${styles.menuWdth100_Height} ${styles.userEditContainer} ${styles.accountHeaderSpace}`}
                    >
                      <tbody>
                        <tr>
                          <td
                            height={2}
                            className={`${styles.labelText} ${styles.paddingCls} ${styles.heightTop}`}
                          >
                            {Settings.labels.account}
                          </td>
                        </tr>
                        <tr className={styles.rowBorder}>
                          <td height={2} className={styles.heightTop}></td>
                        </tr>
                        <tr>
                          <td className={styles.padRight}>
                            <>&nbsp;</>
                          </td>
                          <td>
                            <div className={styles.salesFilterAllign}>
                              <SalesFilters></SalesFilters>
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <>&nbsp;</>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <div className={styles.accountPagnateOne}>
                              <CPagination
                                totalPages={
                                  contextType.state.userArray?.accTotalPage
                                }
                                context={contextType}
                                handlePaginationAPI={
                                  this.handlePaginationAPIAcctProp
                                }
                              />
                            </div>
                          </td>
                          <td>
                            <div className={styles.accountPagnateTwo}>
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
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                        <tr className={styles.top}>
                          <td>
                            <table
                              className={`${styles.menuWdth100_Height} ${styles.selectProp}`}
                            >
                              <tbody>
                                <tr className={styles.selectPropTr}>
                                  <td className={styles.height100Top}>
                                    <div className={`${styles.gridNode}`}>
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
                                        {(contextType?.state?.userArray
                                          ?.accountlist &&
                                          contextType?.state?.userArray
                                            ?.accountlist?.length) <= 0 ? (
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
                          <td>
                            <div className={styles.availAccSpace}>
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
                                          {contextType?.state?.userArray
                                            ?.accountlistAll?.length <= 0 ? (
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
                            </div>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <table className={styles.savingBtnAllign}>
                              <tr>
                                {contextType?.state?.userArray?.accountlistAll
                                  ?.length > 0 ? (
                                  <td className={styles.delbtn}>
                                    <a href="javascript:void(0);">
                                      <img
                                        src={btnDelete}
                                        className={styles.borderZero}
                                        onClick={(e) =>
                                          contextType.accountDelete(e)
                                        }
                                      />
                                    </a>
                                  </td>
                                ) : (
                                  <td className={styles.delbtn}>
                                    <>&nbsp;</>
                                  </td>
                                )}
                                <td className={styles.acciuntcount}>
                                  <b>
                                    <label>
                                      {Settings.labels.totalAccounts}
                                    </label>
                                  </b>
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
                          <td>
                            <table className={styles.availAccBtnAllign}>
                              <tr>
                                <td>
                                  <a>
                                    <img
                                      id="up-lsu-unselect-all-acc"
                                      tabIndex={0}
                                      src={btnUnSelectAll}
                                      className={styles.borderZero}
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
                                      id="up-lsu-updatebtn-acc"
                                      tabIndex={0}
                                      src={btnUpdate}
                                      className={styles.borderZero}
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
                                      id="up-lsu-rtnbtn-acc"
                                      tabIndex={0}
                                      src={btnReturnUserList}
                                      className={styles.borderZero}
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
              </React.Fragment>
            );
          }}
        </UserEditLimitedSalesContext.Consumer>
      </UserEditLimitedSalesContextProvider>
    );
  }
}
