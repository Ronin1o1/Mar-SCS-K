import React, { Component, Suspense } from "react";
import SaveBtnImg from "../../../../common/assets/img/button/btnSave.gif";
import LockAllBtnImg from "../../../../common/assets/img/button/btnLockAll.gif";
import AerImg from "../../../../common/assets/img/aer.gif";
import AerLevel1Img from "../../../../common/assets/img/aerlevel1.gif";

import AccountStatusListContext, {
  AccountStatusListContextProvider,
} from "../context/AccountStatusListContext";

import Settings from "../static/Settings";
import Interceptors from "../../../../common/components/Interceptors";
import CSuspense from "../../../../common/components/CSuspense";

import styles from "./AccountStatusList.css";
import AccountStatusFilter from "./AccountStatusFilter";
import { CPagination } from "../../../../common/components/CPagination";
import API from "../service/API";
import CDataTable from "../../../../common/components/CDataTable";
import AccountStatusChange from "./AccountStatusChange";
import CModal from "../../../../common/components/CModal";

import { Column } from "primereact/column";
import { ColumnGroup } from "primereact/columngroup";
import { Row } from "primereact/row";
import { CLoader } from "../../../../common/components/CLoader";

let contextType = null;

export default class AccountStatusList extends Component {
  state = { isMakingRequest: false, isLoadingStatus: false };
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    const location = this.props.history.location;
    const prevLocation = prevProps.location;
    if (
      prevLocation?.key != location?.key &&
      prevLocation?.pathname == location?.pathname
    ) {
      this.props.history.push("/temp");
      this.props.history.goBack();
    }
  }

  componentDidMount() {
    this.setState({ ...this.state, isLoadingStatus: true });
    API.getListOfAccountStatus().then((data) => {
      //
      contextType.setAccountStatusListData(data);
      this.setState({ ...this.state, isLoadingStatus: false });
    });
  }

  componentWillUnmount() {
    contextType.saveAccountStatusLists();
    localStorage.removeItem("Period");
    localStorage.removeItem("accountpricingtype");
    localStorage.removeItem("accountstatus");
    localStorage.removeItem("accountsegment");
    localStorage.removeItem("orderby");
    localStorage.removeItem("showPortfolio");
    localStorage.removeItem("showPortfolioType");
    localStorage.removeItem("pasManager");
    localStorage.removeItem("accountStatusList");
    localStorage.removeItem("totalPages");
    localStorage.removeItem("startsWith");
    localStorage.removeItem("setLocalStorage");
  }

  handlePaginationAPI = (pageNumber: number) => {
    this.setState({ isMakingRequest: true });
    contextType.setState({
      ...contextType.state,
      searchTerms: {
        ...contextType.state.searchTerms,
        page: pageNumber,
      },
    });
    contextType.saveAccountStatusLists().then((res) => {
      this.setState({ isMakingRequest: false });
      contextType.handleSearch(pageNumber);
    });
  };

  handleSave = () => {
    //if any changes to grid
    if (
      contextType.state.accountStatusListData.accountStatusUpdate.length > 0
    ) {
      this.setState({ isMakingRequest: true });
      contextType.saveAccountStatusLists().then((res) => {
        this.setState({ isMakingRequest: false });
        if (res == "success") {
          contextType.searchAccountStatusLists(
            contextType.state.accountStatusListData.searchTerms.strPage.page
          );
          const highLightRow = document.getElementsByClassName("p-highlight");
          if (highLightRow && highLightRow[0]) {
            highLightRow[0]?.classList?.remove("p-highlight");
          }
        }
      });
    }
  };

  starAccountNameBodyTemplate = (rowData) => {
    const aerImage = rowData.maxAer == "Y" ? AerLevel1Img : AerImg;
    return (
      <span id={rowData.accountrecid}>
        {rowData.accountname}
        <>&nbsp;</>
        <img
          src={aerImage}
          style={{
            visibility: rowData.aer_account == "Y" ? "visible" : "hidden",
          }}
        />
      </span>
    );
  };

  linkBodyTemplate = (rowData) => {
    return (
      <span
        id={rowData.accountrecid}
        className={styles.titleLink}
        onClick={() => {
          contextType.showModal(rowData.accountrecid);
        }}
      >
        {rowData.acctStatusName}
      </span>
    );
  };

  lockedCheckboxBodyTemplate = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <input
          type="checkbox"
          id={rowData.accountrecid}
          onChange={contextType.onChangeLocked}
          checked={rowData.locked == "Y" ? true : false}
        />
      </div>
    );
  };

  lockedDateBodyTemplate = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <span id={rowData.accountrecid}>{rowData.lockDate}</span>
      </div>
    );
  };

  nonGPPCheckboxBodyTemplate = (rowData) => {
    return (
      <div
        style={{
          visibility: rowData.aer_account == "Y" ? "visible" : "hidden",
          textAlign: "center",
        }}
      >
        <input
          type="checkbox"
          id={rowData.accountrecid}
          onChange={contextType.onChangeGPP}
          checked={rowData.process_aer == "Y" ? true : false}
        />
      </div>
    );
  };

  accountNotesBodyTemplate = (rowData) => {
    return (
      <textarea
        id={rowData.accountrecid}
        className={styles.textarea}
        onChange={contextType.onChangeAccountNotes}
        onKeyPress={(e) => contextType.onKeyPressAccountNotes(e, 250)}
        value={rowData.status_text == null ? "" : rowData.status_text}
      />
    );
  };

  internalpasnotesBodyTemplate = (rowData) => {
    return (
      <textarea
        id={rowData.accountrecid}
        className={styles.textarea}
        onChange={contextType.onChangeInternalPasNotes}
        onKeyPress={(e) => contextType.onKeyPressInternalPasNotes(e, 250)}
        value={rowData.internalpasnotes == null ? "" : rowData.internalpasnotes}
      />
    );
  };

  portfolioBodyTemplate = (rowData) => {
    return (
      <span id={rowData.accountrecid} style={{ textAlign: "center" }}>
        {rowData.portfolio == "Y" ? "Y" : "N"}
      </span>
    );
  };

  render() {
    const { isMakingRequest } = this.state;

    return (
      <AccountStatusListContextProvider>
        <AccountStatusListContext.Consumer>
          {(accountStatusListContext) => {
            contextType = accountStatusListContext;

            const columns = [
              {
                field: Settings.accountStatusList.tableColumns.account.field,
                header: Settings.accountStatusList.tableColumns.account.header,
                body: this.starAccountNameBodyTemplate,
                style: {
                  width: "200px",
                  minWidth: "200px",
                  fontSize: "11px",
                },
              },
              {
                field: Settings.accountStatusList.tableColumns.Portfolio.field,
                header:
                  Settings.accountStatusList.tableColumns.Portfolio.header,
                body: this.portfolioBodyTemplate,
                style:
                  contextType.state.showPortfolioColumn === true
                    ? contextType?.appContext?.user?.isLimitedSalesUser ||
                      contextType?.appContext?.user?.isSalesUser
                      ? { display: "none" }
                      : { width: "70px", textAlign: "center" }
                    : { display: "none" },
              },
              {
                field:
                  Settings.accountStatusList.tableColumns.NonPreferredGPP.field,
                header:
                  Settings.accountStatusList.tableColumns.NonPreferredGPP
                    .header,
                body: this.nonGPPCheckboxBodyTemplate,
                style:
                  contextType?.appContext?.user?.isLimitedSalesUser ||
                    contextType?.appContext?.user?.isSalesUser
                    ? { display: "none" }
                    : { width: "85px", minWidth: "85px", textAlign: "left" },
              },
              ,
              {
                field: Settings.accountStatusList.tableColumns.locked.field,
                header: Settings.accountStatusList.tableColumns.locked.header,
                body: this.lockedCheckboxBodyTemplate,

                style:
                  contextType?.appContext?.user?.isLimitedSalesUser ||
                    contextType?.appContext?.user?.isSalesUser
                    ? { display: "none" }
                    : { width: "70px", minWidth: "70px", textAlign: "left" },
              },
              {
                field: Settings.accountStatusList.tableColumns.lockedDate.field,
                header:
                  Settings.accountStatusList.tableColumns.lockedDate.header,
                body: this.lockedDateBodyTemplate,
                style:
                  contextType?.appContext?.user?.isLimitedSalesUser ||
                    contextType?.appContext?.user?.isSalesUser
                    ? { display: "none" }
                    : { width: "75px", minWidth: "75px", textAlign: "left" },
              },
              {
                field: Settings.accountStatusList.tableColumns.status.field,
                header: Settings.accountStatusList.tableColumns.status.header,
                body: this.linkBodyTemplate,
                style:
                  contextType?.appContext?.user?.isLimitedSalesUser ||
                    contextType?.appContext?.user?.isSalesUser
                    ? { display: "none" }
                    : { width: "115px", minWidth: "115px", fontSize: "11px" },
              },
              {
                field:
                  Settings.accountStatusList.tableColumns.accountNotes.field,
                header:
                  Settings.accountStatusList.tableColumns.accountNotes.header,
                body: this.accountNotesBodyTemplate,
                style: { width: "300px" },
              },
              {
                field:
                  Settings.accountStatusList.tableColumns.internalPasNotes
                    .field,
                header:
                  Settings.accountStatusList.tableColumns.internalPasNotes
                    .header,
                body: this.internalpasnotesBodyTemplate,
                style:
                  contextType?.appContext?.user?.isLimitedSalesUser ||
                    contextType?.appContext?.user?.isSalesUser
                    ? {
                      display: "none",
                    }
                    : {
                      display: "block",
                    },
              },
            ];

            const headerGroup = (
              <ColumnGroup>
                <Row>
                  <Column
                    header="Account Name"
                    rowSpan={2}
                    style={{ width: "200px" }}
                    field="accountname"
                  />
                  <Column
                    header={contextType.currentYear}
                    style={{ textAlign: "center" }}
                    colSpan={6}
                  />
                </Row>
                <Row>
                  <Column
                    header="Portfolio"
                    field="portfolio"
                    style={
                      contextType.state.showPortfolioColumn == true
                        ? contextType?.appContext?.user?.isLimitedSalesUser ||
                          contextType?.appContext?.user?.isSalesUser
                          ? { display: "none" }
                          : { width: "70px", textAlign: "center" }
                        : { display: "none" }
                    }
                  />
                  <Column
                    header="Non-Preferred GPP"
                    style={
                      contextType?.appContext?.user?.isLimitedSalesUser ||
                        contextType?.appContext?.user?.isSalesUser
                        ? { display: "none" }
                        : { width: "85px" }
                    }
                    field="process_aer"
                  />
                  <Column
                    header="Locked"
                    style={
                      contextType?.appContext?.user?.isLimitedSalesUser ||
                        contextType?.appContext?.user?.isSalesUser
                        ? { display: "none" }
                        : { width: "70px" }
                    }
                    field="locked"
                  />
                  <Column
                    header="Locked Date"
                    style={
                      contextType?.appContext?.user?.isLimitedSalesUser ||
                        contextType?.appContext?.user?.isSalesUser
                        ? { display: "none" }
                        : { width: "70px" }
                    }
                    field="lockDate"
                  />
                  <Column
                    header="Status"
                    style={
                      contextType?.appContext?.user?.isLimitedSalesUser ||
                        contextType?.appContext?.user?.isSalesUser
                        ? { display: "none" }
                        : { width: "115px" }
                    }
                    field="acctStatusName"
                  />
                  <Column
                    header="Account Notes"
                    style={{ width: "300px" }}
                    field="status_text"
                  />
                  <Column
                    header="Internal PAS notes"
                    style={
                      contextType?.appContext?.user?.isLimitedSalesUser ||
                        contextType?.appContext?.user?.isSalesUser
                        ? { display: "none" }
                        : { display: "revert", verticalAlign: "middle" }
                    }
                    field="internalpasnotes"
                  />
                </Row>
              </ColumnGroup>
            );
            return (
              <React.Fragment>
                <div>
                  <Suspense fallback={<CSuspense />}>
                    <Interceptors spinnerFlag={true} />
                    {this.state.isLoadingStatus ? (
                      <div className={styles.loaderImg}>
                        <CLoader />
                      </div>
                    ) : (
                      <table className={styles.accountStatusTable}>
                        <tbody>
                          <tr>
                            <td>
                              <table
                                className={styles.accountStatusTableHeader}
                              >
                                <tbody>
                                  <tr>
                                    <td className={styles.header}>
                                      {Settings.accountStatusList.pageTitle}
                                    </td>
                                  </tr>
                                  <tr className={styles.BGDarkBlueStyle}>
                                    <td></td>
                                  </tr>
                                  <tr>
                                    <td></td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>
                          <tr className={styles.topAlign}>
                            <td />
                          </tr>
                          <tr>
                            <td className={styles.topAlign}>
                              <AccountStatusFilter />
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <table>
                                <tbody>
                                  <tr>
                                    <td>
                                      <div
                                        className={styles.paginationLeftAlign}
                                      >
                                        <CPagination
                                          totalPages={
                                            localStorage.getItem(
                                              "totalPages"
                                            ) != null
                                              ? localStorage.getItem(
                                                "totalPages"
                                              )
                                              : contextType.state
                                                .accountStatusListData
                                                .totalPages
                                          }
                                          context={contextType}
                                          handlePaginationAPI={
                                            this.handlePaginationAPI
                                          }
                                          className={styles.paginator}
                                        />
                                      </div>
                                    </td>
                                    <td className={styles.saveBtnTD}>
                                      <div>
                                        <img
                                          tabIndex={0}
                                          onClick={this.handleSave}
                                          src={SaveBtnImg}
                                          className={styles.saveBtn}
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <>&nbsp;</>
                                    </td>

                                    <td>
                                      <img
                                        tabIndex={0}
                                        onClick={
                                          contextType.lockAllAccountStatusLists
                                        }
                                        src={LockAllBtnImg}
                                        className={styles.lockAllBtn}
                                        style={
                                          contextType?.appContext?.user
                                            ?.isLimitedSalesUser ||
                                            contextType?.appContext?.user
                                              ?.isSalesUser
                                            ? { display: "none" }
                                            : { display: "block" }
                                        }
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </td>
                          </tr>

                          <tr className={styles.topAlign}>
                            <td />
                          </tr>
                          <tr className={styles.topAlign}>
                            <td>
                              {(contextType.state.isMakingRequest ||
                                isMakingRequest) && (
                                  <div className={styles.loaderImg}>
                                    <CLoader />
                                  </div>
                                )}
                              <div>
                                {
                                  <div className={styles.full_heightLeft}>
                                    <CDataTable
                                      id="gridTableView"
                                      columns={columns}
                                      value={
                                        contextType.state.accountStatusListData
                                          .accountStatusList
                                      }
                                      marginLeft="0px"
                                      scrollHeight="calc(100vh - 285px)"
                                      width={
                                        contextType?.appContext?.user
                                          ?.isLimitedSalesUser ||
                                          contextType?.appContext?.user
                                            ?.isSalesUser
                                          ? "500px"
                                          : "1191px"
                                      }
                                      header={headerGroup}
                                      emptyMessage=" "
                                      dataKey={
                                        Settings.accountStatusList.tableColumns
                                          .account.field
                                      }
                                      selectionMode="single"
                                    />
                                  </div>
                                }
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )}

                    <div className={styles.accountStatusChangePopup}>
                      <CModal
                        title={Settings.accountStatusChange.title}
                        class={"accountStatusPopUP"}
                        onClose={contextType.closeModal} //method
                        show={contextType.state.accountStatusListData.showModal} //property
                      >
                        <Suspense fallback={<CSuspense />}>
                          <AccountStatusChange />
                        </Suspense>
                      </CModal>
                    </div>
                  </Suspense>
                </div>
              </React.Fragment>
            );
          }}
        </AccountStatusListContext.Consumer>
        <style>{`
            .p-datatable .p-sortable-disabled {
              cursor: auto;
              border-top: 1px solid grey !important;
            }
            .p-datatable .p-datatable-tbody > tr.p-highlight {
              background: #b6d3f3 !important;
            }
            .accountStatusPopUP{
              position: Fixed;
            }
            .p-datatable .p-datatable-tbody > tr>td{
              
              padding: 0px !important;
            }
            .p-datatable-scrollable-body {
              overflow: hidden auto !important;
            }
            .p-datatable-scrollable-header-box{
              margin-right:0 !important;
            }
            .p-datatable-thead tr:first-child th{
              border-top:0 !important;
            }
            @media only screen and (max-width: 1200px){
              .page_body_container {
                  min-height: calc(100vh - 107px) !important;
              }
              .container{
                min-width:1200px;
              }
              .footerwidget{
                position:fixed;
              }
            }
        `}</style>
      </AccountStatusListContextProvider>
    );
  }
}
