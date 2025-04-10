import React, { Component, Suspense } from "react";
import styles from "./Mcad.css";
import SearchAccount from "./content/SearchAccount";
import DeleteImg from "../../../../../../common/assets/img/delete.gif";
import McadlookupContext, {
  McadlookupContextProvider,
} from "./context/McadlookupContext";
import CSuspense from "../../../../../../common/components/CSuspense";
import McadAccountDetails from "./content/McadAccountDetails";
import CModal from "../../../../../../common/components/CModal";
import Settings from "./static/Settings";
import CDataTable from "../../../../../../common/components/CDataTable";
import Ultimate from "../../../../../../common/assets/img/button/btnReturnUltimateLevel.gif";
import leftBtn from "../../../../../../common/assets/img/button/btnAdd2.gif";
import ViewBtn from "../../../../../../common/assets/img/button/btnView.gif";

import downarrow from "../../../../../../common/assets/img/downarrow.gif";

import uparrow from "../../../../../../common/assets/img/uparrow.gif";
import completed from "../../../../../../common/assets/img/completed.gif";
import API from "./service/API";

import screenLoader from "../../../../../../common/assets/img/screenloader.gif";
import AccountListContext from "../../../context/AccountListContext";
//import { CLoader } from "../../../../../../common/components/CLoader";

let contextType = null;
let parentContextType = null;
let accountRecId = null;
let period = null;

