/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component, useContext } from "react";
import Settings from "./static/Settings";
import styles from "./styles/salesusers.css";
import CDataTable from "../../../common/components/CDataTable";
import { CLoader } from "../../../common/components/CLoader";
import { Link } from "react-router-dom";
import SalesUsersContext, {
  SalesUsersContextProvider,
} from "./context/SalesUsersContext";
// import UserPropertiesContext, {
//   UserPropertiesContextProvider,
// } from "../context/UserPropertiesContext";
import { SalesUserSearchFilters } from "../../common/components/salesusersearchfilters/SalesUserSearchFilters";
import { CPagination } from "../../../common/components/CPagination";
import CModal from "../../../common/components/CModal";
import ViewAccountNames from "./content/ViewAccountNames";
import CPageTitle from "../../../common/components/CPageTitle";
import btnViewSmall from "../../../common/assets/img/button/btnViewSmall.gif";
import btnSave from "../../../common/assets/img/button/btnSave.gif";
import Utils from "../../../common/utils/Utils";

let salesUsersContextType = null;
// let reloadTable = false;
interface IProps {}
interface IState {
  salesUsersData: {};
  userSearchCriteria: {
    searchBy: string;
    filterString: string;
    orderby: number;
    userRole: string;
    strPage: {
      page: number;
      maxpagelen: number;
    };
  };
  viewAccountNamesDialogFlag: boolean;
  params: {
    userid: string;
    userRole: string;
    eid: string;
  };
}
class SalesUsers extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      salesUsersData: null,
      userSearchCriteria: {
        searchBy: "ALL",
        filterString: "",
        orderby: 0,
        userRole: "MFPSALES",
        strPage: {
          page: 1,
          maxpagelen: 0,
        },
      },
      viewAccountNamesDialogFlag: false,
      params: {
        userid: "",
        userRole: "",
        eid: "",
      },
    };
  }

  setGridSize = () => {
    const element = document.querySelector(".p-datatable") as HTMLElement;
    if (element && element != undefined) {
      element.style.width =
        (document.documentElement.clientWidth - 5).toString() + "px";
    }
    const bodyElement = document.querySelector(
      ".p-datatable-scrollable-body"
    ) as HTMLElement;
    if (bodyElement && bodyElement != undefined) {
      if (document.documentElement.clientWidth < 1156) {
        bodyElement.classList.remove("p-datatable-scrollable-body");
        bodyElement.style["overflowX"] = "auto";
        bodyElement.style["overflowY"] = "auto";
        bodyElement.style.maxHeight = "calc(100vh - 225px)";
        bodyElement.style.position = "relative";
      } else {
        bodyElement.classList.add("p-datatable-scrollable-body");
      }
    }
  };
  componentDidMount(): void {
    window.addEventListener("resize", this.setGridSize);
  }
  componentDidUpdate(
    prevProps: Readonly<IProps>,
    prevState: Readonly<IState>,
    snapshot?: any
  ): void {
    salesUsersContextType.resetAppContextSearchCriteria(prevProps, this.props);
  }
  componentWillUnmount(): void {
    window.removeEventListener("resize", this.setGridSize);
    salesUsersContextType.resetFilterData();
  }

  eidBodyTemplate = (rowData) => {
    return (
      <Link
        to={{ pathname: "/usereditsalesaccess", state: rowData }}
        className={styles.eidLink}
      >
        {rowData.eid}
      </Link>
    );
  };

  stateProvinceTemplate = (rowData) => {
    return rowData.cn_state && rowData.cn_country ? (
      <span>{`${rowData.cn_state}/${rowData.cn_country}`}</span>
    ) : rowData.cn_state || rowData.cn_country ? (
      <span>{`${rowData.cn_state}${rowData.cn_country}`}</span>
    ) : null;
  };
  internalNotesTemplate = (rowData) => {
    return (
      <textarea
        value={
          rowData.user_internalnotes != null ? rowData.user_internalnotes : ""
        }
        onChange={(e) => salesUsersContextType.setInternalText(e, rowData.eid)}
        onKeyPress={(e) => Utils.checklen_onkeypress(e, 100)}
        onBlur={(e) => salesUsersContextType.checkLenText(e, rowData.eid, 100)}
        style={{ width: "285px", wordBreak: "break-word" }}
      ></textarea>
    );
  };

  marshaCodeTemplate = (rowData) => {
    return (
      rowData.acctcount > 0 && (
        <a href="javascript:void(0);">
          <img
            src={btnViewSmall}
            onClick={() => this.marshaCodeButtonHandler(rowData)}
          />
        </a>
      )
    );
  };

  marshaCodeButtonHandler(data) {
    const paramsObj = this.state.params;
    paramsObj.userid = data.cn_userid;
    paramsObj.userRole = "MFPSALES";
    paramsObj.eid = data.eid;
    this.setState({ ...this.state, params: paramsObj });
    this.setViewAccountNamesDialogFlag(true);
  }

  setViewAccountNamesDialogFlag(flag: boolean) {
    this.setState({ ...this.state, viewAccountNamesDialogFlag: flag });
  }

  columns = [
    {
      field: Settings.tableColumns.eid.field,
      header: Settings.tableColumns.eid.header,
      body: this.eidBodyTemplate,
      style: { width: "60px", minWidth: "60px" },
    },
    {
      field: Settings.tableColumns.lname.field,
      header: Settings.tableColumns.lname.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.fname.field,
      header: Settings.tableColumns.fname.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.city.field,
      header: Settings.tableColumns.city.header,
      style: { width: "90px", minWidth: "90px" },
    },
    {
      field: Settings.tableColumns.stateprovince.field,
      header:
        Settings.tableColumns.stateprovince.header1 +
        "</br>" +
        Settings.tableColumns.stateprovince.header2,
      body: this.stateProvinceTemplate,
      style: { width: "90px", minWidth: "90px", whiteSpace: "nowrap" },
    },
    {
      field: Settings.tableColumns.account.field,
      header: Settings.tableColumns.account.header,
      body: this.marshaCodeTemplate,
      style: { width: "80px", minWidth: "80px" },
    },
    {
      field: Settings.tableColumns.phoneno.field,
      header: Settings.tableColumns.phoneno.header,
      style: { width: "100px", minWidth: "100px" },
    },
    {
      field: Settings.tableColumns.email.field,
      header: Settings.tableColumns.email.header,
      style: { width: "300px", minWidth: "300px" },
    },
    {
      field: Settings.tableColumns.internalNotes.field,
      header: Settings.tableColumns.internalNotes.header,
      body: this.internalNotesTemplate,
      style: { width: "287px", minWidth: "287px" },
    },
  ];

  handlePaginationAPI(pageNumber: number) {
    sessionStorage.setItem("salesUsersPageNo", pageNumber);
    salesUsersContextType.setPNumber(pageNumber);
    salesUsersContextType.setPostData({
      ...salesUsersContextType.postData,
      userSearchCriteria: {
        ...salesUsersContextType.postData.userSearchCriteria,
        page: pageNumber,
      },
    });
    salesUsersContextType.updateSalesUsersGridData(pageNumber);
  }

  render() {
    return (
      <SalesUsersContextProvider key={this.state.history?.location.key}>
        <SalesUsersContext.Consumer>
          {(SalesUsersContext) => {
            salesUsersContextType = SalesUsersContext;
            return (
              <div className={styles.mainContainer}>
                <div className={styles.bodyContainer}>
                  <CModal
                    title={`${Settings.labels.accountListFor} ${this.state.params.eid}`}
                    onClose={() => {
                      this.setViewAccountNamesDialogFlag(false);
                    }}
                    show={this.state.viewAccountNamesDialogFlag}
                    xPosition={-183}
                    yPosition={-160}
                  >
                    <ViewAccountNames
                      params={this.state.params}
                      onClose={() => {
                        this.setViewAccountNamesDialogFlag(false);
                      }}
                    />
                  </CModal>
                  <CPageTitle
                    title={Settings.labels.titleSalesUsers}
                    titlePadding={salesUsersContextType.titlePadding}
                    titleSpace={{ paddingBottom: "22.6px", paddingTop: "0px" }}
                    titleContainer={{ marginBottom: "0px" }}
                  ></CPageTitle>
                  {salesUsersContextType.totalPages != -1 && (
                    <>
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <SalesUserSearchFilters />
                            </td>
                            <td
                              style={{
                                marginTop: "18px",
                                marginRight: "-5px",
                                display: "flex",
                              }}
                            >
                              <CPagination
                                totalPages={salesUsersContextType.totalPages}
                                context={salesUsersContextType}
                                handlePaginationAPI={this.handlePaginationAPI}
                                resetInput={salesUsersContextType.resetInput}
                                className={"pagenationsales"}
                                compName="SalesUsers"
                              />
                            </td>
                            <td style={{ marginBottom: "-1px" }}>
                              <a href="javascript:void(0);">
                                <img
                                  src={btnSave}
                                  style={{ marginBottom: "-14.5px" }}
                                  onClick={() =>
                                    salesUsersContextType.saveSalesUsersGridData()
                                  }
                                />
                              </a>
                            </td>
                          </tr>
                        </tbody>
                      </table>

                      <CDataTable
                        id="salesUsersGrid"
                        columns={this.columns}
                        reloadTable={!salesUsersContextType.isLoaded}
                        value={salesUsersContextType.salesUsersData}
                        marginLeft="0px"
                        emptyMessage="&nbsp;&nbsp;"
                        scrollHeight="calc(100vh - 210px)"
                      />
                    </>
                  )}

                  {!salesUsersContextType.isLoaded && <CLoader></CLoader>}
                  <style>{`
                  .p-datatable{
                    width:calc(100vw - 5px);
                  }
                .p-datatable-scrollable-wrapper {
                  margin-top: -1px;
                }
                .p-datatable .p-datatable-tbody > tr > td:last-child{
                  padding: 0 !important;
                  margin: 0 !important;
                }
                .p-datatable .p-datatable-tbody > tr > td:nth-child(6) a img{
                  cursor:auto;
                }
                .p-datatable .p-datatable-tbody > tr > td input{
                  width:99%;
                  height:23.6px;
                }
                .p-datatable .p-datatable-tbody > tr > td{
                  word-break:break-all;
                }
                .page_body_container > table td{
                  vertical-align: bottom;
                }
                .header{
                  padding-bottom: 17.34px;
                  display: block;
                }
                .pagenationsales{
                  width: 252px;
                  min-width: 252px;
                }
                .pagenationsales tbody tr{
                  display:flex;
                  margin-bottom:-6px;
                  line-height:18px;
                }
                .pagenationsales tbody tr td{
                  margin: 0 1px !important;
                }
                .p-datatable-scrollable-body{
                  overflow-y: auto !important;
                  overflow-x:auto !important;
                }
                @media only screen and (min-width: 1920px) {
                  .p-datatable-scrollable-view{
                    height: auto;
                  }
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 220px) !important;
                  }
                  .p-datatable-scrollable-view {
                    width: 1250px;
                  }
                  .p-datatable-scrollable-header{
                    padding-right: 4px;
                  }
                  .page_body_container {
                    min-height: calc(100vh - 90px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                }
                @media (min-width: 1650px) and (max-width: 1750px) {

                  .p-datatable-scrollable-view{
                    height: auto;
                    width: 1250px;
                  }
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 216px) !important;
                  }
                }
                @media (min-width: 1450px) and (max-width: 1600px){
                  .p-datatable-scrollable-view{
                    width: 1250px;
                  }
                }
                .container{
                  min-width:850px;
                }
                @media only screen and (max-width: 1245px) {
                  .page_body_container {
                    min-height: calc(100vh - 111px) !important;
                  }
                  .footerwidget{
                    position:fixed;
                  }
                  .p-datatable-scrollable-view {
                    height: auto;
                  }
                  .p-datatable-scrollable-body{
                    max-height: calc(100vh - 245px) !important;
                  }
                }
                
              `}</style>
                </div>
              </div>
            );
          }}
        </SalesUsersContext.Consumer>
      </SalesUsersContextProvider>
    );
  }
}
export default SalesUsers;
