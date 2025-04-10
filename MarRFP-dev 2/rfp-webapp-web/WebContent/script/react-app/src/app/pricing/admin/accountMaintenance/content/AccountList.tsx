import React, { Component, Suspense } from "react";
import AccountListContext from "../context/AccountListContext";
import { Link } from "react-router-dom";
import AccountFilter from "./AccountFilter";
import API from "../service/API";
import Settings from "../static/Settings";
import CDataTable from "../../../../common/components/CDataTable";
import styles from "./AccountList.css";
import NewBtnImg from "../../../../common/assets/img/button/btnNew.gif";
//import { CPagination } from "../../../../common/components/CPagination";
//import Interceptors from "../../../../common/components/Interceptors";
import CSuspense from "../../../../common/components/CSuspense";
import { CLoader } from "../../../../common/components/CLoader";
import screenLoader from "../../../../common/assets/img/screenloader.gif";
import { CPaginationAcct } from "../../../../common/components/CPaginationAcct";

let contextType = null;

export default class AccountList extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    sessionStorage.setItem("isCopyFromExistingAccount", "true");
    const searchedData = { ...contextType.state.searchTerms };
    const selectedAcc = {
      ...contextType.state.accountListData.selectedAccount,
    };
    (searchedData.searchperiod = null),
      (searchedData.r_1 = null),
      (searchedData.orderby = null),
      (searchedData.accountpricingtype = null),
      (searchedData.filterString = ""),
      (searchedData.accountsegment = null),
      (searchedData.strPage.page = 1),
      (searchedData.totalPages = null),
      (searchedData.period = null),
      (selectedAcc.searchperiod = null),
      (selectedAcc.r_1 = null),
      (selectedAcc.orderby = null),
      (selectedAcc.accountpricingtype = null),
      (selectedAcc.filterString = ""),
      (selectedAcc.accountsegment = null),
      (selectedAcc.strPage.page = 1),
      (selectedAcc.totalPages = null),
      (selectedAcc.period = null),
      (selectedAcc.duedate = null),
      (selectedAcc.groupmeetings = null),
      (selectedAcc.accountName = null),
      (selectedAcc.accountrecid = null),
      contextType.setState({
        ...contextType.state,
        searchTerms: searchedData,
        accountListData: {
          ...contextType.state.accountListData,
          selectedAccount: selectedAcc,
        },
        isStringSearch: false,
        isSearched: false,
        isShowAllAccounts: true,
      });
    contextType.setIsLoading(true);
    API.getAccountList().then((data) => {
      contextType.setAccountListData(data);
      contextType.setUserDetails();
      contextType.setIsLoading(false);
    });
  }

  handlePaginationAPI = (pageNumber: number) => {
    contextType.setState({
      ...contextType.state,
      searchTerms: {
        ...contextType.state.searchTerms,
        page: pageNumber,
      },
    });
    contextType.handleSearch(pageNumber);
  };

  linkBodyTemplate = (rowData) => {
    return (
      <Link
        to={`${Settings.accountList.accountEditPath}`}
        className={styles.accountNameLink}
        onClick={() => contextType.selectedAccountData(rowData)}
        data={contextType.state}
      >
        {rowData.accountname}
      </Link>
    );
  };

  columns = [
    {
      field: Settings.accountList.tableColumns.segment.field,
      header: Settings.accountList.tableColumns.segment.header,
      style: {
        width: "180px",
        minWidth: "180px",
      },
    },
    {
      field: Settings.accountList.tableColumns.account.field,
      header: Settings.accountList.tableColumns.account.header,
      body: this.linkBodyTemplate,
      style: {
        width: "300px",
        minWidth: "300px",
      },
    },
    {
      field: Settings.accountList.tableColumns.dueDate.field,
      header: Settings.accountList.tableColumns.dueDate.header,
      style: {
        width: "80px",
        minWidth: "80px",
      },
    },
    {
      field: Settings.accountList.tableColumns.accountViewable.field,
      header: Settings.accountList.tableColumns.accountViewable.header,
      style: {
        width: "98px",
        minWidth: "108px",
        textAlign: "center",
      },
    },
  ];

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          contextType = accountListContext;
          return contextType.isLoading ? (
            <CLoader></CLoader>
          ) : (
            <React.Fragment>
              <div className={styles.MainContainer}>
                <div className={styles.AccountListContainer}>
                  <Suspense fallback={<CSuspense />}>
                    {/* <Interceptors spinnerFlag={true} /> */}

                    <div>
                      <table className={styles.tableWidth}>
                        <tbody>
                          <tr>
                            <td className={styles.headerTitle}>
                              {Settings.accountList.pageTitle}
                            </td>
                          </tr>
                          <tr className={styles.bgDarkBlue}>
                            <td className={styles.tdHeight2}></td>
                          </tr>
                          <tr className={styles.tdHeight10}>
                            <td></td>
                          </tr>
                        </tbody>
                      </table>
                      <AccountFilter />
                    </div>
                    {contextType.state.isActiveSearch ? (
                      <div className={styles.curtain}>
                        <img
                          style={{
                            position: "absolute",
                            top: "40vh",
                            left: "45%",
                          }}
                          src={screenLoader}
                        />
                      </div>
                    ) : (
                      <div style={{ display: "flex", minWidth: "955px" }}>
                        {contextType.state.accountListData?.accountlist
                          ?.length === 0 ? (
                          <div className={styles.dataTableDiv}>
                            <CDataTable
                              id="gridTableView"
                              columns={this.columns}
                              value={
                                contextType.state.accountListData.accountlist
                              }
                              marginLeft="0px"
                              emptyMessage="No Data Found"
                              overflow-x="hidden"
                              width="670px"
                            />
                          </div>
                        ) : (
                          <div className={styles.dataTableDiv}>
                            <CDataTable
                              id="gridTableView"
                              columns={this.columns}
                              value={
                                contextType.state.accountListData.accountlist
                              }
                              marginLeft="0px"
                              overflow-x="hidden"
                              width="685px"
                            />
                          </div>
                        )}

                        <table>
                          <tr>
                            <td className={styles.paginatorTD}>
                              <CPaginationAcct
                                totalPages={contextType.state.totalPages}
                                handlePaginationAPI={this.handlePaginationAPI}
                                className={styles.paginator}
                                compName={"accountMaintenance"}
                                context={contextType}
                                pageNumber={contextType.pageNumber}
                                // width={355}
                              />
                              <Link
                                to={`${Settings.accountList.accountmaintCopyPath}`}
                              >
                                <img
                                  text-align="middle"
                                  alt="New Account"
                                  src={NewBtnImg}
                                  className={styles.newBtn}
                                />
                              </Link>
                            </td>
                          </tr>
                        </table>
                        <style>
                          {`
                          .p-datatable-scrollable-body{
                            height: calc(100vh - 244px);
                            overflow-x: hidden;
                          }
                          .p-datatable-thead tr th{
                            height:26.5px;                            
                            }
                          .p-datatable-thead tr th{
                            text-align: left !important;                         
                            }
                          .p-datatable-thead tr th:first-child{
                            border-left:0 !important;                           
                            }
                          .p-datatable table {
                            table-layout: auto !important;
                          }
                          @media only screen and (max-width: 1000px){
                            .p-datatable-scrollable-body{
                              height: calc(100vh - 260px);
                            }
                            .p-datatable-scrollable-body{
                              border-left:1px solid #c8c8c8;
                            }
                          }
                          `}
                        </style>
                      </div>
                    )}
                  </Suspense>
                </div>
              </div>
            </React.Fragment>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