export default class Mcadlookup extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let currentLevel = null;
    accountRecId = parentContextType.state.accountListData.selectedAccount
      .accountrecid
      ? parentContextType.state.accountListData.selectedAccount.accountrecid
      : sessionStorage.getItem("accountsDataRecId");
    period = parentContextType.state.accountListData.selectedAccount.period
      ? parentContextType.state.accountListData.selectedAccount.period
      : sessionStorage.getItem("accountsDataPeriod");

    contextType.resetState();
    contextType.setLoader();
    API.getMCADData(accountRecId, period).then((data) => {
      if (data !== "error") {
        const maxMcadLink = data.maxMCADLink;
        const mCadSearchData = { ...contextType.state.setMcadData };
        const MCADlookupInfo = { ...contextType.state.MCADlookupInfo };
        MCADlookupInfo.accountInfo = data.accountInfo;
        MCADlookupInfo.mcadDropDowns = data.mcadDropDowns;

        if (data.mcadOracleDataList === "undefined") {
          MCADlookupInfo.mcadOracleDataList = [];
        } else {
          MCADlookupInfo.mcadOracleDataList = data.mcadOracleDataList;
        }
        if (
          data.mcadOracleDataList != null &&
          data.mcadOracleDataList.length > 0
        ) {
          currentLevel = contextType.getBusinesslevelDescription(
            data.mcadOracleDataList[0].businesslevelcode
          );
        }

        MCADlookupInfo.businessLevelDropDowns =
          contextType.state.businessLevelDropDowns;

        MCADlookupInfo.accountInfo.data = data.accountInfo;
        mCadSearchData.searchtype = data.mcadSearch.searchtype;
        mCadSearchData.countryRegion = data.mcadSearch.countrycode;
        contextType.setState({
          ...contextType.state,
          MCADlookupInfo: MCADlookupInfo,
          isComplete: true,
          onShowParentLinkData: false,
          currentLevel: currentLevel,
          maxMCADLink: maxMcadLink,
          setMcadData: mCadSearchData,
          period:
            parentContextType.state.accountListData.selectedAccount.period,
          accountrecid:
            parentContextType.state.accountListData.selectedAccount
              .accountrecid,
        });
        contextType.resetLoader();
      } else {
        contextType.resetLoader();
      }
    });

    contextType.state.period = period;
    contextType.state.accountrecid = accountRecId;
  }

  checkboxRowTemplate = (rowData) => {
    if (!rowData.isMoved) {
      return (
        <input
          type="checkbox"
          id={rowData.businessid}
          checked={rowData.isSelected}
          name={rowData.businessid}
          onChange={contextType.handleToggle(rowData.businessid)}
          className={styles.verticalAlignedmid}
        />
      );
    } else {
      return <img src={completed} alt={Settings.searchAccount.completed} />;
    }
  };

  showDataTemplate = (rowData) => {
    return (
      <span
        style={{ verticalAlign: "center" }}
        className={styles.searchLink}
        onClick={() => {
          contextType.showMCADDataModel(rowData);
        }}
      >
        <img src={ViewBtn} alt={Settings.searchAccount.viewBtn} />
      </span>
    );
  };

  linkBodyTemplate = (rowData) => {
    return (
      <div>
        {" "}
        <span
          className={styles.parentLink}
          onClick={() => {
            contextType.showParentlinkData(rowData.businessid);
          }}
        >
          {rowData.child_count}
        </span>
      </div>
    );
  };
  delimageBodyTemplate = (rowData) => {
    return (
      <div>
        <div
          className={styles.deleteImgDiv}
          onClick={() => contextType.handleDelete(rowData.businessid)}
        >
          {<img src={DeleteImg} className={styles.padding8} />}
        </div>
      </div>
    );
  };

  getLocation = (rowData) => {
    let location = "";
    if (rowData.cityname != null && rowData.cityname != "")
      location = rowData.cityname;
    if (rowData.stateabbrev != null && rowData.stateabbrev != "")
      location += " " + rowData.stateabbrev;
    if (rowData.countrycode != null && rowData.countrycode != "") {
      if (location.length > 0) location += ",";
      location += " " + rowData.countrycode;
    }
    return location;
  };

  locationTemplate = (rowData) => {
    return <>{this.getLocation(rowData)}</>;
  };

  initialcolumns = [
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      header: Settings.SearchData.tableColumns.CompanyName.header,
      style: { width: "230px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyType.field,
      header: Settings.SearchData.tableColumns.CompanyType.header,
      style: { width: "125px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Parent.field,
      header: "",
      style: { width: "55px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Location.field,
      header:
        contextType && contextType.state.McadResult?.McadResultList
          ? Settings.SearchData.tableColumns.Location.header
          : null,
      style: { width: "197px" },
    },
  ];

  columns = [
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.checkboxRowTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.showDataTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      header: Settings.SearchData.tableColumns.CompanyName.header,
      style: { width: "230px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyType.field,
      header: Settings.SearchData.tableColumns.CompanyType.header,
      style: { width: "125px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Parent.field,
      header: Settings.MCADResultData.tableColumns.Parent.header,
      body: this.linkBodyTemplate,
      style: { width: "55px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Location.field,
      header: Settings.SearchData.tableColumns.Location.header,
      style: { width: "197px" },
    },
  ];

  rightColumns = [
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.delimageBodyTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.showDataTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      header: Settings.SearchData.tableColumns.CompanyName.header,
      style: { width: "230px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyType.field,
      header: Settings.SearchData.tableColumns.CompanyType.header,
      style: { width: "125px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Location.field,
      header: Settings.SearchData.tableColumns.Location.header,
      body: this.locationTemplate,
      style: { width: "197px" },
    },
  ];

  parentcolumns = [
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.checkboxRowTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      body: this.showDataTemplate,
      style: { width: "30px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyName.field,
      header: Settings.SearchData.tableColumns.CompanyName.header,
      style: { width: "230px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.CompanyType.field,
      header: Settings.SearchData.tableColumns.CompanyType.header,
      style: { width: "125px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Sites.field,
      header: Settings.MCADResultData.tableColumns.Sites.header,
      style: { width: "55px" },
    },
    {
      field: Settings.MCADResultData.tableColumns.Location.field,
      header: Settings.SearchData.tableColumns.Location.header,
      style: { width: "197px" },
    },
  ];

  componentWillUnmount() {
    if (contextType.state.formChgStatus) contextType.autoSaveData();
    contextType.resetState();
    contextType.resetLoader();
  }

  render() {
    return (
      <AccountListContext.Consumer>
        {(accountListContext) => {
          parentContextType = accountListContext;
          return (
            <McadlookupContext.Consumer>
              {(mcadlookupContext) => {
                contextType = mcadlookupContext;
                if (contextType.state !== undefined) {
                  return (
                    <>
                      {contextType.state.showScreenLoader ? (
                        <div id="loading" className={styles.accountTabLoader}>
                          <div>
                            <img src={screenLoader}></img>
                          </div>
                        </div>
                      ) : null}
                      <React.Fragment>
                        <div className={styles.searchlinkon}>
                          <a
                            href="javascript:void(0);"
                            title={Settings.searchAccount.searchTitle}
                            className={styles.navBtn}
                            onClick={contextType.showModal}
                          >
                            {Settings.searchAccount.Search}
                          </a>
                          <span>
                            <>&nbsp;</>
                          </span>

                          {contextType.state.showDownArrow ? (
                            <img
                              src={downarrow}
                              alt={Settings.searchAccount.downArrow}
                            />
                          ) : (
                            <img
                              src={uparrow}
                              alt={Settings.searchAccount.upArrow}
                            />
                          )}
                        </div>
                        <div className={styles.searchModalCommon}>
                          <CModal
                            title={""}
                            hideTitle="true"
                            onClose={contextType.showModal}
                            show={contextType.state.onshowModal}
                            opacity="true"
                          >
                            <Suspense fallback={<CSuspense />}>
                              <SearchAccount />
                            </Suspense>
                          </CModal>
                        </div>
                        <div className={styles.top100}>
                          <CModal
                            title={Settings.searchAccount.Alerttitle}
                            onClose={contextType.noDataModal}
                            show={contextType.state.noData}
                            class={"alertdata"}
                            opacity="true"
                          >
                            <Suspense fallback={<CSuspense />}>
                              {Settings.MCADlookupscreen.noResultDetailsFound}
                            </Suspense>
                          </CModal>
                        </div>
                        <div
                          style={{
                            display: "block",
                            marginTop: "-10px",
                            paddingBottom: "62px",
                          }}
                        >
                          <table>
                            <tbody>
                              <tr className={styles.heighthundred}>
                                <td className={styles.grid}>
                                  <div
                                    id="netezzaMcadAccounts"
                                    className={styles.grid1}
                                  >
                                    <table className={styles.widthhundred}>
                                      <tbody>
                                        <tr>
                                          <td className={styles.widththreehun}>
                                            <table
                                              className={styles.widthhundred}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    {contextType.state
                                                      .onShowParentLinkData ? (
                                                      <img
                                                        src={Ultimate}
                                                        onClick={
                                                          contextType.returntoParent
                                                        }
                                                        className={
                                                          styles.paddingthre
                                                        }
                                                      />
                                                    ) : null}
                                                  </td>
                                                  <td
                                                    className={styles.grid2}
                                                  ></td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </td>
                                        </tr>
                                        <tr>
                                          <td>
                                            <div
                                              id="gridNodeA"
                                              className={`${styles.gridNodeA} ${
                                                contextType?.state?.McadResult
                                                  ?.McadResultList?.length > 0
                                                  ? "tableScroll"
                                                  : "tableNoScroll"
                                              }`}
                                            >
                                              <div id="gridHeaderA">
                                                {contextType.state
                                                  .ondatatableVisible ? (
                                                  contextType.state
                                                    .onShowParentLinkData ||
                                                  contextType.state
                                                    .searchParent ? (
                                                    <div
                                                      id="TableA"
                                                      style={{
                                                        paddingLeft: "0px",
                                                        marginLeft: "0px",
                                                      }}
                                                      className={
                                                        styles.gridNodeAScroll
                                                      }
                                                    >
                                                      <CDataTable
                                                        id="gridTableParentView"
                                                        columns={
                                                          this.parentcolumns
                                                        }
                                                        value={
                                                          contextType.state
                                                            ?.McadResult
                                                            ?.McadResultList
                                                            ?.length > 0
                                                            ? contextType.state
                                                                .McadResult
                                                                .McadResultList
                                                            : null
                                                        }
                                                        marginLeft="-10px"
                                                        emptyMessage=" "
                                                        overflow-x="hidden"
                                                        scrollHeight="338px"
                                                      />
                                                      <style>{`
                                                      .p-datatable-scrollable-body{
                                                         height:338px !important;
                                                      }
                                                    `}</style>
                                                    </div>
                                                  ) : (
                                                    <div
                                                      id="TableA"
                                                      className={
                                                        styles.gridNodeAScroll
                                                      }
                                                    >
                                                      <CDataTable
                                                        id="gridTableView"
                                                        columns={
                                                          contextType?.state
                                                            ?.McadResult
                                                            ?.McadResultList
                                                            ?.length > 0
                                                            ? this.columns
                                                            : this
                                                                .initialcolumns
                                                        }
                                                        value={
                                                          contextType.state
                                                            ?.McadResult
                                                            ?.McadResultList
                                                            ?.length > 0
                                                            ? contextType.state
                                                                ?.McadResult
                                                                ?.McadResultList
                                                            : null
                                                        }
                                                        marginLeft="-10px"
                                                        emptyMessage=" "
                                                        width="450px"
                                                        overflow-x="hidden"
                                                        scrollHeight="336px"
                                                      />
                                                    </div>
                                                  )
                                                ) : (
                                                  <div
                                                    className={
                                                      styles.headerposition
                                                    }
                                                  >
                                                    <CDataTable
                                                      id="gridTableView"
                                                      columns={
                                                        this.initialcolumns
                                                      }
                                                      marginLeft="-10px"
                                                      paddingLeft="-10px"
                                                      emptyMessage=" "
                                                      width="450px"
                                                      overflow-x="hidden"
                                                      scrollHeight="336px"
                                                    />
                                                  </div>
                                                )}
                                              </div>
                                              <div
                                                id="gridViewHS"
                                                className={styles.gridViewHS}
                                              >
                                                {/* <div
                                              id="gridViewA"
                                              className={styles.gridViewA}
                                            ></div> */}

                                                <CModal
                                                  title={
                                                    contextType.state.modalTitle
                                                  }
                                                  class={"magndataload"}
                                                  onClose={
                                                    contextType.showModalMcadAccount
                                                  }
                                                  show={
                                                    contextType.state
                                                      .onShowMcadAccountDetails
                                                  }
                                                >
                                                  <Suspense
                                                    fallback={<CSuspense />}
                                                  >
                                                    <McadAccountDetails />
                                                  </Suspense>
                                                </CModal>
                                              </div>
                                            </div>
                                          </td>
                                        </tr>
                                      </tbody>
                                    </table>
                                  </div>
                                </td>

                                <td className={styles.girdtd}>
                                  <div>
                                    {(parentContextType?.state?.roleDetails
                                      ?.user?.role ||
                                      parentContextType.state.roleDetails
                                        .role) === Settings.sappRole &&
                                      contextType.state.MCADlookupInfo
                                        .accountInfo.data.accountpricingtype ===
                                        Settings.accTypeP && (
                                        <span>
                                          <img
                                            tabIndex={0}
                                            className={styles.imgStyleone}
                                            src={leftBtn}
                                            onClick={
                                              contextType.handleCheckedRight
                                            }
                                            aria-label="move selected right"
                                          />
                                        </span>
                                      )}
                                    {(parentContextType?.state?.roleDetails
                                      ?.user?.role ||
                                      parentContextType.state.roleDetails
                                        .role) === Settings.adminRole && (
                                      <span>
                                        <img
                                          tabIndex={0}
                                          className={styles.imgStyleone}
                                          src={leftBtn}
                                          onClick={
                                            contextType.handleCheckedRight
                                          }
                                          aria-label="move selected right"
                                        />
                                      </span>
                                    )}
                                  </div>
                                </td>

                                <td className={styles.gridNodeB}>
                                  <table className={styles.widthhundred}>
                                    <tbody>
                                      <tr className={styles.height30}>
                                        <td className={styles.widthfour}>
                                          <table>
                                            <tbody>
                                              <tr>
                                                <td>
                                                  <div id="current_business_level">
                                                    <span
                                                      id="fieldName"
                                                      className={
                                                        styles.fontWeightbold
                                                      }
                                                    >
                                                      {
                                                        Settings.searchAccount
                                                          .CurrentDeployedLevel
                                                      }
                                                    </span>

                                                    <span
                                                      id="FieldValue"
                                                      className={
                                                        styles.fieldName
                                                      }
                                                    >
                                                      {contextType.state
                                                        .currentLevel != null
                                                        ? contextType.state
                                                            .currentLevel
                                                        : ""}
                                                    </span>
                                                  </div>
                                                </td>
                                                <td>
                                                  <>&nbsp;</>
                                                </td>
                                              </tr>
                                            </tbody>
                                          </table>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td>
                                          <div
                                            id="netezzaMcadAccounts"
                                            className={styles.grid1}
                                          >
                                            <table
                                              className={styles.heighthundred}
                                            >
                                              <tbody>
                                                <tr>
                                                  <td>
                                                    <div
                                                      id="gridNodeB"
                                                      className={`${
                                                        styles.gridNodeA
                                                      } ${
                                                        contextType?.state
                                                          ?.MCADlookupInfo
                                                          ?.mcadOracleDataList
                                                          ?.length > 0
                                                          ? " tableScrollB"
                                                          : ""
                                                      }`}
                                                    >
                                                      <div id="gridHeaderA">
                                                        <CDataTable
                                                          id="gridTableView"
                                                          columns={
                                                            this.rightColumns
                                                          }
                                                          value={contextType.state.MCADlookupInfo.mcadOracleDataList.filter(
                                                            (data, i) =>
                                                              i ===
                                                              contextType.state.MCADlookupInfo.mcadOracleDataList.findIndex(
                                                                (val) =>
                                                                  val.businessid ===
                                                                  data.businessid
                                                              )
                                                          )}
                                                          marginLeft="0px"
                                                          emptyMessage=" "
                                                          width="450px"
                                                          overflow-x="hidden"
                                                        />
                                                      </div>
                                                      <div id="gridViewA"></div>
                                                      <tr>
                                                        {contextType.state
                                                          .isSearchFlag ? (
                                                          <>
                                                            {contextType.state
                                                              .isbusinessNameEmpty ? (
                                                              <CModal
                                                                title={
                                                                  Settings
                                                                    .searchAccount
                                                                    .Alerttitle
                                                                }
                                                                class={
                                                                  "alertdata"
                                                                }
                                                                closeImgTitle={
                                                                  Settings
                                                                    .MCADlookupscreen
                                                                    .closeImgTitle
                                                                }
                                                                onClose={() =>
                                                                  contextType.showValidation()
                                                                }
                                                                show={
                                                                  contextType
                                                                    .state
                                                                    .onValidation
                                                                }
                                                              >
                                                                <Suspense
                                                                  fallback={
                                                                    <CSuspense />
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .searchAccount
                                                                      .onBusinessNameEmpty
                                                                  }
                                                                </Suspense>
                                                              </CModal>
                                                            ) : null}

                                                            <CModal
                                                              title={
                                                                Settings
                                                                  .searchAccount
                                                                  .Alerttitle
                                                              }
                                                              class={
                                                                "alertdata"
                                                              }
                                                              closeImgTitle={
                                                                Settings
                                                                  .MCADlookupscreen
                                                                  .closeImgTitle
                                                              }
                                                              onClose={(e) =>
                                                                contextType.showModalError()
                                                              }
                                                              show={
                                                                contextType
                                                                  .state
                                                                  .onshowModalError
                                                              }
                                                            >
                                                              <Suspense
                                                                fallback={
                                                                  <CSuspense />
                                                                }
                                                              >
                                                                {Settings
                                                                  .searchAccount
                                                                  .mcadValidation +
                                                                  contextType
                                                                    .state
                                                                    .maxMCADLink +
                                                                  Settings
                                                                    .searchAccount
                                                                    .mcadsNo}
                                                              </Suspense>
                                                            </CModal>

                                                            {contextType.state
                                                              .isBusinessLevelEmpty ? (
                                                              <CModal
                                                                title={
                                                                  Settings
                                                                    .searchAccount
                                                                    .Alerttitle
                                                                }
                                                                class={
                                                                  "alertdata"
                                                                }
                                                                onClose={(e) =>
                                                                  contextType.showValidation()
                                                                }
                                                                show={
                                                                  contextType
                                                                    .state
                                                                    .onValidation
                                                                }
                                                                closeImgTitle={
                                                                  Settings
                                                                    .MCADlookupscreen
                                                                    .closeImgTitle
                                                                }
                                                              >
                                                                <Suspense
                                                                  fallback={
                                                                    <CSuspense />
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .searchAccount
                                                                      .onBusinessLevelEmpty
                                                                  }
                                                                </Suspense>
                                                              </CModal>
                                                            ) : null}
                                                          </>
                                                        ) : (
                                                          <>
                                                            {contextType.state
                                                              .isAlphabet ? (
                                                              <CModal
                                                                title={
                                                                  Settings
                                                                    .searchAccount
                                                                    .Alerttitle
                                                                }
                                                                class={
                                                                  "alertdata"
                                                                }
                                                                onClose={(e) =>
                                                                  contextType.showValidation()
                                                                }
                                                                show={
                                                                  contextType
                                                                    .state
                                                                    .onValidation
                                                                }
                                                                closeImgTitle={
                                                                  Settings
                                                                    .MCADlookupscreen
                                                                    .closeImgTitle
                                                                }
                                                              >
                                                                <Suspense
                                                                  fallback={
                                                                    <CSuspense />
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .searchAccount
                                                                      .onBusinessIDvalidation
                                                                  }
                                                                </Suspense>
                                                              </CModal>
                                                            ) : null}

                                                            {contextType.state
                                                              .isBusinessLevelEmpty ? (
                                                              <CModal
                                                                title={
                                                                  Settings
                                                                    .searchAccount
                                                                    .Alerttitle
                                                                }
                                                                class={
                                                                  "alertdata"
                                                                }
                                                                onClose={(e) =>
                                                                  contextType.showValidation()
                                                                }
                                                                show={
                                                                  contextType
                                                                    .state
                                                                    .onValidation
                                                                }
                                                                closeImgTitle={
                                                                  Settings
                                                                    .MCADlookupscreen
                                                                    .closeImgTitle
                                                                }
                                                              >
                                                                <Suspense
                                                                  fallback={
                                                                    <CSuspense />
                                                                  }
                                                                >
                                                                  {
                                                                    Settings
                                                                      .searchAccount
                                                                      .onBusinessLevelEmpty
                                                                  }
                                                                </Suspense>
                                                              </CModal>
                                                            ) : null}
                                                          </>
                                                        )}
                                                        <CModal
                                                          title={
                                                            Settings
                                                              .searchAccount
                                                              .Alerttitle
                                                          }
                                                          class={"alertdata"}
                                                          closeImgTitle={
                                                            Settings
                                                              .MCADlookupscreen
                                                              .closeImgTitle
                                                          }
                                                          onClose={(e) =>
                                                            contextType.showModalError()
                                                          }
                                                          show={
                                                            contextType.state
                                                              .onshowModalError
                                                          }
                                                        >
                                                          <Suspense
                                                            fallback={
                                                              <CSuspense />
                                                            }
                                                          >
                                                            {Settings
                                                              .searchAccount
                                                              .mcadValidation +
                                                              contextType.state
                                                                .maxMCADLink +
                                                              Settings
                                                                .searchAccount
                                                                .mcadsNo}
                                                          </Suspense>
                                                        </CModal>
                                                        <CModal
                                                          title={
                                                            Settings
                                                              .searchAccount
                                                              .Alerttitle
                                                          }
                                                          class={"alertdata"}
                                                          closeImgTitle={
                                                            Settings
                                                              .MCADlookupscreen
                                                              .closeImgTitle
                                                          }
                                                          onClose={(e) =>
                                                            contextType.dupDataModal()
                                                          }
                                                          show={
                                                            contextType.state
                                                              .isDuplicateData
                                                          }
                                                        >
                                                          <Suspense
                                                            fallback={
                                                              <CSuspense />
                                                            }
                                                          >
                                                            {contextType.state
                                                              .duplicateBusinessName +
                                                              " " +
                                                              Settings
                                                                .MCADlookupscreen
                                                                .duplicateDataAlert}
                                                          </Suspense>
                                                        </CModal>
                                                      </tr>
                                                      {/* </div> */}
                                                    </div>
                                                  </td>
                                                </tr>
                                              </tbody>
                                            </table>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <style>
                          {`
                            .p-datatable-scrollable-body {
                              height: 312px !important;
                              overflow: hidden;
                              overflow-x: hidden;
                            }
                            .p-datatable-scrollable-body-table {
                              max-height: 312px !important;
                              overflow: hidden;
                              overflow-x: hidden;
                            }
                            .tableNoScroll .p-datatable-scrollable-body {
                              overflow: hidden !important;
                            }
                            .tableScroll .p-datatable-scrollable-body {
                              overflow-y: auto !important;
                              overflow-x: scroll !important;
                            }
                            .tableScroll .p-datatable-scrollable-body-table {
                              overflow-y: auto !important;
                              overflow-x: scroll !important;
                            }
                            .tableScrollB .p-datatable-scrollable-body {
                              overflow-y: auto !important;
                              overflow-x: scroll !important;
                            }
                            .tableScrollB .p-datatable-scrollable-body-table {
                              overflow-y: auto !important;
                              overflow-x: scroll !important;
                            }
                            .p-datatable .p-datatable-thead > tr > th{
                              padding-left:5px !important;
                            }
                            .tableScrollB .p-datatable-tbody > tr > td {
                              padding: 0 !important;
                            }
                            .alertdata div{
                              margin-right: -10px;
                              margin-left: -10px;
                              margin-bottom: 10px;
                            }
                            .alertdata{
                              padding: 0 10px 10px;
                              font-size:12px;
                              position: fixed;
                              left: 45vw;
                            }
                            .magndataload{
                              top:35%;
                              left:30%;
                              position:fixed;
                            }
                            
                            `}
                        </style>
                      </React.Fragment>
                    </>
                  );
                } else {
                  return null;
                }
              }}
            </McadlookupContext.Consumer>
          );
        }}
      </AccountListContext.Consumer>
    );
  }
}
